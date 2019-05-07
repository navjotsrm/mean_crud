import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../business.service';
import { Business } from 'src/business';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gst-get',
  templateUrl: './gst-get.component.html',
  styleUrls: ['./gst-get.component.scss']
})
export class GstGetComponent implements OnInit {
  businessess:Business[];
  disableCheckbox=false;

  constructor(private bs:BusinessService,private router:Router) {
   
   }

  ngOnInit() {
    this.bs.getBusiness().subscribe((data:Business[])=>{
      this.businessess=data;
      data.forEach(x=>{
        x.checked=false;
      })
     
})
  }

  changeCheck(e,i){
    // debugger;
  //  this.disableCheckbox = e.target.checked;
  if(e.target.checked){

    this.businessess[i].checked=true;
    if(i>=1){
      this.disableCheckbox=true;
    }else{
      this.disableCheckbox=false;
    }
   
  }else{
    // debugger;
    this.businessess[i].checked=false;
    this.disableCheckbox=false;
  }
   //alert(bbusiness[i].checked);
  }

  deleteBusiness(id:any){
    this.bs.deleteBusinessData(id).subscribe(res=>{
      for(let i = 0; i < this.businessess.length; ++i){
        if (this.businessess[i]["_id"] === id) {
            this.businessess.splice(i,1);
        }
    }

      console.log(res);  

    })
  }
}
