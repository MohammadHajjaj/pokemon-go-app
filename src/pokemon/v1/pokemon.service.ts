import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
      throw new InternalServerErrorException(
        `Error retrieving the Pokemon: ${error.message}`,
      );
    }
  }
}
