import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { Result } from '../interfaces/results.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  mySystems: Result[];
  
  //pass Object to template, to iterate object keys using *ngFor (AHRI Ratings)
  Object = Object;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog) {
      this.mySystems = data.systems;
      console.log(this.mySystems);
     }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialog.closeAll();
  }
 
  // Function to show if a field in table will be visible or not.
  isVisible(param:string) {
    let myVisibles = ["EER", "SEER","HSPF","AFUE"];
    
    if (myVisibles.includes(param)) {
      return true;
    } 

    return false;
  }

  // Simple function to get component object from components by component type.
  getComponentByComponentType(components: any[], componentType:string) {
    return components.filter((c:any) => c.componentType == componentType)[0];
  }

  sendModelNrs(myCombination: any) {

    let myAHRIs: String[] = []
    myCombination.components!.forEach((element: any) => {
      myAHRIs.push(element.SKU!)
    });

    let body = {
      //commerceInfo: this.commerceInfo,
      skus: myAHRIs
    }
    let url = '/home/detail/' + JSON.stringify(body);
    window.open(url)
  }
}
