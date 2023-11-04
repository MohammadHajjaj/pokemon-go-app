import { POKEMON_TYPE } from '@prisma/client';
import {
  IsOptional,
  IsIn,
  IsInt,
  IsString,
  Min,
  Max,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// custom validator to add a constraint if multiple query params cannot exist at the same time
// in my case, statTotal cannot exist with minStatTotal or MaxStatTotal
@ValidatorConstraint({ async: false })
export class IsMutuallyExclusiveConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const relatedPropertyName = args.constraints[0];
    const relatedValue = (args.object as any)[relatedPropertyName];
    // If the current field is set, the related field must not be set, and vice versa.
    return !(
      value !== null &&
      value !== undefined &&
      relatedValue !== null &&
      relatedValue !== undefined
    );
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `Cannot set both \`${args.property}\` and \`${relatedPropertyName}\` simultaneously.`;
  }
}

export function IsMutuallyExclusive(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsMutuallyExclusiveConstraint,
    });
  };
}

export class ListPokemonsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  pokemonIds?: string;

  @IsOptional()
  @IsString()
  @IsEnum(POKEMON_TYPE, {
    message: `type1 must be a valid enum value. Valid values are: ${Object.values(
      POKEMON_TYPE,
    ).join(', ')}.`,
  })
  type1?: POKEMON_TYPE;

  @IsOptional()
  @IsString()
  @IsEnum(POKEMON_TYPE, {
    message: `type1 must be a valid enum value. Valid values are: ${Object.values(
      POKEMON_TYPE,
    ).join(', ')}.`,
  })
  type2?: POKEMON_TYPE;

  @IsOptional()
  @IsString()
  weather1?: string;

  @IsOptional()
  @IsString()
  weather2?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  pokedexNumber?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  statTotal?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  @IsMutuallyExclusive('statTotal')
  minStatTotal?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  @IsMutuallyExclusive('statTotal')
  maxStatTotal?: number;
}
