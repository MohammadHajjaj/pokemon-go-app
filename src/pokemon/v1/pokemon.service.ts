import { Prisma, POKEMON_TYPE } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePokemonDto, UpdatePokemonDto, ListPokemonsDto } from './dto';

@Injectable()
export class PokemonV1Service {
  constructor(private readonly prisma: PrismaService) {}

  async listPokemons(query: ListPokemonsDto) {
    try {
      const {
        offset = 0,
        limit = 10,
        sort,
        order = 'asc',
        name,
        pokemonIds,
        type1,
        type2,
        weather1,
        weather2,
        pokedexNumber,
        statTotal,
        minStatTotal,
        maxStatTotal,
      } = query;
      let pokemonIdArray: number[] = [];

      if (pokemonIds) {
        pokemonIdArray = pokemonIds
          .split(',')
          .map((id) => parseInt(id.trim(), 10));
      }

      const whereClause: Prisma.PokemonWhereInput = {
        name: { contains: name, mode: 'insensitive' },
        type1: type1 as POKEMON_TYPE,
        type2: type2 as POKEMON_TYPE,
        weather1: {
          equals: weather1,
          mode: 'insensitive',
        },
        weather2: {
          equals: weather2,
          mode: 'insensitive',
        },
        pokedexNumber,
        ...(pokemonIdArray.length
          ? {
              pokemonId: {
                in: pokemonIdArray,
              },
            }
          : {}),
        ...(statTotal && { statTotal }),
        ...((minStatTotal || maxStatTotal) && {
          statTotal: { gte: minStatTotal, lte: maxStatTotal },
        }),
      };
      const pokemons = await this.prisma.pokemon.findMany({
        where: whereClause,
        skip: offset,
        take: limit,
        orderBy: sort ? { [sort]: order || 'asc' } : undefined,
      });

      const totalCount = await this.prisma.pokemon.count({
        where: whereClause,
      });

      return {
        totalCount,
        data: pokemons,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error retrieving the Pokemons: ${error.message}`,
      );
    }
  }

  async getPokemonById(pokemonId: number) {
    try {
      const pokemon = await this.prisma.pokemon.findUnique({
        where: { pokemonId },
      });

      if (!pokemon) {
        throw new NotFoundException(`Pokemon with ID ${pokemonId} not found.`);
      }

      return pokemon;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error retrieving the Pokemon: ${error.message}`,
      );
    }
  }

  async createPokemon(createPokemonDto: CreatePokemonDto) {
    try {
      const newPokemon = await this.prisma.pokemon.create({
        data: createPokemonDto,
      });
      return newPokemon;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error updating the Pokemon: ${error.message}`,
      );
    }
  }

  async updatePokemon(pokemonId: number, updatePokemonDto: UpdatePokemonDto) {
    try {
      const existingPokemon = await this.prisma.pokemon.findUnique({
        where: { pokemonId },
      });

      if (!existingPokemon) {
        throw new NotFoundException(`Pokemon with ID ${pokemonId} not found.`);
      }

      return await this.prisma.pokemon.update({
        where: { pokemonId },
        data: updatePokemonDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error updating the Pokemon: ${error.message}`,
      );
    }
  }

  async deletePokemonById(pokemonId: number): Promise<void> {
    try {
      await this.prisma.pokemon.delete({
        where: { pokemonId },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw error;
      }
      throw new InternalServerErrorException(
        `An error occurred while deleting the Pokemon ${error.message}`,
      );
    }
  }
}
