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

  totalRebateUp = 0;

  constructor(
    public activatedRoute: ActivatedRoute) {
   }

  ngOnInit(): void {
    let res = this.activatedRoute.snapshot.paramMap.get('payload');
    this.result = JSON.parse(res!);
    
    this.totalRebateUp = this.sumRebateValues(this.result!.rebateEligibility)
  }

  getComponentByComponentType(components: any[], componentType:string) {
    let myComponentByType = components.filter((c:any) => c.componentType == componentType);
    if(myComponentByType.length > 0){
      return myComponentByType[0];
    }
    return 0;
  }

  /**
 * Calculates the sum of rebate values from an array of objects.
 * @param rebateEligibility An array of objects containing rebate information.
 * @returns The total sum of rebate values.
 */
  sumRebateValues(rebateEligibility: any[]): number {
    return rebateEligibility.reduce((accumulator, object) => {
      return accumulator + object["rebateUpTo"];
    }, 0);
  }

  // open window dialog to print.
  printDocument(){ 
    window.print();
  }

}
