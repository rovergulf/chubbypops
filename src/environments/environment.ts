// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    cdn: 'https://storage.googleapis.com/rovergulf/nft-gen/dev',
    wcKey: '9cc3f2364853bdeb3ca3762ebd047380',
    infuraId: '7df67714e7824f02960a9b874a98dde9',
    contracts: {
        '0x4': '0x13520FDfCe784c5d0B85cf88ad1E37DdB2c2486a',
        '0x89': '0x2279b871E86DA07D2317051ba8005a960992294f'
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
