// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAwMZ_QmkMIuY9H6rI6a7-yiy-A_MLWGWc',
    authDomain: 'distribuidora-salinas.firebaseapp.com',
    projectId: 'distribuidora-salinas',
    storageBucket: 'distribuidora-salinas.appspot.com',
    messagingSenderId: '990711237206',
    appId: '1:990711237206:web:f9dde8c12a958d1acdc9f7',
    measurementId: 'G-D11WYHHKTQ'
  },
  emailJs: {
    serviceId: 'service_stts5ed',
    templateId: 'template_m4y8sya',
    userId: 'user_StYp1VuV1vfLde44fjqVJ',
    accessToken: '2e5da7ac3b38e816a773e1790840fb68',
  },
  urlsInternas: {
    home: 'http://localhost:4200/#/home',
    carrito: 'http://localhost:4200/#/carrito'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
