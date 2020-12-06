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
import{Chart} from 'node_modules/chart.js';
@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css'],
})
export class CostsComponent implements OnInit, OnChanges {
  faQuestionCircle = faQuestionCircle;
  @Input() currentPrice: number;
  
  formCosts = new FormGroup({
    hourValue: new FormControl('', [Validators.required]),
    numberOfTeamMembers: new FormControl('', [Validators.required]),
    effort: new FormControl('33.40', [Validators.required]),
  });


  constructor(private dataService: DataService) {}
  
  ngOnInit(): void {
    this.renderChart('costChart', [0,0,0,0,0], [0,0,0,0,0]);
    this.renderChart('timeChart', [0,0,0,0,0], [0,0,0,0,0]);
  }

  renderChart(unitType, COCOMODataset, UCPDataset) {
    var barChartData = {
      labels: ['1','2','3','4','5'],
			datasets: [{
        label: 'Modelo COCOMO',
        backgroundColor: "rgba(189, 195, 199, 1)",
				borderWidth: 1,
				data: COCOMODataset 
			}, {
				label: 'Modelo de puntos de casos de uso',
				backgroundColor: "rgba(92, 170, 191, 1)",
				borderWidth: 1,
				data: UCPDataset
			}]

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
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Resultados"
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              display: true,
            },
            scaleLabel: {
              display: true,
              labelString: unitType==="costChart" ? "Costo (L)" : "Tiempo (horas)",
              fontSize: 14
            }
          }]
        },
      }
    });
  }
  
  //EVENTO QUE CAPTURA EL PRECIO DE MINIMO DE HORA DE TRABAJO
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (this.currentPrice > 0) {
      this.formCosts.patchValue({ hourValue: this.currentPrice.toFixed(2) });
    }
  }

  //EN ESTA FUNCION SE REALIZARIAN LOS CALCULOS DE COSTOS
  generateCosts() {
    //IMPRIMI LOS PARAMETROS PARA CALCULAR LOS COSTOS
    console.log(this.formCosts.value);

    this.renderChart('costChart', [550000,143000,543000,422000,133000], [304000,123000,432000,664000,399000]);
    this.renderChart('timeChart', [550,143,543,422,133], [304,123,432,664,399]);

    //IMPRIMI LA INFORMACION DEL DE LOS PARAMETROS PARA CALCULAR EL TIEMPO
    console.log(this.dataService.dataTime);
  }
}
