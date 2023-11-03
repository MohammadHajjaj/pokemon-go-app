import { PrismaClient } from '@prisma/client';
import * as xlsx from 'node-xlsx';
import { mapDataToColumns } from './seed/columnsMappings';

const prisma = new PrismaClient();

async function main() {
  const workSheetsFromFile = xlsx.parse(`${__dirname}/seed/pokemonGo.xlsx`);
  const data = workSheetsFromFile[0]?.data;
  if (!data) throw new Error('Error occured while parsing the xlsx file');
  // Extract column names
  const headers = data?.shift();

  const mappedPokemons = mapDataToColumns(data, headers);
  for (const pokemonData of mappedPokemons) {
    await prisma.pokemon.upsert({
      where: { name: pokemonData.name },
      update: pokemonData,
      create: pokemonData,
    });
  }
}

main()
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
