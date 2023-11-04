import { Prisma } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  pokemonFixtures,
  createPokemonDtoFixture,
} from './fixtures/pokemon.fixtures';
import { PokemonV1Service } from './pokemon.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('PokemonV1Service', () => {
  let service: PokemonV1Service;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonV1Service,
        {
          provide: PrismaService,
          useValue: {
            pokemon: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              count: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PokemonV1Service>(PokemonV1Service);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listPokemons', () => {
    it('should return a list of pokemons and totalCount', async () => {
      const query = { limit: 10, offset: 0 };
      const totalCount = 2;

      (prismaService.pokemon.findMany as jest.Mock).mockResolvedValue(
        pokemonFixtures,
      );

      (prismaService.pokemon.count as jest.Mock).mockResolvedValue(totalCount);
      const result = await service.listPokemons(query);
      expect(result.data).toEqual(pokemonFixtures);
      expect(result.totalCount).toEqual(totalCount);
    });
    it('listPokemons should handle PrismaClientKnownRequestError incase of any error occuring', async () => {
      const query = { limit: 10, offset: 0 };
      const prismaError = new Prisma.PrismaClientKnownRequestError('Error', {
        code: 'P2002',
        clientVersion: '2.0.0',
        meta: {},
      });

      (prismaService.pokemon.findMany as jest.Mock).mockRejectedValue(
        prismaError,
      );
      await expect(service.listPokemons(query)).rejects.toThrow(
        Prisma.PrismaClientKnownRequestError,
      );
    });
  });
  describe('getPokemonById', () => {
    it('should return a pokemon if found', async () => {
      const pokemonId = 1;
      (prismaService.pokemon.findUnique as jest.Mock).mockResolvedValue(
        pokemonFixtures[0],
      );
      const pokemon = await service.getPokemonById(pokemonId);
      expect(pokemon).toEqual(pokemonFixtures[0]);
    });

    it('should throw NotFoundException if pokemon not found', async () => {
      const pokemonId = 999;
      (prismaService.pokemon.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.getPokemonById(pokemonId)).rejects.toThrow(
        NotFoundException,
      );
    });
    it('should handle PrismaClientKnownRequestError incase of any error occuring', async () => {
      const pokemonId = 999;
      const prismaError = new Prisma.PrismaClientKnownRequestError('Error', {
        code: 'P2002',
        clientVersion: '2.0.0',
        meta: {},
      });

      (prismaService.pokemon.findUnique as jest.Mock).mockRejectedValue(
        prismaError,
      );
      await expect(service.getPokemonById(pokemonId)).rejects.toThrow(
        Prisma.PrismaClientKnownRequestError,
      );
    });
  });

  describe('createPokemon', () => {
    it('should create and return a pokemon', async () => {
      (prismaService.pokemon.create as jest.Mock).mockResolvedValue({
        id: 3,
        ...createPokemonDtoFixture,
      });
      const newPokemon = await service.createPokemon(createPokemonDtoFixture);
      expect(newPokemon).toEqual({ id: 3, ...createPokemonDtoFixture });
    });
    it('should handle PrismaClientKnownRequestError incase of any error occuring', async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError('Error', {
        code: 'P2002',
        clientVersion: '2.0.0',
        meta: {},
      });

      (prismaService.pokemon.create as jest.Mock).mockRejectedValue(
        prismaError,
      );
      await expect(
        service.createPokemon(createPokemonDtoFixture),
      ).rejects.toThrow(Prisma.PrismaClientKnownRequestError);
    });
  });

  describe('updatePokemon', () => {
    it('should update and return a pokemon if it exists', async () => {
      const pokemonId = 1;
      const updatePokemonDto = { name: 'Updated Name' };
      (prismaService.pokemon.findUnique as jest.Mock).mockResolvedValue(
        pokemonFixtures[0],
      );
      (prismaService.pokemon.update as jest.Mock).mockResolvedValue({
        ...pokemonFixtures[0],
        ...updatePokemonDto,
      });
      const updatedPokemon = await service.updatePokemon(
        pokemonId,
        updatePokemonDto,
      );
      expect(updatedPokemon.name).toEqual('Updated Name');
    });

    it('should throw NotFoundException if pokemon to update does not exist', async () => {
      const pokemonId = 999;
      const updatePokemonDto = { name: 'Updated Name' };
      (prismaService.pokemon.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(
        service.updatePokemon(pokemonId, updatePokemonDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should handle PrismaClientKnownRequestError incase of any error occuring', async () => {
      const pokemonId = 999;
      const updatePokemonDto = { name: 'Updated Name' };
      const prismaError = new Prisma.PrismaClientKnownRequestError('Error', {
        code: 'P2002',
        clientVersion: '2.0.0',
        meta: {},
      });
      (prismaService.pokemon.findUnique as jest.Mock).mockResolvedValue(
        pokemonFixtures[0],
      );
      (prismaService.pokemon.update as jest.Mock).mockRejectedValue(
        prismaError,
      );
      await expect(
        service.updatePokemon(pokemonId, updatePokemonDto),
      ).rejects.toThrow(Prisma.PrismaClientKnownRequestError);
    });
  });

  describe('deletePokemonById', () => {
    it('should delete a pokemon if it exists', async () => {
      const pokemonId = 1;
      (prismaService.pokemon.delete as jest.Mock).mockResolvedValue({
        id: pokemonId,
      });
      await service.deletePokemonById(pokemonId);
      expect(prismaService.pokemon.delete).toHaveBeenCalledWith({
        where: { pokemonId },
      });
    });

    it('should throw NotFoundException if pokemon to delete does not exist', async () => {
      const pokemonId = 999;
      const prismaError = new Prisma.PrismaClientKnownRequestError('Error', {
        code: 'P2025',
        clientVersion: '2.0.0',
        meta: { cause: 'Record to delete does not exist.' },
      });
      (prismaService.pokemon.delete as jest.Mock).mockRejectedValue(
        prismaError,
      );
      await expect(service.deletePokemonById(pokemonId)).rejects.toThrow(
        Prisma.PrismaClientKnownRequestError,
      );
    });
    it('should handle PrismaClientKnownRequestError incase of any error occuring', async () => {
      const pokemonId = 999;
      const prismaError = new Prisma.PrismaClientKnownRequestError('Error', {
        code: 'P2002',
        clientVersion: '2.0.0',
        meta: {},
      });
      (prismaService.pokemon.delete as jest.Mock).mockRejectedValue(
        prismaError,
      );
      await expect(service.deletePokemonById(pokemonId)).rejects.toThrow(
        Prisma.PrismaClientKnownRequestError,
      );
    });
  });
});
