import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.page.html',
  styleUrls: ['./employee-details.page.scss'],
})
export class EmployeeDetailsPage implements OnInit {

  employeeDetail = null;

  constructor(
    private activatedRoute:ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params:any) => {
      this.employeeDetail = params;
      console.log('from employee details',this.employeeDetail);
    });
   }

  ngOnInit() {
  }

}
