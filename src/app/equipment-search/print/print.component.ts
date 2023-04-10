import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  result: any; 
  
  //pass Object to template, to iterate object keys using *ngFor (AHRI Ratings)
  Object = Object;

  constructor(
    public activatedRoute: ActivatedRoute) {
   }

  ngOnInit(): void {
    let res = this.activatedRoute.snapshot.paramMap.get('payload');
    this.result = JSON.parse(res!);
  }

  getComponentByComponentType(components: any[], componentType:string) {
    let myComponentByType = components.filter((c:any) => c.componentType == componentType);
    if(myComponentByType.length > 0){
      return myComponentByType[0];
    }
    return 0;
  }

  // open window dialog to print.
  printDocument(){ 
    window.print();
  }

}
