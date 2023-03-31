import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { json } from 'express';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  result: any; 

  constructor(
    public activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams.subscribe( params => {
    
      this.result = JSON.parse(params["q"]);
      
      console.log(JSON.parse(params["q"]));
    });
   }

  ngOnInit(): void {
  }

}
