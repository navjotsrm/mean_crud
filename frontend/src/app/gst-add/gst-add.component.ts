import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { BusinessService } from '../business.service';
import { Router } from '@angular/router';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
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

  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  angForm:FormGroup;
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
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:');
      let obh= JSON.parse(response);
      if(obh.success){
        console.log(obh.image);
        this.image=obh.image;
      this.addBusiness;
      }
      alert('File uploaded successfully');
    },err=>{
      console.log("+++++++++++++++++++++++++++++++",err);
    }
  }

  addBusiness(person_name,business_name,business_gst_number,image){
    this.bs.addBusiness(person_name,business_name,business_gst_number,image).subscribe((res)=>{
          console.log("create business",res);
          this.router.navigate(['/business'])
          
    })
   
  }

  upload() {
    //locate the file element meant for the file upload.
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    //get the total amount of files attached to the file input.
    let fileCount: number = inputEl.files.length;
    //create a new fromdata instance
    let formData = new FormData();
    console.log(formData);

    //check if the filecount is greater than zero, to be sure a file was selected.
    if (fileCount > 0) { // a file was selected
      //append the key name 'photo' with the first file in the element
      formData.append('photo', inputEl.files.item(0));
      console.log(inputEl.files.item(0));

      //call the angular http method
      this.data = this.http
        //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
        .post(URL, formData).pipe(map((res: Response) => res));

console.log('data variable'+this.data);
      this.data.subscribe((res: any) => {
        console.table(res);
        if (res.success) {
          console.log('Successfully Uploade fiiel');
          this.image = res.image;
        }
      }, error => {
        console.log(error);
      })

      //map the success function and alert the response
      //  (success) => {
      //          alert(success._body);
      // },
      // (error) => alert(error)

    }
  }

}
