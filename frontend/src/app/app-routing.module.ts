import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailQuotationComponent } from './detail-quotation/detail-quotation.component';
import { ExpenseGuard } from './guards/auth.guards';
import { HandWorkComponent } from './hand-work/hand-work.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreateMaterialComponent } from './material/create-material/create-material.component';
import { EditMaterialComponent } from './material/edit-material/edit-material.component';
import { ListMaterialComponent } from './material/list-material/list-material.component';
import { CreateQuotationComponent } from './Quotation/create-quotation/create-quotation.component';
import { EditQuotationComponent } from './Quotation/edit-quotation/edit-quotation.component';
import { ListQuotationComponent } from './Quotation/list-quotation/list-quotation.component';
import { ListUnitComponent } from './UnitMeasure/list-unit/list-unit.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  { path: 'home', component: HomeComponent, canActivate: [ExpenseGuard] },
  { path: 'login', component:LoginComponent},
  { path: 'unidades', component: ListUnitComponent, canActivate: [ExpenseGuard] },
  { path: 'create-material', component: CreateMaterialComponent, canActivate: [ExpenseGuard]  },
  { path: 'edit-material/:id', component: EditMaterialComponent, canActivate: [ExpenseGuard] },
  { path: 'hand-work', component: HandWorkComponent, canActivate: [ExpenseGuard] },
  { path: 'quotation', component: ListQuotationComponent, canActivate: [ExpenseGuard] },
  { path: 'create-quotation', component: CreateQuotationComponent, canActivate: [ExpenseGuard] },
  { path: 'edit-quotation/:id', component: EditQuotationComponent, canActivate: [ExpenseGuard] },
  { path: 'detail-quotation/:id', component: DetailQuotationComponent, canActivate: [ExpenseGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
