import { Component, OnInit } from '@angular/core';
import { QuotationModel } from 'src/app/models/quotation.model';
import { QuotationHttpService } from 'src/app/services/quotation-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-quotation',
  templateUrl: './list-quotation.component.html',
  styleUrls: ['./list-quotation.component.css']
})
export class ListQuotationComponent implements OnInit {

  quotations: QuotationModel[] = [];

  constructor(
    private quotationHttpService: QuotationHttpService
  ) {   }

  ngOnInit(): void {
    this.index();
  }

  index() {
    this.quotationHttpService.index().subscribe(
      response => {
        this.quotations = response.data;
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
        this.quotationHttpService.destroy(id).subscribe(
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
