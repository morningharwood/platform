import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { MhFirestoreClientModule } from './firestore/mh-client.module';
import { metaReducers, reducers } from './reducers';
import { config } from './router/config';
import { RouterEffects } from './router/effects';
import { MorningHarwoodRouterModule } from './router/router.module';
import { CustomSerializer } from './router/state';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'morningharwood-ssr' }),
    NxModule.forRoot(),
    MhFirestoreClientModule.forRoot(),
    AngularFireAuthModule,
    RouterModule.forRoot(config, { initialNavigation: 'enabled' }),
    MorningHarwoodRouterModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ RouterEffects ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  declarations: [ AppComponent ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer,
    },
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
