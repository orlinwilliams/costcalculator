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
<<<<<<< Updated upstream
=======
import { Chart } from 'node_modules/chart.js';
>>>>>>> Stashed changes
@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css'],
})
export class CostsComponent implements OnInit, OnChanges {
  faQuestionCircle = faQuestionCircle;
  @Input() currentPrice: number;
  TT: number[] = [];
  VMT: number[] = [];

  formCosts = new FormGroup({
    hourValue: new FormControl('', [Validators.required, Validators.min(50)]),
    numberOfTeamMembers: new FormControl('', [Validators.min(1)]),
    effort: new FormControl('33.40', [Validators.required, Validators.min(10)]),
  });

  constructor(private dataService: DataService) {}
<<<<<<< Updated upstream
  ngOnInit(): void {}
  
  //EVENTO QUE CAPTURA EL PRECIO DE MINIMO DE HORA DE TRABAJO
=======

  ngOnInit(): void {
    this.renderChart('costChart', [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]);
    this.renderChart('timeChart', [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]);
  }

  renderChart(unitType, COCOMODataset, UCPDataset) {
    var barChartData = {
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
    var mychart = new Chart(unitType, {
      type: 'bar',
      data: barChartData,
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
                labelString:
                  unitType === 'costChart' ? 'Costo (L)' : 'Tiempo (horas)',
                fontSize: 14,
              },
            },
          ],
        },
      },
    });
  }

  //Evento que captura el precio mínimo 
>>>>>>> Stashed changes
  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentPrice > 0) {
      this.formCosts.patchValue({ hourValue: this.currentPrice.toFixed(2) });
    }
  }

  //Calculo de costos y tiempo y generar gráficas
  generateCostsAndTimes() {
    //--------------Graficas de tiempo--------------
    this.renderChart('timeChart',[550, 143, 543, 422, 133], this.dataService.HoursMan);

<<<<<<< Updated upstream
    //IMPRIMI LA INFORMACION DEL DE LOS PARAMETROS PARA CALCULAR EL TIEMPO
    console.log(this.dataService.dataTime);
=======
    //--------------Grafica de costos---------------
  
    //--------Modelo SDLC basado en modelo de puntos de caso-------
    this.TT = this.dataService.HoursMan.map((hourMan:number) => {
      return (hourMan * 100) / (this.formCosts.get('effort').value);
    });
    this.VMT = this.TT.map((tt:number) => {
      return tt * this.formCosts.get('hourValue').value;
    });
    //---------------Fin modelo SDLC----------------------------- 

    this.renderChart('costChart',[550000, 143000, 543000, 422000, 133000], this.VMT);
>>>>>>> Stashed changes
  }
}
