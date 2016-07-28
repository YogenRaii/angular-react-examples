import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase,
		AngularFire, AuthMethods, AuthProviders, firebaseAuthConfig } from 'angularfire2';

if (environment.production) {
	enableProdMode();
}

bootstrap(AppComponent,[
	FIREBASE_PROVIDERS,
	defaultFirebase({
		apiKey: "AIzaSyDFQ3y7cbagnr7PPPkOJ3rQJvFdBrmO8Co",
		authDomain: "chiyaguff-5696e.firebaseapp.com",
		databaseURL: "https://chiyaguff-5696e.firebaseio.com",
		storageBucket: ""
	}),

	firebaseAuthConfig({
		provider: AuthProviders.Google,
		method: AuthMethods.Redirect
	})
]);
