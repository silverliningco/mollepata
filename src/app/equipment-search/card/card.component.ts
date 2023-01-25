import { Component, Input, OnInit } from '@angular/core';

import { Result, Card } from '../interfaces/results.interface'


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})



export class CardComponent implements OnInit {


  @Input() myResult!: any[];
  card!: Card; 
  //pass Object to template, to iterate object keys using *ngFor (AHRI Ratings)
  Object = Object;

  constructor() { }

  ngOnInit(): void {
    this.loadCard();
  }

  loadCard(){


    //Order array of objects by availableRebateAmount  
    this.myResult.sort((a, b) => {
      return a.availableRebateAmount - b.availableRebateAmount;
    });

    // Asign first element of array to card.
    this.card = this.myResult[0];
    this.card.outdoorUnit = this.loadOptions("Outdoor unit")[0];
    this.card.indoorUnits = this.loadOptions("Indoor unit");
    this.card.furnaces = this.loadOptions("Furnace");
    
  }

  // function to load component options by component type.
  // this function is used for options in selects.
  loadOptions(type: string)  {
    let myComponentsOptions: any[] = []
    this.myResult.forEach(element => {
      let myFind = element.components.filter((item: any) => item.componentType == type);
     
      // If filter finds components with specific type
      if (myFind![0]) {
        myComponentsOptions.push(myFind![0])
      }
    });

    const myUniqueOptions = [...new Map(myComponentsOptions.map((m) => [m.title, m])).values()];

    return  myUniqueOptions;
  }


  openDialog() {

    /* this.dialogRef.open(TableViewComponent, {
      data: { }
    }); */
  }

}
