import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'employee-details',
    loadChildren: () => import('./pages/employee-details/employee-details.module').then( m => m.EmployeeDetailsPageModule)
  },
  {
    path: 'manage-employee',
    loadChildren: () => import('./pages/manage-employee/manage-employee.module').then( m => m.ManageEmployeePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
