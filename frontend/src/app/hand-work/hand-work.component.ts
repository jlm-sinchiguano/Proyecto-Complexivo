import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HandWorkModel } from '../models/hand-work.model';
import { HandWorHttpService } from '../services/hand-wor-http.service';

@Component({
  selector: 'app-hand-work',
  templateUrl: './hand-work.component.html',
  styleUrls: ['./hand-work.component.css']
})
export class HandWorkComponent implements OnInit {

  hands: HandWorkModel[] = [];

  myForm: FormGroup;
  isPopupVisible1 = false;
  isPopupVisible2 = false;

  constructor(
    private handWorkHttpService: HandWorHttpService,
    private formBuilder: FormBuilder,
  ) {
    this.myForm = this.newForm();
  }

  ngOnInit(): void {
    this.index();
  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      idHandWork: [null],
      nameHandWork: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      descriptionHandWork: [null, [Validators.minLength(2), Validators.maxLength(200)]],
      salary: [null, [Validators.required, Validators.min(0.1), Validators.max(1000)]],
      hoursMonth: [null, [Validators.required, Validators.min(1), Validators.max(500), Validators.pattern(/^\d+$/)]],
    })
  }

  index() {
    this.handWorkHttpService.index().subscribe(
      response => {
        this.hands = response.data;
      }
    );
  }

  show(id: number) {
    this.handWorkHttpService.show(id).subscribe(
      response => {
        this.myForm.patchValue(response.data);
      }
    );
  }

  store() {
    this.handWorkHttpService.store(this.myForm.value).subscribe(
      response => {
        this.index();
        this.myForm.reset();
        Swal.fire(
          'Mano de obra creada!',
          '',
          'success'
        )
        this.isPopupVisible1 = false;
      },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Mano de obra ya existe',
          icon: 'error'
        })
      }
    );
  }

  update() {
    this.handWorkHttpService.update(this.idHandField.value, this.myForm.value).subscribe(
      response => {
        this.index();
        this.myForm.reset();
        Swal.fire(
          'Mano de Obra editado!',
          '',
          'success'
        )
        this.isPopupVisible2 = false;
      },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Mano de obra ya existe',
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
        this.handWorkHttpService.destroy(id).subscribe(
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

  get idHandField() {
    return this.myForm.controls['idHandWork'];
  }

  get nameHandField() {
    return this.myForm.controls['nameHandWork']
  }

  get descriptionField() {
    return this.myForm.controls['descriptionHandWork'];
  }

  get salaryField() {
    return this.myForm.controls['salary'];
  }

  get hoursMonthField() {
    return this.myForm.controls['hoursMonth'];
  }


}
