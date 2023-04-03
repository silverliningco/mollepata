import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card, Result } from '../interfaces/results.interface'
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})


export class CardComponent implements OnInit {


  @Input() mySystems!: Result[];
  @Input() myEligibleRebates !: any;
  card: Card = {}; 

  firstSelection!: string;

  //pass Object to template, to iterate object keys using *ngFor (AHRI Ratings)
  Object = Object;

  constructor(
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadCard();
  }

  loadCard() {
    // Asign first element of array to card.
    this.card.result = this.mySystems[0];
    this.card.userSelections = { "Outdoor unit": this.card.result.components[0].title };
    this.card.cardComponents = this.cardComponents();
    this.card.cardConfigurations = this.cardConfigurations();
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
    
    let myConfigurations: { [index: string]: any } = {};
    // look for systems with the same components and add the configuration options
    this.mySystems.forEach(sys => {
      let countOks = 0;
      sys.components.forEach((component: any) => {
        
        this.card.result?.components.forEach(selection => {

          if (component.componentType == selection.componentType) {

            if (selection.title == component.title) {

              countOks++
              if (this.card.result?.components.length == countOks) {
                sys.configurationOptions.forEach((comp: any) => {

                  if (!myConfigurations.hasOwnProperty(comp.type)) {
                    myConfigurations[comp.type] = [];
                  }
                  myConfigurations[comp.type].push(comp);
          
                });
                
              }
            }
          }
      
        });
      });
    });
    
    // Remove duplicated configuration option that has same id.
    this.Object.keys(myConfigurations).forEach((element, i) => {
      const myUniqueOptions = [...new Map(myConfigurations[element].map((m: any) => [m.id, m])).values()];
      myConfigurations[element] = myUniqueOptions;
    });

    return myConfigurations;
  }
 
  // returns component names that are diferent to first selection and Outdoor unit.
  selectsToUpdate() :string[] {

    const myUserSelections: string[] = this.Object.keys(this.card.userSelections);

    let toUpdate: string[] = [];
    let myComponentTypes = this.card.result!.components.map(a => a.componentType);

    if(myUserSelections.length != myComponentTypes.length){
      toUpdate = myComponentTypes.filter(componentType => componentType !== this.firstSelection && componentType !== 'Outdoor unit')
    }

    return toUpdate;
  }
  
  // returns component names that  are different to current selection.
  selectsToReset(currentSelection: string) :string[] {
    let toUpdate: string[] = [];
    let myComponentTypes = this.card.result!.components.map(a => a.componentType);
    toUpdate = myComponentTypes.filter(componentType => componentType !== currentSelection && componentType !== 'Outdoor unit')
    return toUpdate;
  }

  //  Return systems that apply user selections.
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
  // if doesn't find a component with that type return 0.
  getComponentByComponentType(components: any[], componentType:string) {
    let myComponentByType = components.filter((c:any) => c.componentType == componentType);
    if(myComponentByType.length > 0){
      return myComponentByType[0];
    }
    return 0;
  }

  updateSelections(  currentSelection :string){

    let mySelectsToUpdate: string[] = this.selectsToUpdate();
    let myUpdatedOptions: any[] = [];

    // Systems matching user selections
    let myOptionsToUpdate = this.optionsToUpdate();

    if(myOptionsToUpdate.length == 0 ){

      let selectToReset = this.selectsToReset(currentSelection)[0];// By the moment this always return the first element of array 
      if(confirm("There are no " + selectToReset  + "s that apply to your selected " + currentSelection + ". \n Do you want us to look for " + selectToReset + "s that apply?")){
        
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
      
      this.card.cardComponents[selectToUpdate] = myUniqueOptions;
    });

    this.card.result = myOptionsToUpdate[0];
    this.card.cardConfigurations = this.cardConfigurations();

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

     this.dialog.open(TableComponent, {
      data: {  
        systems: this.mySystems
      }
    }); 
  }

  print(myCombination: any) {
    let url = '/print?q=' + JSON.stringify(myCombination);
    window.open(url)
  }
}
