import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http-service.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.page.html',
  styleUrls: ['./manage-employee.page.scss'],
})
export class ManageEmployeePage implements OnInit {

  manageEmployeeTitle = '';
  manageEmployeeButton = '';
  manageForm: FormGroup;

  @Input() isAddEmployee: string;

  @Input() paramEmpno;
  @Input() paramFname;
  @Input() paramLname;
  @Input() paramDbirth;
  @Input() paramGender;

  constructor(
    public formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private myHttpService: HttpService
  ) {}

  ngOnInit() {
    this.manageForm = this.formBuilder.group({
      emp_no: [this.isAddEmployee ? '': this.paramEmpno , [Validators.required,Validators.pattern('[0-9\/]*')]],
      fname:  [this.isAddEmployee ? '': this.paramFname, [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      lname:  [this.isAddEmployee ? '': this.paramLname, [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      dbirth: [this.isAddEmployee ? '': this.paramDbirth, Validators.required],
      gender: [this.isAddEmployee ? '': this.paramGender, Validators.required]
    });

    if(this.isAddEmployee){
      this.manageEmployeeTitle = 'Add Employee';
      this.manageEmployeeButton = 'Add';
    }else{
      this.manageEmployeeTitle = 'Edit Employee';
      this.manageEmployeeButton = 'Save';
    }
  }

  async submitManageEmployee(){
    if(this.manageForm.valid){
      var data_empno = this.manageForm.controls['emp_no'].value;
      var data_fname = this.manageForm.controls['fname'].value;
      var data_lname = this.manageForm.controls['lname'].value;
      var data_dbirth = moment(this.manageForm.controls['dbirth'].value).format('YYYY-MM-DD');
      var data_gender = this.manageForm.controls['gender'].value;

      if(this.isAddEmployee){
        const loading = await this.loadingCtrl.create({message:'Adding Employee...'});
        await loading.present();

        this.myHttpService
        // .postRequest(environment.apiUrlOrigin+'add_employee',data)
        .postRequest(environment.apiUrlOrigin+'add_employee/'+data_empno+'/'+data_fname+'/'+data_lname+'/'+data_dbirth+'/'+data_gender,{})
        .then(async (res:any)=>{
          console.log(res);
          if(res.success){

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
          this.modalCtrl.dismiss({cancel:false});
        });
      }else {
        const loading = await this.loadingCtrl.create({message:'Updating Employee...'});
        await loading.present();

        this.myHttpService
        // .postRequest(environment.apiUrlOrigin+'update_employee/id',data)
        .postRequest(environment.apiUrlOrigin+'update_employee/'+data_empno+'/'+data_fname+'/'+data_lname+'/'+data_dbirth+'/'+data_gender,{})
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
          this.modalCtrl.dismiss({cancel:false});
        });
      }
    }
  }

  cancel(){
    this.modalCtrl.dismiss({
      cancel: true
    });
  }

  

}
