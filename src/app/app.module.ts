//MODULOS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//COMPONENTES
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GreetComponent } from './components/greet/greet.component';
import { TimeComponent } from './components/time/time.component';
import { PriceComponent } from './components/price/price.component';
import { CostsComponent } from './components/costs/costs.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GreetComponent,
    TimeComponent,
    PriceComponent,
    CostsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
