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

  firstSelection!: string;

  //pass Object to template, to iterate object keys using *ngFor (AHRI Ratings)
  Object = Object;

  constructor() { }

  ngOnInit(): void {
    this.loadCard();
  }

  loadCard() {
    // Asign first element of array to card.
    this.card.result = this.mySystems[0];
    this.card.userSelections = { "Outdoor unit": this.card.result.components[0].title };
    this.card.cardComponents = this.cardComponents();
    this.card.cardConfigurations = this.cardConfigurations();
    //console.log(JSON.stringify(this.mySystems));
  }

  // Load all aplicable components grouped by component type for card. 
  cardComponents() {
    
    let myComponents: { [index: string]: any } = {};

    this.mySystems.forEach(sys => {
      sys.components.forEach((comp: { componentType: string; title: any; }) => {

        if (!myComponents.hasOwnProperty(comp.componentType)) {
          myComponents[comp.componentType] = [];
        }
        myComponents[comp.componentType].push(comp);

      });

    });
    
    // Remove duplicated components that has same title.
    this.Object.keys(myComponents).forEach((element, i) => {
      const myUniqueOptions = [...new Map(myComponents[element].map((m: any) => [m.title, m])).values()];
      myComponents[element] = myUniqueOptions;
    });

    return myComponents;
  }

  // Load all aplicable configuration options grouped by type for card. 
  cardConfigurations() {
    

    let newObj: { [index: string]: any } = {};
    // buscar en el los sistemas los que tengan  los mismos componentes y  agregar los configuration options
    this.mySystems.forEach(sys => {
      let countOks = 0;
      sys.components.forEach((component: any) => {
        
        this.card.result?.components.forEach(selection => {

          if (component.componentType == selection.componentType) {

            if (selection.title == component.title) {

              countOks++
              if (this.card.result?.components.length == countOks) {
               
                sys.configurationOptions.forEach((comp: { type: string; value: any; }) => {

                  if (!newObj.hasOwnProperty(comp.type)) {
                    newObj[comp.type] = [];
                  }
                  newObj[comp.type].push(comp);
          
                });
                
              }
            }
          }
      
        });
      });
    });


    // Remove duplicated configuration option that has same value.
    this.Object.keys(newObj).forEach((element, i) => {
      const myUniqueOptions = [...new Map(newObj[element].map((m: any) => [m.value, m])).values()];
      newObj[element] = myUniqueOptions;
    });

    return newObj;
  }

  // Load array of strings that are applicable to update.  
  // load component names that are diferent to first selection and Outdoor unit.
  selectsToUpdate() :string[] {
 
    let toUpdate: string[] = [];
    let myComponentTypes = this.card.result!.components.map(a => a.componentType);
    toUpdate = myComponentTypes.filter(componentType => componentType !== this.firstSelection && componentType !== 'Outdoor unit')
    
    return toUpdate;
  }
  
  // array of selects that the user has not selected.
  selectsToReset(currentSelection: string){
    let toUpdate: string[] = [];
    let myComponentTypes = this.card.result!.components.map(a => a.componentType);
    toUpdate = myComponentTypes.filter(componentType => componentType !== currentSelection && componentType !== 'Outdoor unit')
    return toUpdate;
  }

  //  Return systems that apply  user selections
  optionsToUpdate() {
    
    let myCombinedCombinations: Result[] = [];
    const myUserSelections: string[] = this.Object.keys(this.card.userSelections);

    this.mySystems.forEach(sys => {
      let countOks = 0;
      sys.components.forEach((component: any) => {
        myUserSelections.forEach(selection => {

          if (component.componentType == selection) {
            if (this.card.userSelections[selection] == component.title) {

              countOks++
              if (myUserSelections.length == countOks) {
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

  updateSelections(  currentSelection :string){

    let mySelectsToUpdate: string[] = this.selectsToUpdate();
    let myUpdatedOptions: any[] = [];

    // Systems matching user selections
    let myOptionsToUpdate = this.optionsToUpdate();

    if(myOptionsToUpdate.length == 0 ){

      let selectToReset = this.selectsToReset(currentSelection)[0];// By the moment this always return the first element of array 
      if(confirm("There are no "+selectToReset+"s that apply to your selected "+currentSelection+". \n Do you want us to look for "+selectToReset+"s that apply?")){
        
          delete this.card.userSelections[selectToReset]
          mySelectsToUpdate = this.selectsToReset(currentSelection);
   
          myOptionsToUpdate = this.optionsToUpdate();
      }
    }

    mySelectsToUpdate.forEach(selectToUpdate => {
      
      myOptionsToUpdate.forEach(optionToUpdate => {
        myUpdatedOptions.push(this.getComponentByComponentType(optionToUpdate.components,selectToUpdate));
      });

      // Remove duplicated components that has same title.
      const myUniqueOptions = myUpdatedOptions.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj["title"]).indexOf(obj["title"]) === pos;
      });
 
      this.card.result = myOptionsToUpdate[0];
      this.card.cardComponents[selectToUpdate] = myUniqueOptions;
      this.card.cardConfigurations = this.cardConfigurations();
    });

  }

  filterByID(myUnitID: string, myUnitType: string) {
   
    // update this variable only one time.
    if(!this.firstSelection){
      this.firstSelection = myUnitType;
    }
    
    // user selection
    this.card.userSelections[myUnitType] = myUnitID;

    this.updateSelections(myUnitType);
  }

  filterByConfigurationOptions(myUnitID: string, myUnitType: string) {
    
    // Systems matching user selections
    let myOptionsToUpdate = this.optionsToUpdate();

    //search by configurationOptions
    const findResult = myOptionsToUpdate.find(result =>
      result.configurationOptions.some(configuration => configuration.name === myUnitID && configuration.type === myUnitType)
    );

    if(findResult) {
      this.card.result = findResult;
    } else {
      console.log("this never happen");
    }
  }

  openDialog() {

    /* this.dialogRef.open(TableViewComponent, {
      data: { }
    }); */
  }

}
