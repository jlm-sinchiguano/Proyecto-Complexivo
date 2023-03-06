import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModel } from 'src/app/models/material.model';
import { TypeMaterialModel } from 'src/app/models/type-material.model';
import { UnitMeasureModel } from 'src/app/models/unit-measure.model';
import { MaterialHttpService } from 'src/app/services/material-http.service';
import { TypeMaterialHttpService } from 'src/app/services/type-material-http.service';
import { UnitMeasureHttpService } from 'src/app/services/unit-measure-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-material',
  templateUrl: './create-material.component.html',
  styleUrls: ['./create-material.component.css']
})
export class CreateMaterialComponent implements OnInit {

  materials: MaterialModel[] = [];
  units: UnitMeasureModel[] = [];
  types: TypeMaterialModel[] = [];

  unitL: any[] = [];
  unitV: any[] = [];
  unitC: any[] = [];
  unitP: any[] = [];
  myForm: FormGroup;

  selectedType: string = "";

  constructor(
    private materialHttpService: MaterialHttpService,
    private typeService: TypeMaterialHttpService,
    private unitService: UnitMeasureHttpService,
    private formBuilder: FormBuilder,
    private route: Router,
  ) {
    this.myForm = this.newForm();
  }

  ngOnInit(): void {
    this.loadUnits()
    this.loadTypes()
    this.longitude()
    this.volume()
    this.quantity()
    this.weight()

  }

  loadTypes() {
    this.typeService.index().subscribe(
      response => {
        this.types = response.data;
      }
    );
  }

  loadUnits() {
    this.unitService.index().subscribe(
      response => {
        this.units = response.data;
      }
    );
  }

  longitude() {
    this.unitService.index().subscribe(
      response => {
        this.unitL = response.data.filter((unit: { idtypeMaterial: { nameTypeMaterial: string; }; }) => unit.idtypeMaterial?.nameTypeMaterial === 'Longitud');
      }
    );
  }
  volume() {
    this.unitService.index().subscribe(
      response => {
        this.unitV = response.data.filter((unit: { idtypeMaterial: { nameTypeMaterial: string; }; }) => unit.idtypeMaterial?.nameTypeMaterial === 'Volumen');
      }
    );
  }
  quantity() {
    this.unitService.index().subscribe(
      response => {
        this.unitC = response.data.filter((unit: { idtypeMaterial: { nameTypeMaterial: string; }; }) => unit.idtypeMaterial?.nameTypeMaterial === 'Cantidad');
      }
    );
  }
  weight() {
    this.unitService.index().subscribe(
      response => {
        this.unitP = response.data.filter((unit: { idtypeMaterial: { nameTypeMaterial: string; }; }) => unit.idtypeMaterial?.nameTypeMaterial === 'Peso');
      }
    );
  }

  onSelectedOption(event: any) {
    console.log(this.selectedType, 'dentro')
  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      nameMaterial: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      widthMaterial: [null, [Validators.required, Validators.min(0.1), Validators.max(500)]],
      lengthMaterial: [null, [Validators.required, Validators.min(0.1), Validators.max(500)]],
      weightMaterial: [null, [Validators.required, Validators.min(0.1), Validators.max(5000)]],
      quantityMaterial: [null, [Validators.required, Validators.min(1), Validators.max(5000), Validators.pattern(/^\d+$/)]],
      extentMaterial: [null, [Validators.required, Validators.min(0.1)]],
      priceMaterial: [null, [Validators.required, Validators.min(0.00001), Validators.max(50000)]],
      idUnitMeasure: [null],
      typeMaterial: [null],
    })
  }

  store() {
    this.materialHttpService.store(this.myForm.value).subscribe(
      response => {
        this.myForm.reset();
        Swal.fire(
          'Material Creado!',
          '',
          'success'
        )
        this.route.navigate(['home']);
      },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Material ya existe',
          icon: 'error'
        })
      }

    );
  }

  get nameField() {
    return this.myForm.controls['nameMaterial'];
  }

  get widthField() {
    return this.myForm.controls['widthMaterial'];
  }

  get lengthField() {
    return this.myForm.controls['lengthMaterial'];
  }

  get weightField() {
    return this.myForm.controls['weightMaterial'];
  }

  get quantityField() {
    return this.myForm.controls['quantityMaterial'];
  }

  get extentField() {
    return this.myForm.controls['extentMaterial'];
  }

  get priceField() {
    return this.myForm.controls['priceMaterial'];
  }

  get UnitMeasureField() {
    return this.myForm.controls['idUnitMeasure'];
  }

  get typeMaterialField() {
    return this.myForm.controls['typeMaterial'];
  }


}
