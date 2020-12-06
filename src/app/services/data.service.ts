import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataTime:any = {};
  dataPrice:number =0;
  constructor() { }
}
