import { Injectable } from '@angular/core';
//make request both web and device
import { HttpClient } from '@angular/common/http';
//make request only on device
import { HTTP } from '@ionic-native/http/ngx';
//for platform checking
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpWeb: HttpClient,
    private httpDevice: HTTP,
    private platform: Platform
  ) { }

  getRequest(url){
    return new Promise(async(resolve,reject)=>{
      try{
        if(this.platform.is('cordova')){
          //RUNNING ON DEVICE 
          var res = await this.httpDevice.get(url,{},{});
          resolve(JSON.parse(res.data));
        }else{
          //RUNNING ON BROWSER
          var res2 = await this.httpWeb.get(url).toPromise();
          resolve(res2);
        }
      }catch(err){
        reject(err);
      }
    });
  }

  postRequest(url,param){
    return new Promise(async(resolve,reject)=>{
      try{
        if(this.platform.is('cordova')){
          //RUNNING ON DEVICE 
          var res = await this.httpDevice.post(url,param,{});
          resolve(res);
        }else{
          //RUNNING ON BROWSER
          var res2 = await this.httpWeb.post(url,param).toPromise();
          resolve(res2);
        }
      }catch(err){
        reject(err);
      }
    });
  }

  deleteRequest(url,param){
    return new Promise(async(resolve,reject)=>{
      try{
        if(this.platform.is('cordova')){
          //RUNNING ON DEVICE 
          var res = await this.httpDevice.delete(url,param,{});
          resolve(res);
        }else{
          //RUNNING ON BROWSER
          var res2 = await this.httpWeb.delete(url,param).toPromise();
          resolve(res2);
        }
      }catch(err){
        reject(err);
      }
    });
  }




}
