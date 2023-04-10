import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { Result } from '../interfaces/results.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  mySystems: any;
  JSON = JSON;
  myColumnRatings = ["eer2", "seer2", "hspf2", "AFUE"];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog) {
      this.mySystems = data.systems;
     }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialog.closeAll();
  }
 
  // Simple function to get component object from components by component type.
  getComponentByComponentType(components: any[], componentType:string) {
    return components.filter((c:any) => c.componentType == componentType)[0];
  }

  getRating(ratings: any[], myString: string) :string {
    let ratingString = "N/A";

    ratings.forEach( rating => { 
      if(rating[myString]) {
        ratingString = rating[myString];
      }
    });

    return ratingString;

  }

}
