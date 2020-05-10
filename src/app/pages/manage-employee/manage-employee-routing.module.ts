import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageEmployeePage } from './manage-employee.page';

const routes: Routes = [
  {
    path: '',
    component: ManageEmployeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageEmployeePageRoutingModule {}
