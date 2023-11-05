Pokémon Go App
--------------
This repository contains the backend implementation for a Pokemon Go-like application built with NestJS and Prisma ORM to interact with the database, which is PostgreSQL.

### Prerequisites

-   Node.js v16+
-   Docker

### Project structure

The app is structured as follows:

-   `prisma/schema.prisma`: The Prisma schema file for the db.
-   `prisma/seed.ts`: The seed file for prisma, initial data seeding is performed from an .xlsx file located `prisma/seed` folder.
-   `src/pokemon`: The main logic for the app, containing the Pokémon service, controller, DTO folder containing DTO files for the validations and a fixtures folder for data needed in unit tests
-   `src/common`: Contains common components for the app, such as the custom exception filter and error enums
-   `documentation`: Contains the Swagger documentation for the app and the Postman collection.


### Setup

**Running the app in a Docker container**

1.  Create a `.env` file in the root directory with the following contents:

```
DATABASE_URL="postgresql://pokemon_go_app:123@pokemon_go_db:5432/postgres?schema=public"
PORT="8080"
```

2\. Run the following command:

```
docker compose up
```
the application should now be accessible at http://localhost:8080.

**OPTIONAL: Running the app on your local machine**

1. Create a `.env` file in the root directory with the following contents:

```
DATABASE_URL="postgresql://pokemon_go_app:123@localhost:5445/postgres?schema=public" PORT="8080"
```

2\. Install the dependencies:

```
npm install
```

3\. Start the development server:

```
npm run start:dev
```
the application should now be accessible at http://localhost:8080.
To view the database locally, you can run `npx prisma studio` or connect to the database it using an external tool like DBeaver using the following credentials
```
Host: localhost:5445
Username: pokemon_go_app
Password: 123
Database: postgres
```
Running tests

-   Unit tests:
```
npm run test
```

* E2E tests:

1. Create a `.env.test` file in the root directory with the following contents:

```

DATABASE_URL="postgresql://pokemon_go_app:123@localhost:5446/postgres?schema=public"
PORT="8080"
```

2\. Run the following command:

```
npm run test:e2e
```

### API endpoints

The app has the following API endpoints:

-   `GET v1/pokemons`: Returns a list of Pokémon. Supports sorting, filtering, searching, and pagination.
-   `GET v1/pokemons/{pokemonId}`: Returns a Pokémon by its ID.
-   `POST v1/pokemons`: Creates a Pokémon.
-   `PATCH v1/pokemons/{pokemonId}`: Updates a Pokémon by its ID.
-   `DELETE v1/pokemons/{pokemonId}`: Deletes a Pokémon by its ID.

### API documentation

The API documentation is available in a YAML file inside the `documentation` folder. You can access it on the browser by going to `http://localhost:8080/api` after starting the application.
or by going into
https://app.swaggerhub.com/apis/MOHAMMADHAJJAJ/pokemon-go_api/1.0.0

### Error handling

error handling logic is added in all parts of the application, including adding a custom exception filter inside the `src/common` folder.

### Input validation

All endpoints have custom validations for each query parameter and body they accept. The validations can be found in the DTO folder `src/pokemon/v1/dto`.
### GitHub Actions

GitHub Actions are used to validate the lint, tests, and Docker image with each push to develop/feature branches or PRs.

