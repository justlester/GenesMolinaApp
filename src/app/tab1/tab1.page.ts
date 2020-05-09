import { Component } from '@angular/core';
import { HttpService } from '../services/http-service.service';
import { environment } from 'src/environments/environment';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  searchEmployeeQuery = '';

  employeesLoading = false;
  employeesList = [];
  employeesNext = null;
  employeeDetails = null;

  constructor(
    private myHttpService: HttpService,
    private router:Router,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    this.getEmployeeList();
  }

  getEmployeeList(){
    return new Promise((resolve)=>{

      this.employeesLoading = true;
      this.myHttpService.getRequest(environment.apiUrlOrigin+'employee-list/1')
      .then((result:any)=>{
        this.employeesList = result.employees;
        this.employeesNext = result.next;
        console.log(result);
      })
      .catch(error=>{
        console.error(error);
      })
      .finally(()=>{
        this.employeesLoading = false;
        resolve();
      });

    });
  }

  getMoreEmployees(event){
    if(this.employeesNext){
      this.myHttpService.getRequest(environment.apiUrlOrigin+this.employeesNext)
      .then((result:any)=>{
        this.employeesList = [...this.employeesList, ...result.employees];
        this.employeesNext = result.next;
        if(this.employeesNext){
        // if(this.employeesList.length <= 50){
          event.target.complete();
        }else {
          event.target.disabled = true;
        }
        console.log(result);
      })
      .catch(error=>{
        console.error(error);
      });
    }else {
      event.target.disabled = true;
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

  async showAddForm(){
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Add Employee',
      subHeader: 'Please enter the fields below.',
      inputs:[
        {
          name: 'emp_no',
          type: 'number',
          placeholder: 'Employee Number'
        },
        {
          name: 'fname',
          type: 'text',
          placeholder: 'First name'
        },
        {
          name:'lname',
          type:'text',
          placeholder:'Last name'
        },
        {
          name: 'dbirth',
          type: 'date',
          placeholder:'Birthday'
        },
        // {
        //   name: 'gender',
        //   type: 'radio',
        //   label:'Male',
        //   value:'M',
        //   checked: true
        // },
        // {
        //   name:'gender',
        //   type:'radio',
        //   label:'Female',
        //   value:'F'
        // },
      ],
      buttons:[
        {
          text:'Cancel',
          role:'cancel'
        },
        {
          text: 'Add',
          handler: async (data)=>{
            data.gender = 'M';
            console.log('submitted',data);

            const loading = await this.loadingCtrl.create({message:'Adding Employee...'});
            await loading.present();

            this.myHttpService
            // .postRequest(environment.apiUrlOrigin+'add_employee',data)
            .postRequest(environment.apiUrlOrigin+'add_employee/'+data.emp_no+'/'+data.fname+'/'+data.lname+'/'+data.dbirth+'/'+data.gender,null)
            .then(async (res:any)=>{
              console.log(res);
              if(res.sucess){

                var toastSuccess = await this.toastCtrl.create({
                  message:'Successfully Added!',
                  color: 'success',
                  duration: 3000
                });
                toastSuccess.present();

              }else{

                var toastError = await this.toastCtrl.create({
                  message:'Something went wrong please try again.',
                  color: 'danger',
                  duration: 3000
                });
                toastError.present();
                console.error(res);

              }
            }).catch(async err=>{

              var toastError = await this.toastCtrl.create({
                message:'Something went wrong please try again.',
                color: 'danger',
                duration: 3000
              });
              toastError.present();
              console.error(err);

            }).finally(()=>{
              loading.dismiss();
              this.getEmployeeList();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async showEditForm(event,employee){
    event.stopPropagation();
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Edit Employee',
      inputs:[
        // {
        //   name: 'emp_no',
        //   type: 'number',
        //   placeholder: 'Employee Number',
        //   value: employee.emp_no
        // },
        {
          name: 'fname',
          type: 'text',
          placeholder: 'First name',
          value: employee.first_name
        },
        {
          name:'lname',
          type:'text',
          placeholder:'Last name',
          value: employee.last_name
        },
        {
          name: 'dbirth',
          type: 'date',
          placeholder:'Birthday',
          value: employee.birth_date
        },
        // {
        //   name: 'gender',
        //   type: 'radio',
        //   label:'Male',
        //   value:'M',
        //   checked: true
        // },
        // {
        //   name:'gender',
        //   type:'radio',
        //   label:'Female',
        //   value:'F'
        // },
      ],
      buttons:[
        {
          text:'Cancel',
          role:'cancel'
        },
        {
          text: 'Save',
          handler: async (data)=>{
            // data.gender = 'M';
            console.log('updated data',data);

            const loading = await this.loadingCtrl.create({message:'Updating Employee...'});
            await loading.present();

            this.myHttpService
            // .postRequest(environment.apiUrlOrigin+'update_employee/id',data)
            .postRequest(environment.apiUrlOrigin+'update_employee/'+employee.emp_no+'/'+data.fname+'/'+data.lname+'/'+data.dbirth+'/'+data.gender,null)
            .then(async (res:any)=>{
              console.log(res);
              if(res.success){

                var toastSuccess = await this.toastCtrl.create({
                  message:'Successfully Updated!',
                  color: 'success',
                  duration: 3000
                });
                toastSuccess.present();

              }else{

                var toastError = await this.toastCtrl.create({
                  message:'Something went wrong please try again.',
                  color: 'danger',
                  duration: 3000
                });
                toastError.present();
                console.error(res);

              }
            }).catch(async err=>{

              var toastError = await this.toastCtrl.create({
                message:'Something went wrong please try again.',
                color: 'danger',
                duration: 3000
              });
              toastError.present();
              console.error(err);

            }).finally(()=>{
              loading.dismiss();
              this.getEmployeeList();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async showDeleteConfirm(event,employee){
    event.stopPropagation();
    const alert = await this.alertCtrl.create({
      header:'Delete Employee',
      message:`Are you sure you want to delete this employee?<br/>
        <b>${employee.first_name} ${employee.last_name}</b>
      `,
      buttons: [
        {
          text:'No',
          role:'cancel'
        },{
          text: 'Yes',
          handler: async ()=>{
            const loading = await this.loadingCtrl.create({message:'Deleting Employee...'});
            await loading.present();

            this.myHttpService
            // .postRequest(environment.apiUrlOrigin+'update_employee/id',data)
            .postRequest(environment.apiUrlOrigin+'delete_employee/'+employee.emp_no,null)
            .then(async (res:any)=>{
              console.log(res);
              if(res.sucess){

                var toastSuccess = await this.toastCtrl.create({
                  message:'Successfully Deleted!',
                  color: 'success',
                  duration: 3000
                });
                toastSuccess.present();

              }else{

                var toastError = await this.toastCtrl.create({
                  message:'Something went wrong please try again.',
                  color: 'danger',
                  duration: 3000
                });
                toastError.present();
                console.error(res);

              }
            }).catch(async err=>{

              var toastError = await this.toastCtrl.create({
                message:'Something went wrong please try again.',
                color: 'danger',
                duration: 3000
              });
              toastError.present();
              console.error(err);

            }).finally(()=>{
              loading.dismiss();
              this.getEmployeeList();
            });

          }
        }
      ]
    });
    await alert.present();
  }
  

  searchEmployee(){
    if(this.searchEmployeeQuery){
      var check = this.employeesList.filter(x=>{
        return x.first_name.toLowerCase().includes(this.searchEmployeeQuery.toLowerCase()) 
              || x.last_name.toLowerCase().includes(this.searchEmployeeQuery.toLowerCase());
      });
      if(check.length){
        this.employeesList = check;
      }else{
        this.employeesList = [];
        this.employeesLoading = true;
        this.myHttpService.postRequest(environment.apiUrlOrigin+'search_employee/'+this.searchEmployeeQuery+'/'+this.searchEmployeeQuery+'/1',null)
        .then((res:any)=>{
          this.employeesList = res.employees;
          this.employeesNext = res.next;
        }).catch(err=>{
          console.error(err);
        }).finally(()=>{
          this.employeesLoading = false;
        });
      }
    }else {
      this.getEmployeeList();
    }
  }
  
  async refreshEmployeeList(event){
    await this.getEmployeeList();
    event.target.complete();
  }


}
