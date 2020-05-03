import { Component } from '@angular/core';
import { HttpService } from '../services/http-service.service';
import { environment } from 'src/environments/environment';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  employeesList = [];
  employeesNext = null;
  employeeDetails = null;

  constructor(
    private myHttpService: HttpService,
    private router:Router
  ) {
    this.getEmployeeList();
  }

  getEmployeeList(){
    this.myHttpService.getRequest(environment.apiUrlOrigin+'employee-list/1')
    .then((result:any)=>{
      this.employeesList = result.employees;
      this.employeesNext = result.next;
      console.log(result);
    })
    .catch(error=>{
      console.error(error);
    });
  }

  getMoreEmployees(event){
    if(this.employeesNext){
      this.myHttpService.getRequest(environment.apiUrlOrigin+this.employeesNext)
      .then((result:any)=>{
        this.employeesList = [...this.employeesList, ...result.employees];
        this.employeesNext = result.next;
        // if(this.employeesNext){
        if(this.employeesList.length <= 50){
          event.target.complete();
        }else {
          event.target.disabled = true;
        }
        console.log(result);
      })
      .catch(error=>{
        console.error(error);
      });
    }
  }

  getEmployeeDetails(item){
    console.log(item);
    this.router.navigate(['employee-details'],{queryParams:item});


    // this.myHttpService.getRequest(environment.apiUrlOrigin+'get_emp/'+id)
    // .then(result=>{
    //   console.log(result);
    // })
    // .catch(error=>{
    //   console.error(error);
    // });
  }

  


}
