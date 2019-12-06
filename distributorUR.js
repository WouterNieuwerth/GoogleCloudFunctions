const queryObject = [{'query':'lg oled', 'impressions':21129}, {'query':'oled tv', 'impressions':19637}, {'query':'mediamarkt black friday', 'impressions':15870}, {'query':'mobiele airco', 'impressions':15270}, {'query':'lg tv', 'impressions':11923}, {'query':'airco', 'impressions':9554}, {'query':'lg oled55c8pla', 'impressions':7913}, {'query':'miele wasmachine', 'impressions':7333}]
const feedAsArray = [['merk', 'type'],['Philips', 'HR 183600'],['Dyson', 'ALLERGYKIT'],['Philips', 'FC 806001'],['Samsung', 'RB 31 FERNCSAEF'],['Philips', 'SC 526512'],['Miele', 'HBD 6022 DEKSEL'],['Miele', 'HUB 5000 XLBRAADSLEDE'],['Miele', 'HBF 271 RONDEBAKVORMANTRACIET'],['Miele', 'HBB 51 BAKPLAATANTRACIET'],['Miele', 'HBBR 50 BAKENBRAADROOSTER'],['Miele', 'DGGL 10 STOOMOVENPANMETGATEN'],['Inventum', 'CC 08'],['Inventum', 'HW 508'],['Inventum', 'HNL 4212 Z'],['Tefal', 'RE 4588'],['Braun', 'MQ 700 SOUP'],['Tefal', 'FF 1231'],['Tefal', 'RE 5228']]

const _ = require('lodash')

let feedUnzipped = _.unzip(feedAsArray)
for (column in feedUnzipped) {
    let feedUnzippedUniq = _.uniq(feedUnzipped)
    console.log(feedUnzippedUniq)
}

async function distribute() {
    // Running Promises in parallel
    const listOfPromises = listOfArguments.map(asyncOperation);
    // Harvesting
    return await Promise.all(listOfPromises);
}