const queryObject = [{'query':'lg oled', 'impressions':21129}, {'query':'oled tv', 'impressions':19637}, {'query':'mediamarkt black friday', 'impressions':15870}, {'query':'mobiele airco', 'impressions':15270}, {'query':'lg tv', 'impressions':11923}, {'query':'airco', 'impressions':9554}, {'query':'lg oled55c8pla', 'impressions':7913}, {'query':'miele wasmachine', 'impressions':7333}]
const feedAsArray = [['merk', 'type'],['Philips', 'HR 183600'],['Dyson', 'ALLERGYKIT'],['Philips', 'FC 806001'],['Samsung', 'RB 31 FERNCSAEF'],['Philips', 'SC 526512'],['Miele', 'HBD 6022 DEKSEL'],['Miele', 'HUB 5000 XLBRAADSLEDE'],['Miele', 'HBF 271 RONDEBAKVORMANTRACIET'],['Miele', 'HBB 51 BAKPLAATANTRACIET'],['Miele', 'HBBR 50 BAKENBRAADROOSTER'],['Miele', 'DGGL 10 STOOMOVENPANMETGATEN'],['Inventum', 'CC 08'],['Inventum', 'HW 508'],['Inventum', 'HNL 4212 Z'],['Tefal', 'RE 4588'],['Braun', 'MQ 700 SOUP'],['Tefal', 'FF 1231'],['Tefal', 'RE 5228']]
const URL = 'https://europe-west1-cloud-functions-wouter.cloudfunctions.net/fuzzywuzzy_list'

const _ = require('lodash')
const request = require("request")
let listOfOptions = []

let queryArray = []
for (var i=0; i<queryObject.length; i++){
    queryArray.push(queryObject[i]['query'])
}

// Dit is de functie die parallel uitgevoerd gaat worden.
const asyncOperation = function(options) {
    return new Promise(function(resolve, reject){
        request.post(options, function (err, response, body) {
            if (err) {
                reject(err)
            } else {
                resolve(response)
            }
        })
    })
};

let feedUnzipped = _.unzip(feedAsArray)

for (var i=0; i<feedUnzipped.length; i++) {
    let column = feedUnzipped[i];
    let columnUniq = _.uniq(column)
    // console.log('-----------')
    // console.log('columnUniq:')
    // console.log(columnUniq)

    let chunks = _.chunk(queryArray,2)
    // console.log('-----------')
    // console.log('chunks:')
    // console.log(chunks)

    for (var j=0; j<chunks.length; j++) {
        let chunk = chunks[j]

        const payload = {
            'searchterms': chunk,
            'brands': columnUniq
        }
        // console.log('-----------')
        // console.log('payload:')
        // console.log(payload)
    
        var options = {
            url: URL,
            'content-type': 'application/json',
            body: JSON.stringify(payload)
        }
    
        listOfOptions.push(options)

    }
}

// console.log('-----------')
// console.log('listOfOptions:')
// console.log(listOfOptions)

// Dit is de functie die uitgevoerd moet worden uiteindelijk. Geeft de resultaten van alle parallel uitgevoerde functies terug.
async function distribute() {
    // Running Promises in parallel
    const listOfPromises = listOfOptions.map(asyncOperation);
    // Harvesting
    return await Promise.all(listOfPromises);
}

let output = distribute()
console.log(output)
output.then(function(results){
    for (var i=0; i<results.length; i++) {
        console.log(results[i].body)
    }
})