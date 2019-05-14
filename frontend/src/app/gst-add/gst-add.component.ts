import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { BusinessService } from '../business.service';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
// import { Observable } from 'rxjs';
// import {map} from 'rxjs/operators';



const URL= 'http://localhost:4000/business/image';

@Component({
  selector: 'app-gst-add',
  templateUrl: './gst-add.component.html',
  styleUrls: ['./gst-add.component.scss']
})
export class GstAddComponent implements OnInit {
  // @ViewChild('filePicker') filePicker;
  data: any;
  image:String;

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'Image' });

  angForm:FormGroup;
  imagePreview: string | ArrayBuffer;
  constructor(private fb:FormBuilder,private bs:BusinessService,private router:Router,private http:HttpClient,private el:ElementRef) {
    this.createForm();
   }
   ngOnInit() {
     
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      debugger;
      console.log(response)
      console.log('ImageUpload:uploaded:'); 
      let obh= JSON.parse(response);
      if(obh.success){
        console.log(obh.image);
        this.data= obh.image;
        this.addBusiness;


      }
   
      
      alert('File uploaded successfully');
    },error=>{
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",error);
    };

 
  }
   createForm(){
     this.angForm= this.fb.group({
       person_name:['',Validators.required],
       business_name:['',Validators.required],
       business_gst_number:['',Validators.required],
       image:['']
     })
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

  addBusiness(person_name,business_name,business_gst_number){
    // let fileBrowser = this.filePicker.nativeElement;
    // if (fileBrowser.files && fileBrowser.files[0]) {
    //   // let formData = new FormData();
 
    //   formData.append("image", fileBrowser.files[0]);
    //   this.bs.upload(formData).subscribe((res:any) => {
    //     // do stuff w/my uploaded file
    //     console.log(res);
        
    //   });
    // }
    this.bs.addBusiness(person_name,business_name,business_gst_number,this.data).subscribe((res)=>{
          console.log("create business",res);
          this.router.navigate(['/business'])  
    })
   
  }
}
