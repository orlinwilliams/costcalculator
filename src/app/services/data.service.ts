import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class DataService {
 
  private subject = new Subject<any>();
 
  dataTime: any = {};
  dataPrice: number = 0;
  HoursMan: any = [];

  // for Firebase data
  data: any = {
    'date': '',
    'linesQuantity': '',
    'developmentMode': '',
    'simpleActors': '',
    'mediumActors': '',
    'complexActors': '',
    'simpleUse': '',
    'mediumUse': '',
    'complexUse': '',
    'technicalFactorsLevels': ['', '', '', '', '', '', '', '', '', '', '', '', ''],
    'ambientalFactorsLevels': ['', '', '', '', '', '', '', ''],
    'randomHoursMan': [0, 0, 0, 0, 0],
    'randomHoursManCOCOMO': [0, 0, 0, 0, 0],
    'monthlySalary': '',
    'fixedCosts': '',
    'monthlyHours': '',
    'hoursNotWorked': '',
    'hourValue': '',
    'numberOfTeamMembers': '',
    'effort': 33.40,
  };


  constructor() {}


  changeObjectData(data) {
    this.data = data;
    this.subject.next(data);
  }

  getChangesInObjectData(): Observable<any> {
    return this.subject.asObservable();
  }
}
