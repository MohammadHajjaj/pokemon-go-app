-- AlterTable
ALTER TABLE "pokemons" ALTER COLUMN "evolved" DROP NOT NULL,
ALTER COLUMN "evolved" SET DEFAULT 0,
ALTER COLUMN "cross_gen" DROP NOT NULL,
ALTER COLUMN "cross_gen" SET DEFAULT 0,
ALTER COLUMN "legendary" DROP NOT NULL,
ALTER COLUMN "legendary" SET DEFAULT 0,
ALTER COLUMN "acquireable" DROP NOT NULL,
ALTER COLUMN "acquireable" SET DEFAULT 0,
ALTER COLUMN "spawns" DROP NOT NULL,
ALTER COLUMN "spawns" SET DEFAULT 0,
ALTER COLUMN "regional" DROP NOT NULL,
ALTER COLUMN "regional" SET DEFAULT 0,
ALTER COLUMN "raidable" DROP NOT NULL,
ALTER COLUMN "raidable" SET DEFAULT 0,
ALTER COLUMN "hatchable" DROP NOT NULL,
ALTER COLUMN "hatchable" SET DEFAULT 0,
ALTER COLUMN "shiny" DROP NOT NULL,
ALTER COLUMN "shiny" SET DEFAULT 0,
ALTER COLUMN "nest" DROP NOT NULL,
ALTER COLUMN "nest" SET DEFAULT 0,
ALTER COLUMN "new" DROP NOT NULL,
ALTER COLUMN "new" SET DEFAULT 0,
ALTER COLUMN "not_gettable" DROP NOT NULL,
ALTER COLUMN "not_gettable" SET DEFAULT 0,
ALTER COLUMN "future_evolve" DROP NOT NULL,
ALTER COLUMN "future_evolve" SET DEFAULT 0;