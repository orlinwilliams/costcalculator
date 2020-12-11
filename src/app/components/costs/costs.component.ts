import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';
import { Chart } from 'node_modules/chart.js';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css'],
})
export class CostsComponent implements OnInit, OnChanges {
  faQuestionCircle = faQuestionCircle;
  @Input() currentPrice: number;
  subscription: Subscription;

  TT: number[] = [];
  VMT: number[] = [];
  TTCOCOMO: number[] = [];
  VMTCOCOMO: number[] = [];

  public chart1:any;
  public chart2:any;

  formCosts = new FormGroup({
    hourValue: new FormControl('', [Validators.required, Validators.min(50)]),
    numberOfTeamMembers: new FormControl('', [Validators.min(1)]),
    effort: new FormControl('33.40', [Validators.required, Validators.min(10)]),
  });


  constructor(
    private dataService: DataService
    ) {}

  ngOnInit(): void {
    this.renderChart('init', 'costChart', [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]);
    this.renderChart('init', 'timeChart', [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]);
    this.subscription = this.dataService.getChangesInObjectData().subscribe((data) => {
      this.formCosts.setValue({
        'hourValue': data.hourValue,
        'numberOfTeamMembers': data.numberOfTeamMembers,
        'effort': data.effort,
      });
      this.generateCostsAndTimes();
    });
  }

  renderChart(renderType, unitType, COCOMODataset, UCPDataset) {

    let barData = {
      labels: ['1', '2', '3', '4', '5'],
      datasets: [
        {
          label: 'Modelo COCOMO',
          backgroundColor: 'rgba(189, 195, 199, 1)',
          borderWidth: 1,
          data: COCOMODataset,
        },
        {
          label: 'Modelo de puntos de casos de uso',
          backgroundColor: 'rgba(92, 170, 191, 1)',
          borderWidth: 1,
          data: UCPDataset,
        },
      ],
    };
    
    if(renderType === 'init'){

      const canvas = <HTMLCanvasElement> document.getElementById(unitType);
      const ctx = canvas.getContext('2d');

      if (unitType !=='costChart'){
      this.chart1 = new Chart(ctx, {
        type: 'bar',
        data: barData,
        options: {
          responsive: true,
          legend: {
            position: 'top',
          },
          title: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Resultados',
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  display: true,
                },
                scaleLabel: {
                  display: true,
                  labelString:'Tiempo (Horas)',
                  fontSize: 14,
                },
              },
            ],
          },
        },
      });
      } 
      else 
      {
        this.chart2 = new Chart(ctx, {
          type: 'bar',
          data: barData,
          options: {
            responsive: true,
            legend: {
              position: 'top',
            },
            title: {
              display: false,
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Resultados',
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    display: true,
                  },
                  scaleLabel: {
                    display: true,
                    labelString:'costo (L)',
                    fontSize: 14,
                  },
                },
              ],
            },
          },
        });
      }
    } else {

      if (unitType === 'costChart') {
        this.chart2.data = barData;
        this.chart2.update();
      } else {
        this.chart1.data = barData;
        this.chart1.update();
      }

    }
  }

  //Evento que captura el precio mínimo 
  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentPrice > 0) {
      this.formCosts.patchValue({ hourValue: this.currentPrice.toFixed(2) });
    }
  }

  //Calculo de costos y tiempo y generar gráficas
  generateCostsAndTimes() {

    this.dataService.data.hourValue = this.formCosts.get('hourValue').value;
    this.dataService.data.numberOfTeamMembers = this.formCosts.get('numberOfTeamMembers').value;
    this.dataService.data.effort = this.formCosts.get('effort').value;
    
    //--------------Graficas de tiempo--------------
    
    // dividir el tiempo de horas-hombre entre los miembros del equipo para dar un tiempo inversamente proporcional al tamaño del equipo
    let UseCaseDataset = this.dataService.HoursMan.map((hourMan:number) => {
      return +((hourMan/+(this.formCosts.get('numberOfTeamMembers').value)).toFixed(2))
    });

    // dividir el tiempo de horas-hombre entre los miembros del equipo para dar un tiempo inversamente proporcional al tamaño del equipo
    let COCOMODataset = this.dataService.data.randomHoursManCOCOMO.map((hourMan) => {
      return +((hourMan/+(this.formCosts.get('numberOfTeamMembers').value)).toFixed(2))
    });
    this.renderChart('update', 'timeChart', COCOMODataset, UseCaseDataset);

    //--------------Grafica de costos---------------
  
    //--------Modelo SDLC basado en modelo de puntos de caso-------
    this.TT = this.dataService.HoursMan.map((hourMan:number) => {
      return (hourMan * 100) / (this.formCosts.get('effort').value);
    });

    this.TTCOCOMO = this.dataService.data.randomHoursManCOCOMO.map((hourMan:number) => {
      return (hourMan * 100) / (this.formCosts.get('effort').value);
    });

    this.VMT = this.TT.map((tt:number) => {
      return +((tt * this.formCosts.get('hourValue').value).toFixed(2));
    });

    this.VMTCOCOMO = this.TTCOCOMO.map((tt:number) => {
      return +((tt * this.formCosts.get('hourValue').value).toFixed(2));
    });
    //---------------Fin modelo SDLC----------------------------- 

    
    // console.log(this.VMT); 
    // console.log(this.dataService.data.randomHoursMan);
    // dataset de prueba [150000, 143000, 142000, 122000, 133000]

    this.renderChart('update','costChart',this.VMTCOCOMO, this.VMT);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
