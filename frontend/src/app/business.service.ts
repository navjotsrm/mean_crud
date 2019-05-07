import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Business } from 'src/business';


const url= 'http://localhost:4000/business';
@Injectable({
  providedIn: 'root'
})

export class BusinessService {
  businessess: Business[];

  data:any;

  constructor(private http:HttpClient) { 
    console.log(url)
  }

  addBusiness(person_name,business_name, business_gst_number){
        const obj={
          person_name:person_name,
          business_name:business_name,
          business_gst_number:business_gst_number
        };
        console.log(obj);
       return this.http.post(`${url}/add`,obj);
  }

  getBusiness(){
    
    return this.http.get(`${url}`);
  }

  editBusinessData(id){
   return this.http.get(`${url}/edit/${id}`);
  }

  updateBusiness(person_name,business_name,business_gst_number,id){
   
    const obj={
      person_name:person_name,
      business_name:business_name,
      business_gst_number:business_gst_number

    };
    return this.http.post(`${url}/update/${id}`,obj);
  }


  deleteBusinessData(id){
      return this.http.delete(`${url}/delete/${id}`);
  }
}
