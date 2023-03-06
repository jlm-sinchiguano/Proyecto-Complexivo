import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuotationModel } from 'src/app/models/quotation.model';
import { QuotationHttpService } from 'src/app/services/quotation-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-quotation',
  templateUrl: './create-quotation.component.html',
  styleUrls: ['./create-quotation.component.css']
})
export class CreateQuotationComponent implements OnInit {

  quotations: QuotationModel[] = [];
  myForm: FormGroup;

  constructor(
    private quotationHttpService: QuotationHttpService,
    private formBuilder: FormBuilder,
    private route: Router,
  ) {
    this.myForm = this.newForm();
  }

  ngOnInit(): void {
  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      nameQuotation: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      descriptionQuotation: [null, [Validators.minLength(2), Validators.maxLength(200)]],
      percentageProfit: [null, [Validators.required, Validators.min(0.0001), Validators.max(100)]],
    })
  }

  store() {
    this.quotationHttpService.store(this.myForm.value).subscribe(
      response => {
        this.myForm.reset();
        Swal.fire(
          'Cotización Creada!',
          '',
          'success'
        )
        this.route.navigate(['quotation']);
      },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Cotización ya existe',
          icon: 'error'
        })
      }
    );
  }
  detail() {
    this.quotationHttpService.store(this.myForm.value).subscribe(
      response => {
        this.myForm.reset();
        Swal.fire(
          'Cotización Creada!',
          '',
          'success'
        )
        this.route.navigate(['detail-quotation', response.data.idQuotation]);
      }
    );
  }

  get nameField() {
    return this.myForm.controls['nameQuotation'];
  }

  get descriptionField() {
    return this.myForm.controls['descriptionQuotation'];
  }

  get percentageField() {
    return this.myForm.controls['percentageProfit'];
  }
}
