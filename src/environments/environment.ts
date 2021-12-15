// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    contracts: {
        '0x4': '0xC5285BCc6e379e153119aAC4Ca46912e9D2859ba',
        '0x89': '0x0000000000000000000000000000000000000000'
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
