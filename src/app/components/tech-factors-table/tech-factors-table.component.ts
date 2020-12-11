import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tech-factors-table',
  templateUrl: './tech-factors-table.component.html',
  styleUrls: ['./tech-factors-table.component.css']
})
export class TechFactorsTableComponent implements OnInit {

  @Output() calculatedTCF = new EventEmitter();
  
  private TFactorElements:number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  private previousState:any = ['', '', '', '', '', '', '', '', '', '', '', '', ''];
  private TFactor:number = 0;
  public TCF:number = 0;
  private subscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    ) {}

  async ngOnInit() {
    this.subscription = await this.dataService.getChangesInObjectData().subscribe((data) => {
      let levels = document.querySelectorAll("#tech-factors-table input[type=number]");

      for (let index = 0; index < levels.length; index++) {
        this.previousState[index] = data.technicalFactorsLevels[index];
      }
      this.calculateTCF();
    });
  }

  public calculateTCF() {

    let levels = document.querySelectorAll("#tech-factors-table input[type=number]");
    let weights = document.querySelectorAll("#tech-factors-table td[class=TFweight]");

    for (let index = 0; index < levels.length; index++) {
      this.TFactorElements[index] = +weights[index].textContent * +(<HTMLInputElement>levels[index]).value;
      this.dataService.data.technicalFactorsLevels[index] = (<HTMLInputElement>levels[index]).value;
    }

    this.TFactor = 0;

    for (let index = 0; index < this.TFactorElements.length; index++) {
      this.TFactor += this.TFactorElements[index];
    }

    this.TCF = 0.6 + (0.01*this.TFactor);

    this.calculatedTCF.emit(this.TCF);

  }



  open(longContent) {
    this.modalService.open(longContent, {ariaLabelledBy: 'modal-basic-title' , size: 'lg', scrollable: true})

    let levels = document.querySelectorAll("#tech-factors-table input[type=number]");

    for (let index = 0; index < levels.length; index++) {
        (<HTMLInputElement>levels[index]).value = this.dataService.data.technicalFactorsLevels[index];
    }

    this.calculateTCF();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  
}
