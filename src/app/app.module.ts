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



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GreetComponent,
    TimeComponent,
    PriceComponent,
    CostsComponent,
    TechFactorsTableComponent,
    EnvFactorsTableComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
