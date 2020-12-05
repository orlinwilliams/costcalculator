import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-env-factors-table',
  templateUrl: './env-factors-table.component.html',
  styleUrls: ['./env-factors-table.component.css']
})
export class EnvFactorsTableComponent implements OnInit {

  @Output() calculatedTAF = new EventEmitter();

  private AFactorElements:number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0];
  private previousState:any =['','','','','','','','','','','','',''];
  private AFactor:number = 0;
  public TAF:number = 0;

  constructor(
    private modalService: NgbModal,
    ) {}

  public calculateTAF() {

    let levels = document.querySelectorAll("#env-factors-table input[type=number]");
    let weights = document.querySelectorAll("#env-factors-table td[class=AFweight]");

    for (let index = 0; index < levels.length; index++) {
      this.AFactorElements[index] = +weights[index].textContent * +(<HTMLInputElement>levels[index]).value;
      this.previousState[index] = (<HTMLInputElement>levels[index]).value;
    }

    this.AFactor = 0;

    for (let index = 0; index < this.AFactorElements.length; index++) {
      this.AFactor += this.AFactorElements[index];
    }

    this.TAF = 1.4 + (-0.03*this.AFactor);

    this.calculatedTAF.emit(this.TAF);

  }



  open(longContent) {
    this.modalService.open(longContent, {ariaLabelledBy: 'modal-basic-title' , size: 'lg', scrollable: true})
      
      let levels = document.querySelectorAll("#env-factors-table input[type=number]");

      for (let index = 0; index < levels.length; index++) {
          (<HTMLInputElement>levels[index]).value = `${this.previousState[index]}` ;
      }
  }

  ngOnInit(): void {
  }

}
