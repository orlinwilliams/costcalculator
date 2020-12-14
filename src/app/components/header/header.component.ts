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
    let name = (<HTMLInputElement>document.getElementById('name-state')).value;

    this.dataService.data.date = `${today.toDateString()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    this.dataService.data.name = name;

    // SAVE DATA IN FIREBASE
    try {

      await this.firestoreService.createState(this.dataService.data);

      (<HTMLInputElement>document.getElementById('name-state')).value = '';

      alert(`Datos guardados con el nombre: ${this.dataService.data.name}`);

    } catch (error) {
      console.log(error);
    }
  }


  // READ (CRUD) AND LOAD DATA INTO THE INPUTS
  loadData(state) {

    this.dataService.changeObjectData(state.data);
    
  }

  acercaDe() {
    alert(`Universidad Nacional Autónoma de Honduras\n\nDesarrollado por:\nAlejandro Claros\nOrlin Gomez\nErick Arguijo`);
  }

}
