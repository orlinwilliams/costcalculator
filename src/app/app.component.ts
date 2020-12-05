import { Component,} from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'costcalculator';
  price:number = 0;
  
  constructor(private dataService:DataService)  {    
  }
  

  
}
