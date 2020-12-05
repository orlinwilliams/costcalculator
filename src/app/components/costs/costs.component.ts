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
  ngOnInit(): void {}
  
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

    //IMPRIMI LA INFORMACION DEL DE LOS PARAMETROS PARA CALCULAR EL TIEMPO
    console.log(this.dataService.dataTime);
  }
}
