const columnsMappings = {
  Name: 'name',
  'Pokedex Number': 'pokedexNumber',
  'Img name': 'imgName',
  Generation: 'generation',
  'Evolution Stage': 'evolutionStage',
  Evolved: 'evolved',
  FamilyID: 'familyID',
  'Cross Gen': 'crossGen',
  'Type 1': 'type1',
  'Type 2': 'type2',
  'Weather 1': 'weather1',
  'Weather 2': 'weather2',
  'STAT TOTAL': 'statTotal',
  ATK: 'atk',
  DEF: 'def',
  STA: 'sta',
  Legendary: 'legendary',
  Aquireable: 'acquireable',
  Spawns: 'spawns',
  Regional: 'regional',
  Raidable: 'raidable',
  Hatchable: 'hatchable',
  Shiny: 'shiny',
  Nest: 'nest',
  New: 'new',
  'Not-Gettable': 'notGettable',
  'Future Evolve': 'futureEvolve',
  '100% CP @ 40': 'cp40',
  '100% CP @ 39': 'cp39',
};

export function mapDataToColumns(data: any[], headers: string[]): any[] {
  try {
    return data.map((row) => {
      const mappedData: any = {};
      for (const header of headers) {
        if (columnsMappings[header]) {
          const columnValue = row[headers.indexOf(header)];
          if (
            columnsMappings[header] === 'imgName' ||
            columnsMappings[header] === 'evolutionStage'
          ) {
            mappedData[columnsMappings[header]] = String(columnValue);
          } else if (
            columnsMappings[header] === 'type1' ||
            columnsMappings[header] === 'type2'
          ) {
            mappedData[columnsMappings[header]] = columnValue?.toUpperCase();
          } else {
            mappedData[columnsMappings[header]] = columnValue;
          }
        }
      }
      return mappedData;
    });
  } catch (e) {
    console.log('error occured during mapping data to colums');
    throw e;
  }
}
