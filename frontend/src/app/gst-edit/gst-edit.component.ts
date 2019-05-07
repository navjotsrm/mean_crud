import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../business.service';
import { ActivatedRoute ,Router} from '@angular/router';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';


@Component({
  selector: 'app-gst-edit',
  templateUrl: './gst-edit.component.html',
  styleUrls: ['./gst-edit.component.scss']
})
export class GstEditComponent implements OnInit {

 business:any={};
 angForm:FormGroup;

  constructor(private bs:BusinessService, private route:ActivatedRoute, private router:Router, private fb:FormBuilder) {

    this.createForm();
   }

   createForm(){
     this.angForm= this.fb.group({
       person_name: ['',Validators.required],
       business_name:['',Validators.required],
       business_gst_number:['',Validators.required]
     })
   }

  ngOnInit() {

 this.route.params.subscribe(params=>{
    this.bs.editBusinessData(params['id']).subscribe((res)=>{
      this.business=res;
    })
 })
  }

  updateBusiness(person_name,business_name,business_gst_number){
    this.route.params.subscribe((params)=>{
        this.bs.updateBusiness(person_name, business_name, business_gst_number, params['id']).subscribe((data:any)=>{
        console.log(data);
        this.router.navigate(['/business']);
        });
    })
   
  }



}
