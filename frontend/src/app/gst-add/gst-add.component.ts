import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { BusinessService } from '../business.service';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';



const URL= 'http://localhost:4000/business';

@Component({
  selector: 'app-gst-add',
  templateUrl: './gst-add.component.html',
  styleUrls: ['./gst-add.component.scss']
})
export class GstAddComponent implements OnInit {
 
  image: String;
  data: Observable<any>;
  angForm:FormGroup;
  imagePreview: string | ArrayBuffer;
  constructor(private fb:FormBuilder,private bs:BusinessService,private router:Router,private http:HttpClient,private el:ElementRef) {
    this.createForm();
   }

   createForm(){
     this.angForm= this.fb.group({
       person_name:['',Validators.required],
       business_name:['',Validators.required],
       business_gst_number:['',Validators.required],
       image:['']
     })
   }

  ngOnInit() {
 
  }

  onImagePicked(event){
const file= (event.target as HTMLInputElement).files[0];
this.angForm.patchValue({image:file});
this.angForm.get('image').updateValueAndValidity();
const reader= new FileReader();
reader.onload=()=>{
  this.imagePreview= reader.result;
};
reader.readAsDataURL(file);
      console.log(file);
      console.log(this.angForm);
      
  }

  addBusiness(person_name,business_name,business_gst_number,image){
    this.bs.addBusiness(person_name,business_name,business_gst_number,image).subscribe((res)=>{
      debugger;
          console.log("create business",res);
          this.router.navigate(['/business'])
          
    })
   
  }
}
