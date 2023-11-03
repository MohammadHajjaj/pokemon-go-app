import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PokemonV1Service } from './pokemon.service';

@Controller('v1/pokemons')
export class PokemonV1Controller {
  constructor(private readonly pokemonService: PokemonV1Service) {}
  @Get(':pokemonId')
  getPokemonById(@Param('pokemonId', ParseIntPipe) pokemonId: number) {
    return this.pokemonService.getPokemonById(pokemonId);
  }
}
