//MODULOS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
//COMPONENTES
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GreetComponent } from './components/greet/greet.component';
import { TimeComponent } from './components/time/time.component';
import { PriceComponent } from './components/price/price.component';
import { CostsComponent } from './components/costs/costs.component';
import { TechFactorsTableComponent } from './components/tech-factors-table/tech-factors-table.component';
import { EnvFactorsTableComponent } from './components/env-factors-table/env-factors-table.component';

// FIREBASE
import { AngularFireModule } from '@angular/fire';
import {environment} from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// CREDENTIALS FIREBASE
const config = {
  apiKey: "AIzaSyBMukomB1O3pN9yJA5bxOuEdp6RJ7BViuc",
  authDomain: "simulationtheory-bbfe1.firebaseapp.com",
  projectId: "simulationtheory-bbfe1",
  storageBucket: "simulationtheory-bbfe1.appspot.com",
  messagingSenderId: "986187015230",
  appId: "1:986187015230:web:1f79064344a902a4e21d6f"
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GreetComponent,
    TimeComponent,
    PriceComponent,
    CostsComponent,
    TechFactorsTableComponent,
    EnvFactorsTableComponent,
  ],
  imports: [  
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,

    // FIREBASE
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
