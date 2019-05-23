import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  searchText;
  allSelected:any;
  selectAll:any;
  

  constructor(private bs:BusinessService,private router:Router) {
   // this.bs.showd.emit(1);
   }

  ngOnInit() {
  this.getData();
  }
ngAfterViewInit(): void {
  this.bs.showd.emit(1);
  
}

getData(){
  this.bs.getBusiness().subscribe((data:Business[])=>{
    this.businessess=data;
    this.businessess.forEach(x=>{
      x.checked=false;
    })
   
})
}
  changeCheck(e,i){
    
  if(e.target.checked){
    this.businessess[i].checked=true;
  }else{
    this.businessess[i].checked=false;
  }
  this.deleteAllDisableEnable();
  }

  deleteAllDisableEnable(){
    // debugger;
  let deleteenable:any=  this.businessess.filter(x=>{
   return   x.checked==true;
    })
      if(deleteenable.length>1){
        this.disableCheckbox=true;
      } else{
        this.disableCheckbox=false;
      }       
           
  }

  deleteBusiness(id:any){
    this.bs.deleteBusinessData(id).subscribe(res=>{
    this.getData();
      console.log(res);  
    })
  }
  deleteBusinessAll(){
    let deleteenable:any=  this.businessess.filter(x=>{
      return   x.checked==true;
       })
       deleteenable.forEach(y => {
         this.deleteBusiness(y._id);
       }); 
      
  }
  selectAllcheck(e:any){
    if(e.target.checked){
      this.businessess.forEach(x=>{
        x.checked=true;
        this.disableCheckbox=true;
      })
    }else{
      this.businessess.forEach(x=>{
        x.checked=false;
        this.disableCheckbox=false;
      })
    }
   
      // for(var i=0; i<this.businessess.length;i++){
      //   this.businessess[i].checked= this.selectAll;
      //   if(this.businessess[i].checked){
      //     this.disableCheckbox=true;
      //   }else{
      //     this.disableCheckbox=false;
      //   }
      
      // }
     

  }
}
