import { Component, OnInit } from '@angular/core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { HtmlTagDefinition } from '@angular/compiler';
@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {
  faQuestionCircle = faQuestionCircle;
  
  // ---------------start model of use case points [variables]--------------------
  public TCF:number = 0;
  public TAF:number = 0;
  public AUW:number = 0;
  public UUCW:number = 0;
  public UUCP:number = 0;
  public UCP:number = 0;
  public randomHoursMan:number[] = [0,0,0,0,0];
  // ------------end model of use case points [variables]--------------------

  constructor() { }

  // ---------------start model of use case points [methods]--------------------
  gotTCF(TCF) {
    this.TCF = TCF;
    
    this.calculateUCP();

    this.calculateHoursMan();

    console.log(`
      TCF = ${this.TCF}
      TAF = ${this.TAF}
      UCP = ${this.UCP}
      HoursMan = [${this.randomHoursMan}]`);
  }

  gotTAF(TAF) {
    this.TAF = TAF;

    this.calculateUCP();

    this.calculateHoursMan();

    console.log(`
      TCF = ${this.TCF}
      TAF = ${this.TAF}
      UCP = ${this.UCP}
      randomHoursMan = [${this.randomHoursMan}]`);
  }

  calculateUUCP() {
    let simpleActors:number = +(<HTMLInputElement>document.getElementById('simpleActor')).value;
    let mediumActors:number = +(<HTMLInputElement>document.getElementById('mediumActor')).value;
    let complexActors:number = +(<HTMLInputElement>document.getElementById('complexActor')).value;
    let simpleCases:number = +(<HTMLInputElement>document.getElementById('simpleUse')).value;
    let mediumCases:number = +(<HTMLInputElement>document.getElementById('mediumUse')).value;
    let complexCases:number = +(<HTMLInputElement>document.getElementById('complexUse')).value;

    this.AUW = (simpleActors*1)+(mediumActors*2)+(complexActors*3);
    this.UUCW = (simpleCases*5)+(mediumCases*10)+(complexCases*15);

    this.UUCP = this.AUW + this.UUCW;

    this.calculateUCP();

    this.calculateHoursMan();
  }

  calculateUCP() {
    this.UCP = this.UUCP * this.TCF * this.TAF;
  }

  calculateHoursMan() {
    for (let index = 0; index < this.randomHoursMan.length; index++) {
      this.randomHoursMan[index] = this.UCP*this.getRandomInt(15,25);
      
    }
  }

  getRandomInt(min, max):number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  // ------------end model of use case points [methods]--------------------



  ngOnInit(): void {
  }

}
