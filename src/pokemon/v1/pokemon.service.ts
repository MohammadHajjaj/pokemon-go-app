import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePokemonDto, UpdatePokemonDto } from './dto';

@Injectable()
export class PokemonV1Service {
  constructor(private readonly prisma: PrismaService) {}

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
      if (error instanceof NotFoundException) {
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
      throw new InternalServerErrorException(
        `Error creating the Pokemon: ${error.message}`,
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
      if (error instanceof NotFoundException) {
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
      console.error('Error deleting the Pokemon:', error.message);
      throw new InternalServerErrorException(
        `An error occurred while deleting the Pokemon ${error.message}`,
      );
    }
  }
}
