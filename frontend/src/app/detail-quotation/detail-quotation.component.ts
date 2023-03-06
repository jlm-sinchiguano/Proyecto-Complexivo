import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HandWorkQuotationModel } from '../models/hand-work-quotation.model';
import { HandWorkModel } from '../models/hand-work.model';
import { MaterialQuotationModel } from '../models/material-quotation.model';
import { MaterialModel } from '../models/material.model';
import { QuotationModel } from '../models/quotation.model';
import { TypeMaterialModel } from '../models/type-material.model';
import { UnitMeasureModel } from '../models/unit-measure.model';
import { HandWorHttpService } from '../services/hand-wor-http.service';
import { HandWorkQuotationHttpService } from '../services/hand-work-quotation-http.service';
import { MaterialHttpService } from '../services/material-http.service';
import { MaterialQuotationHttpService } from '../services/material-quotation-http.service';
import { QuotationHttpService } from '../services/quotation-http.service';
import { TypeMaterialHttpService } from '../services/type-material-http.service';
import { UnitMeasureHttpService } from '../services/unit-measure-http.service';

@Component({
  selector: 'app-detail-quotation',
  templateUrl: './detail-quotation.component.html',
  styleUrls: ['./detail-quotation.component.css']
})
export class DetailQuotationComponent implements OnInit {

  detailMaterials: MaterialQuotationModel[] = [];
  detailHands: HandWorkQuotationModel[] = [];
  materials: MaterialModel[] = [];
  quotations: QuotationModel[] = [];
  units: UnitMeasureModel[] = [];
  types: TypeMaterialModel[] = [];
  hands: HandWorkModel[] = [];

  unitL: any[] = [];
  unitV: any[] = [];
  unitC: any[] = [];
  unitP: any[] = [];
  idQuotationC: FormControl = new FormControl();

  myForm: FormGroup;
  myForm2: FormGroup;
  sMaterial: string = "";
  selectedType?: string = "";
  totalPrice: number = 0;
  isPopupVisible1 = false;
  isPopupVisible2 = false;

  constructor(
    private quotationMaterialHttpService: MaterialQuotationHttpService,
    private quotationHandHttpService: HandWorkQuotationHttpService,
    private quotationHttpService: QuotationHttpService,
    private handWorkService: HandWorHttpService,
    private materialHttpService: MaterialHttpService,
    private typeService: TypeMaterialHttpService,
    private unitService: UnitMeasureHttpService,
    private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
  ) {
    this.myForm = this.newForm();
    this.myForm2 = this.newForm2();
  }

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');
    this.idQuotationC.setValue(id);
    this.indexMQ()
    this.indexHQ()
    this.sum()
    this.loadHandWork()
    this.loadTypesMaterial()
    this.loadUnits()
    this.loadMaterials()
    this.longitude()
    this.volume()
    this.quantity()
    this.weight()
  
  }
  onSelectedOption(event: any) {
    console.log(this.selectedType, 'dentro')
  }
  selectedMaterial(materialName: any) {
    const material = this.materials.find(m => m.idMaterial === materialName);
    this.selectedType = material?.typeMaterial
  }
  loadTypesMaterial() {
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
  loadMaterials() {
    this.materialHttpService.index().subscribe(
      response => {
        this.materials = response.data;
      }
    )
  }

  loadHandWork() {
    this.handWorkService.index().subscribe(
      response => {
        this.hands = response.data;
      }
    )
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

  newForm(): FormGroup {
    return this.formBuilder.group({
      widthDetail: [null, [Validators.required, Validators.min(0.1), Validators.max(500)]],
      lengthDetail: [null, [Validators.required, Validators.min(0.1), Validators.max(500)]],
      weightDetail: [null, [Validators.required, Validators.min(0.1), Validators.max(5000)]],
      quantityDetail: [null, [Validators.required, Validators.min(1), Validators.max(5000), Validators.pattern(/^\d+$/)]],
      idMaterial: [null],
      idUnitMeasure: [null],
      idQuotation: +this.router.snapshot.params['id'],
      typeMaterial: [null],
    })
  }

  newForm2(): FormGroup {
    return this.formBuilder.group({
      hours: [null, [Validators.min(0), Validators.max(100), Validators.pattern(/^\d+$/)]],
      minutes: [null, [Validators.min(0), Validators.max(500), Validators.pattern(/^\d+$/)]],
      idHandWork: [null],
      idQuotation: +this.router.snapshot.params['id']
    })
  }

  indexMQ() {
    this.quotationMaterialHttpService.filter(this.router.snapshot.params['id']).subscribe(
      (result) => {
        this.detailMaterials = result.data;
      }
    )
  }

  indexHQ() {
    this.quotationHandHttpService.filter(this.router.snapshot.params['id']).subscribe(
      (result) => {
        this.detailHands = result.data;
      }
    )
  }

  store() {
    this.quotationMaterialHttpService.store(this.myForm.value).subscribe(
      response => {
        Swal.fire(
          'Detalle creado!',
          '',
          'success'
        )
        this.indexMQ();
        this.isPopupVisible1 = false;
      }
    );
  }

  storeH() {
    this.quotationHandHttpService.store(this.myForm2.value).subscribe(
      response => {
        Swal.fire(
          'Detalle creado!',
          '',
          'success'
        )
        this.indexHQ();
        this.isPopupVisible2 = false;
      }
    );
  }

  destroyM(id: number) {
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
        this.quotationMaterialHttpService.destroy(id).subscribe(
          response => {
            this.indexMQ();
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

  destroyH(id: number) {
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
        this.quotationHandHttpService.destroy(id).subscribe(
          response => {
            this.indexHQ();
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

  sum() {
    let total = 0;
    for (let i = 0; i < this.detailHands.length; i++) {
      total += this.detailHands[i]?.priceTime ?? 0;
    }
    for (let i = 0; i < this.detailMaterials.length; i++) {
      total += this.detailMaterials[i]?.priceDetail ?? 0;
    }
    this.totalPrice = total
  }

  togglePopup() {
    this.isPopupVisible1 = !this.isPopupVisible1;
  }
  togglePopup2() {
    this.isPopupVisible2 = !this.isPopupVisible2;
  }

  get widthField() {
    return this.myForm.controls['widthDetail'];
  }

  get lengthField() {
    return this.myForm.controls['lengthDetail'];
  }

  get weightField() {
    return this.myForm.controls['weightDetail'];
  }

  get quantityField() {
    return this.myForm.controls['quantityDetail'];
  }

  get materialField() {
    return this.myForm.controls['idMaterial'];
  }

  get unitMeasureField() {
    return this.myForm.controls['idUnitMeasure'];
  }

  get quotationField() {
    return this.myForm.controls['idQuotation'];
  }

  get typeMaterialField() {
    return this.myForm.controls['typeMaterial'];
  }

  get hoursField() {
    return this.myForm2.controls['hours'];
  }

  get minutesField() {
    return this.myForm2.controls['minutes'];
  }

  get handWorkField() {
    return this.myForm2.controls['idHandWork'];
  }

}
