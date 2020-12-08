import { Component, OnInit } from '@angular/core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css'],
})
export class TimeComponent implements OnInit {
  faQuestionCircle = faQuestionCircle;
  subscription: Subscription;

  time: any = {
    linesQuantity: 0,
    developmentMode: 0,
  };
  
  // ---------------start model of use case points [variables]--------------------
  public TCF:number = 0;
  public TAF:number = 0;
  public AUW:number = 0;
  public UUCW:number = 0;
  public UUCP:number = 0;
  public UCP:number = 0;
  public randomHoursMan:number[] = [0, 0, 0, 0, 0];
  // ----------------end model of use case points [variables]--------------------
  

  // ----------------start COCOMO model [variables]--------------------
  public KLOCS = 0;
  public Ei = 0;
  public Td = 0;
  public Hd = 0;
  public randomHoursManCOCOMO:number[] = [0, 0, 0, 0, 0];
  // -----------------end COCOMO model [variables]---------------------


  constructor(private dataService:DataService) {}

  // ---------------start model of use case points [methods]--------------------
  gotTCF(TCF) {
    this.TCF = TCF;
    this.calculateHoursMan();
  }

  gotTAF(TAF) {
    this.TAF = TAF;
    this.calculateHoursMan();
  }

  calculateUUCP() {
    let simpleActors:number = +(<HTMLInputElement>document.getElementById('simpleActor')).value;
    let mediumActors:number = +(<HTMLInputElement>document.getElementById('mediumActor')).value;
    let complexActors:number = +(<HTMLInputElement>document.getElementById('complexActor')).value;
    let simpleCases:number = +(<HTMLInputElement>document.getElementById('simpleUse')).value;
    let mediumCases:number = +(<HTMLInputElement>document.getElementById('mediumUse')).value;
    let complexCases:number = +(<HTMLInputElement>document.getElementById('complexUse')).value;

    this.dataService.data.simpleActors = simpleActors;
    this.dataService.data.mediumActors = mediumActors;
    this.dataService.data.complexActors = complexActors;
    this.dataService.data.simpleUse = simpleCases;
    this.dataService.data.mediumUse = mediumCases;
    this.dataService.data.complexUse = mediumCases;

    this.AUW = (simpleActors*1)+(mediumActors*2)+(complexActors*3);
    this.UUCW = (simpleCases*5)+(mediumCases*10)+(complexCases*15);

    this.UUCP = this.AUW + this.UUCW;

    this.calculateHoursMan();
  }

  calculateUCP() {
    this.UCP = this.UUCP * this.TCF * this.TAF;
  }

  getRandomInt(min, max):number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  calculateHoursMan() {
    
    this.calculateUCP();

    for (let index = 0; index < this.randomHoursMan.length; index++) {
      this.randomHoursMan[index] = this.UCP*this.getRandomInt(15,25);
    }

    // console.log('UCP '+this.UCP);
    // console.log('TAF '+this.TCF);
    // console.log('TCF '+this.TCF);
    // console.log(this.randomHoursMan);
    this.dataService.data.randomHoursMan = this.randomHoursMan;
    this.dataService.HoursMan = this.randomHoursMan;
  }

  // ----------------end model of use case points [methods]--------------------

  // ----------------start COCOMO model [methods]--------------------
  calculateHd(){
    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;

    this.time.linesQuantity = +(<HTMLInputElement>document.getElementById('linesQuantity')).value;
    this.time.developmentMode = +(<HTMLInputElement>document.getElementById('developmentMode')).value;

    this.dataService.data.linesQuantity = this.time.linesQuantity;
    this.dataService.data.developmentMode = this.time.developmentMode;

    if (this.time.developmentMode == 1) {
      a = 3.2;
      b = 1.05;
      c = 2.5;
      d = 0.38;

    }
    else if (this.time.developmentMode == 2) {
        a = 3.0;
        b = 1.12;
        c = 2.5;
        d = 0.35;

    }
    else {
        let a = 2.8;
        let b = 1.20;
        let c = 2.5;
        let d = 0.32;

    }
    this.KLOCS = this.time.linesQuantity * 0.001;
    this.Ei = a * Math.pow(this.KLOCS, b);
    this.Td = c * Math.pow(this.Ei, d);
    this.Hd = this.Td * 170;

    // console.log(this.KLOCS);
    // console.log(this.Ei);
    // console.log(this.Td);
    // console.log(this.Hd);

    for (let index = 0; index < this.randomHoursManCOCOMO.length; index++) {
      this.randomHoursManCOCOMO[index] = this.Hd;
    }

    // console.log('UCP '+this.UCP);
    // console.log('TAF '+this.TCF);
    // console.log('TCF '+this.TCF);
    // console.log(this.randomHoursMan);
    this.dataService.data.randomHoursMan = this.randomHoursMan;
    this.dataService.data.randomHoursManCOCOMO = this.randomHoursManCOCOMO;
    // this.dataService.HoursMan = this.randomHoursMan;
  }

  // ----------------end COCOMO model [methods]--------------------


  async ngOnInit() {

    this.subscription = await this.dataService.getChangesInObjectData().subscribe((data) => {

      // COCOMO
      (<HTMLInputElement>document.getElementById('linesQuantity')).value = data.linesQuantity;
      (<HTMLInputElement>document.getElementById('developmentMode')).value = data.developmentMode;

      // actors
      (<HTMLInputElement>document.getElementById('simpleActor')).value = data.simpleActors;
      (<HTMLInputElement>document.getElementById('mediumActor')).value = data.mediumActors;
      (<HTMLInputElement>document.getElementById('complexActor')).value = data.complexActors;

      // Use cases
      (<HTMLInputElement>document.getElementById('simpleUse')).value = data.simpleUse;
      (<HTMLInputElement>document.getElementById('mediumUse')).value = data.mediumUse;
      (<HTMLInputElement>document.getElementById('complexUse')).value = data.complexUse;

      this.calculateUUCP();
    });
  }
  
  //FUNCION QUE ENVIA LOS DATOS/PARAMETROS PARA CALCULAR EL TIEMPO AL OTRO COMPONENTE
  onTime() {
    // this.dataService.dataTime = this.time; 
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
