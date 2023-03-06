import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeMaterialModel } from 'src/app/models/type-material.model';
import { UnitMeasureModel } from 'src/app/models/unit-measure.model';
import { TypeMaterialHttpService } from 'src/app/services/type-material-http.service';
import { UnitMeasureHttpService } from 'src/app/services/unit-measure-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-unit',
  templateUrl: './list-unit.component.html',
  styleUrls: ['./list-unit.component.css']
})
export class ListUnitComponent implements OnInit {

  units: UnitMeasureModel[] = [];
  types: TypeMaterialModel[] = [];

  myForm: FormGroup;
  isPopupVisible1 = false;
  isPopupVisible2 = false;

  constructor(
    private unitMeasureHttpService: UnitMeasureHttpService,
    private typeMaterialService: TypeMaterialHttpService,
    private formBuilder: FormBuilder,
  ) {
    this.myForm = this.newForm();
  }

  ngOnInit(): void {
    this.index();
    this.loadTypesMaterial();

  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      idUnitMeasure: [null],
      typeMaterial: [null, Validators.required],
      nameUnitMeasure: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      abbreviation: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      multiplication: [null, [Validators.required, Validators.min(0.0001)]],
    })
  }

  loadTypesMaterial() {
    this.typeMaterialService.index().subscribe(
      response => {
        this.types = response.data;
      }
    );
  }

  index() {
    this.unitMeasureHttpService.index().subscribe(
      response => {
        this.units = response.data;
      }
    );
  }

  show(id: number) {
    console.log(id)
    this.unitMeasureHttpService.show(id).subscribe(
      response => {
        this.myForm.patchValue(response.data);
        console.log(this.myForm.patchValue(response.data))
      }
    );
  }

  store() {
    this.unitMeasureHttpService.store(this.myForm.value).subscribe(
      response => {
        this.index();
        this.myForm.reset();
        Swal.fire(
          'Unidad de medida creado!',
          '',
          'success'
        )
        this.isPopupVisible1 = false;
      },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Unidad de medida ya existe',
          icon: 'error'
        })
      }
    );
  }

  update() {
    console.log(this.myForm)
    this.unitMeasureHttpService.update(this.idUnitField.value, this.myForm.value).subscribe(
      response => {
        this.index();
        this.myForm.reset();
        Swal.fire(
          'Unidad de medida editado!',
          '',
          'success'
        )
        this.isPopupVisible2 = false;
      },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Unidad de medida ya existe',
          icon: 'error'
        })
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
        this.unitMeasureHttpService.destroy(id).subscribe(
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

  togglePopup() {
    this.isPopupVisible1 = !this.isPopupVisible1;
  }

  togglePopupEditar() {
    this.isPopupVisible2 = !this.isPopupVisible2;
  }

  get idUnitField() {
    return this.myForm.controls['idUnitMeasure'];
  }

  get nameUnitField() {
    return this.myForm.controls['nameUnitMeasure']
  }

  get abbreviationField() {
    return this.myForm.controls['abbreviation'];
  }

  get multiplicationField() {
    return this.myForm.controls['multiplication'];
  }

  get typeMaterialField() {
    return this.myForm.controls['idtypeMaterial'];
  }

}
