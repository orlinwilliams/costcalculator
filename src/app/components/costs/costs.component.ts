import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css'],
})
export class CostsComponent implements OnInit, OnChanges {
  faQuestionCircle = faQuestionCircle;
  @Input()currentPrice:number;
  formCosts = new FormGroup({
    hourValue: new FormControl('', [Validators.required]),
    numberOfTeamMembers: new FormControl('', [Validators.required]),
    effort: new FormControl('33.40', [Validators.required]),
  });
  constructor(private dataService: DataService) {}
  ngOnInit(): void {    
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (this.currentPrice > 0) {
      this.formCosts.patchValue({ hourValue: this.currentPrice.toFixed(2) });
    }
    
  }

  generateCosts() {
    console.log(this.formCosts.value);
    console.log(this.dataService.dataTime);
  }
}
