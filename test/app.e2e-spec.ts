import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { createPokemonDtoFixture } from '../src/pokemon/v1/fixtures/pokemon.fixtures';

import { AppModule } from '../src/app.module';

describe('PokemonV1Controller (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/v1/pokemons', () => {
    it('GET should retrieve pokemons with optional query params', () => {
      return request(app.getHttpServer())
        .get('/v1/pokemons')
        .query({ limit: 10, offset: 0 })
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body).toEqual(expect.any(Object));
        });
    });

    it('GET should fail if query params validation fails', () => {
      return request(app.getHttpServer())
        .get('/v1/pokemons')
        .query({ limit: 'invalid', offset: 'invalid' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('POST should create a new pokemon', () => {
      return request(app.getHttpServer())
        .post('/v1/pokemons')
        .send(createPokemonDtoFixture)
        .expect(HttpStatus.CREATED)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining(createPokemonDtoFixture),
          );
        });
    });

    it('POST should fail if body validation fails', () => {
      const invalidDto = {
        type1: 'test',
      };
      return request(app.getHttpServer())
        .post('/v1/pokemons')
        .send(invalidDto)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('PATCH should update a pokemon', async () => {
      const updatePokemonDto = {
        name: 'updated',
      };

      return request(app.getHttpServer())
        .patch('/v1/pokemons/1')
        .send(updatePokemonDto)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining(updatePokemonDto),
          );
        });
    });

    it('PATCH should fail if body validation fails', async () => {
      const invalidUpdateDto = {
        type1: 'test',
      };
      return request(app.getHttpServer())
        .patch('/v1/pokemons/1')
        .send(invalidUpdateDto)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('DELETE should remove a pokemon', async () => {
      return request(app.getHttpServer())
        .delete('/v1/pokemons/12')
        .expect(HttpStatus.NO_CONTENT);
    });
  });
});
