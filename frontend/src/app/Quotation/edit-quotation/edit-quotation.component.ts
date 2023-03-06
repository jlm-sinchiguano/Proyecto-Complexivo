import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HandWorkModel } from 'src/app/models/hand-work.model';
import { QuotationHttpService } from 'src/app/services/quotation-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-quotation',
  templateUrl: './edit-quotation.component.html',
  styleUrls: ['./edit-quotation.component.css']
})
export class EditQuotationComponent implements OnInit {

  hands: HandWorkModel[] = [];
  myForm: FormGroup;

  constructor(
    private quotationHttpService: QuotationHttpService,
    private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
  ) {
    this.myForm = this.newForm();
  }

  ngOnInit(): void {
    this.quotationHttpService.show(this.router.snapshot.params['id']).subscribe(
      (result) => {
        this.myForm = new FormGroup({
          nameQuotation: new FormControl(result.data.nameQuotation, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
          descriptionQuotation: new FormControl(result.data.descriptionQuotation, [Validators.minLength(2), Validators.maxLength(200)], null),
          percentageProfit: new FormControl(result.data.percentageProfit, [Validators.required, Validators.min(0.0001), Validators.max(100)]),
        })
      }
    )
  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      nameQuotation: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      descriptionQuotation: [null, [Validators.minLength(2), Validators.maxLength(200)]],
      percentageProfit: [null, [Validators.required, Validators.min(0.0001), Validators.max(100)]],
    })
  }

  update() {
    this.quotationHttpService.update(this.router.snapshot.params['id'], this.myForm.value).subscribe(
      response => {
        this.myForm.reset();
        Swal.fire(
          'Cotización editado!',
          '',
          'success'
        )
        this.route.navigate(['quotation']);
      },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Cotiación ya existe',
          icon: 'error'
        })
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