import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';
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
  constructor(private dataService:DataService) {}

  ngOnInit(): void {}
  generatePrice() {
    let monthlySalary = this.formPrice.get('monthlySalary').value;
    let fixedCosts = this.formPrice.get('fixedCosts').value;
    let monthlyHours = this.formPrice.get('monthlyHours').value;
    let hoursNotWorked = this.formPrice.get('hoursNotWorked').value;
    this.price = (monthlySalary + fixedCosts) / (monthlyHours + hoursNotWorked);
    this.dataService.dataPrice = this.price;
    this.currentPrice.emit(this.price);
    
  }
}
