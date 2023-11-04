import {
  Controller,
  Body,
  Post,
  ValidationPipe,
  Get,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { PokemonV1Service } from './pokemon.service';
import { CreatePokemonDto, UpdatePokemonDto } from './dto';

@Controller('v1/pokemons')
export class PokemonV1Controller {
  constructor(private readonly pokemonService: PokemonV1Service) {}
  @Get(':pokemonId')
  getPokemonById(@Param('pokemonId', ParseIntPipe) pokemonId: number) {
    return this.pokemonService.getPokemonById(pokemonId);
  }

  @Post()
  async createPokemon(
    @Body(ValidationPipe) createPokemonDto: CreatePokemonDto,
  ) {
    return this.pokemonService.createPokemon(createPokemonDto);
  }

  @Patch(':pokemonId')
  async updatePokemon(
    @Param('pokemonId', ParseIntPipe) pokemonId: number,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    return await this.pokemonService.updatePokemon(pokemonId, updatePokemonDto);
  }

  @Delete(':pokemonId')
  deletePokemonById(@Param('pokemonId', ParseIntPipe) pokemonId: number) {
    return this.pokemonService.deletePokemonById(pokemonId);
  }
}
