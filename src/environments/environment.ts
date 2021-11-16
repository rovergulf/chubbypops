// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    contract: '0x2f391096d8D01620AF832fa1e6254E48013D6B92',
    templateId: '5ffc02e5-656c-46b3-b5ff-fc2254576d3e',
    apiUrl: {
        '0x3': 'http://localhost:9422/templates/5ffc02e5-656c-46b3-b5ff-fc2254576d3e/contract',
        '0x4': 'http://localhost:9422/templates/5ffc02e5-656c-46b3-b5ff-fc2254576d3e/contract',
        '0x1': 'http://localhost:9422/templates/5ffc02e5-656c-46b3-b5ff-fc2254576d3e/contract',
    },
    cdn: 'https://storage.googleapis.com/rovergulf/nft-gen/dev',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
