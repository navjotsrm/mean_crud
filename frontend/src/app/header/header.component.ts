import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {BusinessService} from '../business.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showData:any=1;

  constructor(public bs:BusinessService,public _route:Router) {
    console.log(_route.url);
   this.bs.showd.subscribe(
      (data: any) => {
      this.showData=data;
      console.log(this.showData);
        
      });

   }

  ngOnInit() {
    
  }
 
}
