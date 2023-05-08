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
  myColumnRatings = ["EER2", "SEER2", "HSPF2", "AFUE"];

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

  /**
 * Gets the value of the rating that matches the given string
 * @param ratings An array that contains the ratings in JSON format
 * @param myString A string that represents the desired rating
 * @returns The value of the rating as a string, or "N/A" if the rating is not found
 */
  getRating(ratings: any[], myString: string) :string {
    // Default value if rating is not found
    let ratingString = "N/A";

    // Switch statement to handle different types of ratings
    switch (myString) {
      case "EER2":
      case "SEER2":
      case "HSPF2":
        // Find the rating in the 2023 array
        if(ratings[0]['2023']){
          const rating = ratings[0]['2023'].find((rating:any) => rating.rating === myString);
          // If the rating is found
          if(rating){
            ratingString = rating.value;
          }
        }
        break;
  
      case "AFUE":
        // Check if there is a second array in the ratings array
        if(ratings[1]){
          // Find the rating in the second array
          const rating2 = ratings[1].find((rating:any) => rating.rating === myString);
          // If the rating is found
          if(rating2){
            ratingString = rating2.value;
          }
        }
        break;
    
      default:
        break;
    }
    return ratingString;
  }
}
