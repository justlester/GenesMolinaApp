import { Component } from '@angular/core';
import { HttpService } from '../services/http-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private employeesList = [];
  private employeeDetails = null;

  constructor(
    private myHttpService: HttpService
  ) {
    this.getEmployeeList();
  }

  getEmployeeList(){
    this.myHttpService.getRequest(environment.apiUrlOrigin+'get_emp/291658')
    .then(result=>{
      this.employeeDetails = result;
      console.log(result);
    })
    .catch(error=>{
      console.error(error);
    });
  }


}
