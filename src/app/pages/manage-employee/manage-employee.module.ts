import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageEmployeePageRoutingModule } from './manage-employee-routing.module';

import { ManageEmployeePage } from './manage-employee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageEmployeePageRoutingModule
  ],
  declarations: [ManageEmployeePage]
})
export class ManageEmployeePageModule {}
