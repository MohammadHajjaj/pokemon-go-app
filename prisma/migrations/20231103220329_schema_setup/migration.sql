-- CreateEnum
CREATE TYPE "POKEMON_TYPE" AS ENUM ('GRASS', 'FIRE', 'WATER', 'BUG', 'NORMAL', 'POISON', 'ELECTRIC', 'GROUND', 'FAIRY', 'FIGHTING', 'PSYCHIC', 'ROCK', 'GHOST', 'ICE', 'DRAGON', 'DARK', 'STEEL', 'FLYING');

-- CreateTable
CREATE TABLE "pokemons" (
    "pokemon_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pokedex_number" INTEGER NOT NULL,
    "img_name" TEXT NOT NULL,
    "generation" INTEGER NOT NULL,
    "evolution_stage" TEXT,
    "evolved" INTEGER NOT NULL,
    "family_id" INTEGER,
    "cross_gen" INTEGER NOT NULL,
    "type1" "POKEMON_TYPE" NOT NULL,
    "type2" "POKEMON_TYPE",
    "weather1" TEXT NOT NULL,
    "weather2" TEXT,
    "stat_total" INTEGER NOT NULL,
    "atk" INTEGER NOT NULL,
    "def" INTEGER NOT NULL,
    "sta" INTEGER NOT NULL,
    "legendary" INTEGER NOT NULL,
    "acquireable" INTEGER NOT NULL,
    "spawns" INTEGER NOT NULL,
    "regional" INTEGER NOT NULL,
    "raidable" INTEGER NOT NULL,
    "hatchable" INTEGER NOT NULL,
    "shiny" INTEGER NOT NULL,
    "nest" INTEGER NOT NULL,
    "new" INTEGER NOT NULL,
    "not_gettable" INTEGER NOT NULL,
    "future_evolve" INTEGER NOT NULL,
    "cp_40" INTEGER NOT NULL,
    "cp_39" INTEGER NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pokemons_pkey" PRIMARY KEY ("pokemon_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pokemons_name_key" ON "pokemons"("name");
