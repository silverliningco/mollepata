import { Component, Input, OnInit } from '@angular/core';

import { Card, Result } from '../interfaces/results.interface'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})


export class CardComponent implements OnInit {


  @Input() mySystems!: Result[];
  card: Card = {}; 

  //pass Object to template, to iterate object keys using *ngFor (AHRI Ratings)
  Object = Object;

  constructor() { }

  ngOnInit(): void {
    this.loadCard();
  }

  loadCard() {

    // Asign first element of array to card.
    console.log(this.mySystems[0]); 
    this.card.result = this.mySystems[0];
    this.card.userSelections = { "Outdoor unit": this.card.result.components[0].title };
    this.card.cardComponents = this.cardComponents();
  }

  cardComponents() {
    
    let newObj: { [index: string]: any } = {};

    this.mySystems.forEach(sys => {
      sys.components.forEach((comp: { componentType: string; title: any; }) => {

        if (!newObj.hasOwnProperty(comp.componentType)) {
          newObj[comp.componentType] = [];
        }
        newObj[comp.componentType].push(comp);

      });

    });
    
    this.Object.keys(newObj).forEach((element, i) => {
      const myUniqueOptions = [...new Map(newObj[element].map((m: any) => [m.title, m])).values()];
      newObj[element] = myUniqueOptions;
    });

    return newObj;
  }

  selectsToUpdate(curentSelection: string) :string[] {
    let myComponentTypes = this.card.result!.components.map(a => a.componentType);
    let toUpdate: string[] = myComponentTypes.filter(componentType => componentType !== curentSelection && componentType !== 'Outdoor unit');
    return toUpdate;
  }

  optionsToUpdate() {
    let myCombinedCombinations: Result[] = [];
    this.mySystems.forEach(sys => {
      let countOks = 0;
      sys.components.forEach((component: any) => {
        this.Object.keys(this.card.userSelections).forEach(selection => {

          if (component.componentType == selection) {
            if (this.card.userSelections[selection] == component.title) {

              countOks++
              if (this.Object.keys(this.card.userSelections).length == countOks) {
                myCombinedCombinations.push(sys);
              }
            }
          }
       
        });
      });
    });

    return myCombinedCombinations;
  }
  
  // Simple function to get component object from components by component type.
  getComponentByComponentType(components: any[], componentType:string) {
    return components.filter((c:any) => c.componentType == componentType)[0];
  }
  
  updateSelections( mySelectsToUpdate: string[]){
    let myUpdatedOptions: any[] = [];
    let myOptionsToUpdate = this.optionsToUpdate();

    mySelectsToUpdate.forEach(selectToUpdate => {
      
      myOptionsToUpdate.forEach(optionToUpdate => {
        myUpdatedOptions.push(this.getComponentByComponentType(optionToUpdate.components,selectToUpdate));
      });

      if(myUpdatedOptions.length == 1 &&  this.Object.keys(this.card.userSelections).length == this.Object.keys(this.card.result!.components).length) {
        myUpdatedOptions.push({ "title": "reset", "componentType": "reset" });
      }

      console.log(myOptionsToUpdate[0]);
    
      this.card.result = myOptionsToUpdate[0];
      this.card.cardComponents[selectToUpdate] = myUpdatedOptions;

      
    });
  }

  filterByID(myUnitID: string, myUnitType: string) {
    
    let mySelectsToUpdate;

    if(myUnitID == "reset"){
      delete this.card.userSelections[myUnitType];
      mySelectsToUpdate = [myUnitType];
    } else { 
      // user selection
      this.card.userSelections[myUnitType] = myUnitID;
      mySelectsToUpdate = this.selectsToUpdate(myUnitType);
    }

    //console.log(myUnitType);
    //console.log(mySelectsToUpdate);
    //console.log(myOptionsToUpdate);

    this.updateSelections(mySelectsToUpdate);
  }

  openDialog() {

    /* this.dialogRef.open(TableViewComponent, {
      data: { }
    }); */
  }

}
