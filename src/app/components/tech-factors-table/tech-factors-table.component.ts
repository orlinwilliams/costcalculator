import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tech-factors-table',
  templateUrl: './tech-factors-table.component.html',
  styleUrls: ['./tech-factors-table.component.css']
})
export class TechFactorsTableComponent implements OnInit {

  @Output() calculatedTCF = new EventEmitter();
  
  private TFactorElements:number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0];
  private previousState:any =['','','','','','','','','','','','',''];
  private TFactor:number = 0;
  public TCF:number = 0;

  constructor(
    private modalService: NgbModal,
    ) {}

  public calculateTCF() {

    let levels = document.querySelectorAll("#tech-factors-table input[type=number]");
    let weights = document.querySelectorAll("#tech-factors-table td[class=TFweight]");

    for (let index = 0; index < levels.length; index++) {
      this.TFactorElements[index] = +weights[index].textContent * +(<HTMLInputElement>levels[index]).value;
      this.previousState[index] = (<HTMLInputElement>levels[index]).value;
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
          (<HTMLInputElement>levels[index]).value = `${this.previousState[index]}` ;
      }
  }


  ngOnInit(): void {
  }

}
