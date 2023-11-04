import { Test, TestingModule } from '@nestjs/testing';
import { PokemonV1Controller } from './pokemon.controller';
import { PokemonV1Service } from './pokemon.service';
import {
  pokemonFixtures,
  createPokemonDtoFixture,
} from './fixtures/pokemon.fixtures';

describe('PokemonV1Controller', () => {
  let pokemonController: PokemonV1Controller;
  let pokemonService: PokemonV1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonV1Controller],
      providers: [
        {
          provide: PokemonV1Service,
          useValue: {
            listPokemons: jest.fn(),
            getPokemonById: jest.fn(),
            createPokemon: jest.fn(),
            updatePokemon: jest.fn(),
            deletePokemonById: jest.fn(),
          },
        },
      ],
    }).compile();

    pokemonController = module.get<PokemonV1Controller>(PokemonV1Controller);
    pokemonService = module.get<PokemonV1Service>(PokemonV1Service);
  });

  it('should be defined', () => {
    expect(pokemonController).toBeDefined();
  });

  describe('getPokemons', () => {
    it('should return an array of pokemons', async () => {
      const result = { totalCount: 2, data: [...pokemonFixtures] };
      (
        jest.spyOn(pokemonService, 'listPokemons') as jest.Mock
      ).mockImplementation(() => result);

      expect(
        await pokemonController.getPokemons({ limit: 10, offset: 0 }),
      ).toBe(result);
    });
  });

  describe('getPokemonById', () => {
    it('should return a single pokemon', async () => {
      const pokemonId = 1;
      const pokemon = pokemonFixtures.find((p) => p.pokemonId === pokemonId);
      jest.spyOn(pokemonService, 'getPokemonById').mockResolvedValue(pokemon);

      expect(await pokemonController.getPokemonById(pokemonId)).toBe(pokemon);
    });

    it('should throw an error when the pokemon does not exist', async () => {
      const pokemonId = 99;
      jest
        .spyOn(pokemonService, 'getPokemonById')
        .mockRejectedValue(new Error('Pokemon not found'));

      await expect(pokemonController.getPokemonById(pokemonId)).rejects.toThrow(
        'Pokemon not found',
      );
    });
  });
  describe('createPokemon', () => {
    it('should create and return the pokemon', async () => {
      const newPokemon = createPokemonDtoFixture;

      (
        jest.spyOn(pokemonService, 'createPokemon') as jest.Mock
      ).mockResolvedValue(newPokemon);

      expect(await pokemonController.createPokemon(newPokemon)).toBe(
        newPokemon,
      );
    });

    it('should throw an error when createPokemon fails', async () => {
      jest
        .spyOn(pokemonService, 'createPokemon')
        .mockRejectedValue(new Error('Create operation failed'));

      await expect(
        pokemonController.createPokemon(createPokemonDtoFixture),
      ).rejects.toThrow('Create operation failed');
    });
  });
  describe('updatePokemon', () => {
    it('should update and return the pokemon', async () => {
      const pokemonId = 1;
      const updatePokemonDto = { name: 'UpdatedName' };
      const updatedPokemon = { ...pokemonFixtures[0], ...updatePokemonDto };
      jest
        .spyOn(pokemonService, 'updatePokemon')
        .mockResolvedValue(updatedPokemon);

      expect(
        await pokemonController.updatePokemon(pokemonId, updatePokemonDto),
      ).toBe(updatedPokemon);
    });
    it('should throw an error when updatePokemon fails', async () => {
      const pokemonId = 1;
      const updatePokemonDto = { name: 'UpdatedName' };
      jest
        .spyOn(pokemonService, 'updatePokemon')
        .mockRejectedValue(new Error('Update operation failed'));

      await expect(
        pokemonController.updatePokemon(pokemonId, updatePokemonDto),
      ).rejects.toThrow('Update operation failed');
    });
  });
  describe('deletePokemonById', () => {
    it('should delete the pokemon', async () => {
      const pokemonId = 1;
      jest
        .spyOn(pokemonService, 'deletePokemonById')
        .mockResolvedValue(undefined);

      await expect(
        pokemonController.deletePokemonById(pokemonId),
      ).resolves.toBeUndefined();
    });
    it('should throw an error when deletePokemonById fails', async () => {
      const pokemonId = 1;
      jest
        .spyOn(pokemonService, 'deletePokemonById')
        .mockRejectedValue(new Error('Delete operation failed'));

      await expect(
        pokemonController.deletePokemonById(pokemonId),
      ).rejects.toThrow('Delete operation failed');
    });
  });
});
