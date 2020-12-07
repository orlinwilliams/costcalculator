import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
// import {TimeComponent} from '../time/time.component';

@Component({
  // providers:[TimeComponent],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public data:any;

  public states: any;

  constructor(
    private firestoreService: FirestoreService, 
    // private comp:TimeComponent,
  ) { }

  ngOnInit(): void {
    this.firestoreService.getStates().subscribe((listOfStates) => {
      this.states = [];
      listOfStates.forEach((stateData: any) => {
        this.states.push({
          id: stateData.payload.doc.id,
          data: stateData.payload.doc.data()
        });
      })
      console.log(this.states);
    });
  }

  // CREATE (CRUD)
  async saveData() {
    
    let today = new Date();

    // STATIC DATA
    this.data = {
      'date': '',
      'linesQuantity': 30000,
      'developmentMode': 1,
      'simpleActor': 1,
      'mediumActor': 1,
      'complexActor': 1,
      'simpleUse': 1,
      'mediumUse': 1,
      'complexUse': 1,
      'technicalFactorsLevels': [1,0,0,1,0,3,4,4,1,3,1,4,2],
      'ambientalFactorsLevels': [1,0,0,1,0,3,4,4],
      'randomHoursMan': [0,0,0,0,0],
      'monthlySalary': 20000,
      'fixedCosts': 900,
      'monthlyHours': 160,
      'hoursNotWorked':20,
      'hourValue': 120,
      'numberOfTeamMembers': 3,
      'effort': 33.40,
    };

    this.data.date = `${today.toDateString()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`

    // SAVE DATA IN FIREBASE
    try {

      await this.firestoreService.createState(this.data);
      alert(`Datos guardados con el nombre: ${this.data.date}`);

    } catch (error) {
      console.log(error);
    }
  }


  // READ (CRUD) AND LOAD DATA INTO THE INPUTS
  loadData(state) {

    console.log(state);
    // this.comp.loadDataFromState(state);
    
    // COCOMO
    (<HTMLInputElement>document.getElementById('linesQuantity')).value = state.data.linesQuantity;
    (<HTMLInputElement>document.getElementById('developmentMode')).value = state.data.developmentMode;

    //actors
    (<HTMLInputElement>document.getElementById('simpleActor')).value = state.data.simpleActor;
    (<HTMLInputElement>document.getElementById('mediumActor')).value = state.data.mediumActor;
    (<HTMLInputElement>document.getElementById('complexActor')).value = state.data.complexActor;

    //Use cases
    (<HTMLInputElement>document.getElementById('simpleUse')).value = state.data.simpleUse;
    (<HTMLInputElement>document.getElementById('mediumUse')).value = state.data.mediumUse;
    (<HTMLInputElement>document.getElementById('complexUse')).value = state.data.complexUse;

    //levels of technical factors
    let levels = document.querySelectorAll("#tech-factors-table input[type=number]");
    for (let index = 0; index < levels.length; index++) {
      (<HTMLInputElement>levels[index]).value = state.data.technicalFactorsLevels[index];
    }

    //levels of ambiental factors
    levels = document.querySelectorAll("#env-factors-table input[type=number]");
    console.log(levels.length);
    for (let index = 0; index < levels.length; index++) {
      (<HTMLInputElement>levels[index]).value = state.data.ambientalFactorsLevels[index];
      console.log((<HTMLInputElement>levels[index]).value);
    }

    //price
    (<HTMLInputElement>document.getElementById('monthlySalary')).value = state.data.monthlySalary;
    (<HTMLInputElement>document.getElementById('fixedCosts')).value = state.data.fixedCosts;
    (<HTMLInputElement>document.getElementById('monthlyHours')).value = state.data.monthlyHours;
    (<HTMLInputElement>document.getElementById('hoursNotWorked')).value = state.data.hoursNotWorked;

    //cost
    (<HTMLInputElement>document.getElementById('hourValue')).value = state.data.hourValue;
    (<HTMLInputElement>document.getElementById('numberOfTeamMembers')).value = state.data.numberOfTeamMembers;
    (<HTMLInputElement>document.getElementById('effort')).value = state.data.effort;
    
  }

}
