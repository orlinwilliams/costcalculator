import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css'],
})
export class PriceComponent implements OnInit {
  @Output()currentPrice:EventEmitter<number> = new EventEmitter();
  
  faQuestionCircle = faQuestionCircle;
  price: number = 0;

  formPrice = new FormGroup({
    monthlySalary: new FormControl('', [Validators.required]),
    fixedCosts: new FormControl('', [Validators.required]),
    monthlyHours: new FormControl('', [Validators.required]),
    hoursNotWorked: new FormControl('', [Validators.required]),
  });
  subscription: Subscription;
  constructor(private dataService:DataService) {}

  ngOnInit(): void {
    this.subscription = this.dataService.getChangesInObjectData().subscribe((data) => {
      this.formPrice.setValue({
          'monthlySalary': data.monthlySalary,
          'monthlyHours': data.monthlyHours,
          'fixedCosts': data.fixedCosts,
          'hoursNotWorked': data.hoursNotWorked
        });
      this.generatePrice();
    }); 
  }

  //FUNCION QUE CALCULA EL PRECIO MINIMO POR HORA DE TRABAJO
  generatePrice() {
    let monthlySalary = this.formPrice.get('monthlySalary').value;
    let fixedCosts = this.formPrice.get('fixedCosts').value;
    let monthlyHours = this.formPrice.get('monthlyHours').value;
    let hoursNotWorked = this.formPrice.get('hoursNotWorked').value;


    this.dataService.data.monthlySalary = monthlySalary;
    this.dataService.data.fixedCosts = fixedCosts;
    this.dataService.data.monthlyHours = monthlyHours;
    this.dataService.data.hoursNotWorked = hoursNotWorked;
    
    //FORMULA PARA CALCULAR EL PRECIO
    this.price = (monthlySalary + fixedCosts) / (monthlyHours - hoursNotWorked);
    this.dataService.dataPrice = this.price;
    this.currentPrice.emit(this.price);
    this.dataService.data.hourValue = +(this.price.toFixed(2));
    
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  
}
