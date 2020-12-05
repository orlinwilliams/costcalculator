import { Component, OnInit } from '@angular/core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css'],
})
export class TimeComponent implements OnInit {
  faQuestionCircle = faQuestionCircle;
  time: any = {
    linesQuantity: '',
    developmentMode: '',
    actorsSimples: '',
    actorsMedios: '',
    actorsComplexs: '',
    casesSimples: '',
    casesMedios: '',
    casesComplexs: '',
    technicalFactor: '',
    ambientalFactor: '',
  };
  constructor(private dataService:DataService) {}

  ngOnInit(): void {}
  onTime() {
    this.dataService.dataTime = this.time;
    
  }
}
