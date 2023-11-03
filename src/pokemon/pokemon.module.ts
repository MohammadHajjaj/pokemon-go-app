import { Module } from '@nestjs/common';
import { PokemonV1Service } from './v1/pokemon.service';
import { PokemonV1Controller } from './v1/pokemon.controller';

@Module({
  providers: [PokemonV1Service],
  controllers: [PokemonV1Controller],
})
export class PokemonModule {}
