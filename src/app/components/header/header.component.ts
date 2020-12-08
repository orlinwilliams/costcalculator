import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { DataService } from "../../services/data.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  public data:any;

  public states: any;

  constructor(
    private firestoreService: FirestoreService, 
    private dataService: DataService,
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
    });
  }

  // CREATE (CRUD)
  async saveData() {
    
    // console.log(this.dataService.data);

    let today = new Date();

    this.dataService.data.date = `${today.toDateString()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`

    // SAVE DATA IN FIREBASE
    try {

      await this.firestoreService.createState(this.dataService.data);
      alert(`Datos guardados con el nombre: ${this.dataService.data.date}`);

    } catch (error) {
      console.log(error);
    }
  }


  // READ (CRUD) AND LOAD DATA INTO THE INPUTS
  loadData(state) {
    
    // console.log(state.data);

    // this.dataService.data = state.data;

    this.dataService.changeObjectData(state.data);

    // console.log(this.dataService.data);

    // // COCOMO
    // (<HTMLInputElement>document.getElementById('linesQuantity')).value = this.dataService.data.linesQuantity;
    // (<HTMLInputElement>document.getElementById('developmentMode')).value = this.dataService.data.developmentMode;

    // // actors
    // (<HTMLInputElement>document.getElementById('simpleActor')).value = this.dataService.data.simpleActors;
    // (<HTMLInputElement>document.getElementById('mediumActor')).value = this.dataService.data.mediumActors;
    // (<HTMLInputElement>document.getElementById('complexActor')).value = this.dataService.data.complexActors;

    // // Use cases
    // (<HTMLInputElement>document.getElementById('simpleUse')).value = this.dataService.data.simpleUse;
    // (<HTMLInputElement>document.getElementById('mediumUse')).value = this.dataService.data.mediumUse;
    // (<HTMLInputElement>document.getElementById('complexUse')).value = this.dataService.data.complexUse;

    // // price
    // (<HTMLInputElement>document.getElementById('monthlySalary')).value = this.dataService.data.monthlySalary;
    // (<HTMLInputElement>document.getElementById('fixedCosts')).value = this.dataService.data.fixedCosts;
    // (<HTMLInputElement>document.getElementById('monthlyHours')).value = this.dataService.data.monthlyHours;
    // (<HTMLInputElement>document.getElementById('hoursNotWorked')).value = this.dataService.data.hoursNotWorked;

    // // cost
    // (<HTMLInputElement>document.getElementById('hourValue')).value = this.dataService.data.hourValue;
    // (<HTMLInputElement>document.getElementById('numberOfTeamMembers')).value = this.dataService.data.numberOfTeamMembers;
    // (<HTMLInputElement>document.getElementById('effort')).value = this.dataService.data.effort;
    
  }

  acercaDe() {
    alert(`Universidad Nacional Autónoma de Honduras\n\nDesarrollado por:\nAlejandro Claros\nOrlin Gomez\nErick Arguijo`);
  }

}
