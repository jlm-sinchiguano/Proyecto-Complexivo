import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MaterialModel } from '../models/material.model';
import { TypeMaterialModel } from '../models/type-material.model';
import { UnitMeasureModel } from '../models/unit-measure.model';
import { MaterialHttpService } from '../services/material-http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  materials: MaterialModel[] = [];
  units: UnitMeasureModel[] = [];
  types: TypeMaterialModel[] =[];

  constructor(
    private materialHttpService: MaterialHttpService
  ) { }

  ngOnInit(): void {
    this.index();
  }

  index() {
    this.materialHttpService.index().subscribe(
      response => {
        this.materials = response.data;
      }
    );
  }
  
  destroy(id: number) {

    Swal.fire({
      title: 'Estas seguro de Eliminar?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.materialHttpService.destroy(id).subscribe(
          response => {
            this.index();
            Swal.fire(
              'Eliminado!',
              '',
              'success'
            )
          }
        );
      }
    })
  }

}
