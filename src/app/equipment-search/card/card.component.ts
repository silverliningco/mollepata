import { Component, Input, OnInit } from '@angular/core';

import { Result, Card } from '../interfaces/results.interface'


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})



export class CardComponent implements OnInit {


  @Input() mySystems!: any[];
  card!: Card; 

  //pass Object to template, to iterate object keys using *ngFor (AHRI Ratings)
  Object = Object;

  constructor() { }

  ngOnInit(): void {
    this.loadCard();
  }

  loadCard(){

    // Asign first element of array to card.
    this.card = this.mySystems[0];
    
    let userSelections:  Component[] = [];

    this.card.cardComponents = this.cardComponents(userSelections)
    console.log(this.card.cardComponents);

 
 
    /*this.card.outdoorUnit = this.loadOptions("Outdoor unit")[0];
    this.card.indoorUnits = this.loadOptions("Indoor unit");
    this.card.furnaces = this.loadOptions("Furnace");*/
    
  }

  cardComponents(userSelections : Component[]) {
 
    let newObj: {[index: string]:any} = {};

    this.mySystems.forEach(sys => {
      sys.components.forEach((comp: { componentType: string; title: any; }) => {
          
          if(!newObj.hasOwnProperty(comp.componentType)){
            newObj[comp.componentType] = [];
          } 
          newObj[comp.componentType].push(comp);
      });
    });

    let myArr = Object.values(newObj);

    myArr.forEach((element, i) => {
      const myUniqueOptions = [...new Map(element.map((m:any) => [m.title, m])).values()];
      myArr[i] = myUniqueOptions;
    });
    return  myArr;
  }


  filterByID(myUnitID: string, myUnitType: string) {
    console.log(myUnitID,myUnitType)
  }

  // function to load component options by component type.
  // this function is used for options in selects.
 /* loadOptions(type: string)  {
    let myComponentsOptions: any[] = []
    this.mySystems.forEach(element => {
      let myFind = element.components.filter((item: any) => item.componentType == type);
     
      // If filter finds components with specific type
      if (myFind![0]) {
        myComponentsOptions.push(myFind![0])
      }
    });

    const myUniqueOptions = [...new Map(myComponentsOptions.map((m) => [m.title, m])).values()];

    return  myUniqueOptions;
  }
*/

  openDialog() {

    /* this.dialogRef.open(TableViewComponent, {
      data: { }
    }); */
  }

}
