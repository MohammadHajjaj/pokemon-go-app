import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  IsEnum,
} from 'class-validator';
import { POKEMON_TYPE } from '@prisma/client';

export class CreatePokemonDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  pokedexNumber: number;

  @IsNotEmpty()
  @IsString()
  imgName: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  generation: number;

  @IsOptional()
  @IsString()
  evolutionStage?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  evolved: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  familyID?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  crossGen: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(POKEMON_TYPE, {
    message: `type1 must be a valid enum value. Valid values are: ${Object.values(
      POKEMON_TYPE,
    ).join(', ')}.`,
  })
  type1: POKEMON_TYPE;

  @IsOptional()
  @IsString()
  @IsEnum(POKEMON_TYPE, {
    message: `type1 must be a valid enum value. Valid values are: ${Object.values(
      POKEMON_TYPE,
    ).join(', ')}.`,
  })
  type2?: POKEMON_TYPE;

  @IsNotEmpty()
  @IsString()
  weather1: string;

  @IsOptional()
  @IsString()
  weather2?: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  statTotal: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  atk: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  def: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  sta: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  legendary: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  acquireable: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  spawns: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  regional: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  raidable: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  hatchable: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  shiny: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  nest: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  new: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  notGettable: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  futureEvolve: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  cp40: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  cp39: number;
}
