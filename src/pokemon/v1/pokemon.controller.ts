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
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PokemonV1Service } from './pokemon.service';
import { CreatePokemonDto, UpdatePokemonDto, ListPokemonsDto } from './dto';

@Controller('v1/pokemons')
export class PokemonV1Controller {
  constructor(private readonly pokemonService: PokemonV1Service) {}

  @Get()
  getPokemons(@Query(ValidationPipe) query: ListPokemonsDto) {
    return this.pokemonService.listPokemons(query);
  }

  @Get(':pokemonId')
  getPokemonById(@Param('pokemonId', ParseIntPipe) pokemonId: number) {
    return this.pokemonService.getPokemonById(pokemonId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createPokemon(@Body(ValidationPipe) createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.createPokemon(createPokemonDto);
  }

  @Patch(':pokemonId')
  updatePokemon(
    @Param('pokemonId', ParseIntPipe) pokemonId: number,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonService.updatePokemon(pokemonId, updatePokemonDto);
  }

  @Delete(':pokemonId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deletePokemonById(@Param('pokemonId', ParseIntPipe) pokemonId: number) {
    return this.pokemonService.deletePokemonById(pokemonId);
  }
}
