import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
    providers: [
    provideRouter(routes),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({
        projectId: 'wakanow-7d8bc',
        appId: '1:135383025310:web:e066cb1973e575bd141d8f',
        storageBucket: 'wakanow-7d8bc.appspot.com',
        apiKey: 'AIzaSyBEwkgJTeO1uILNhu603cbfrxNsk0WSw8w',
        authDomain: 'wakanow-7d8bc.firebaseapp.com',
        messagingSenderId: '135383025310',
    }))),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    provideAnimations()
],
};
