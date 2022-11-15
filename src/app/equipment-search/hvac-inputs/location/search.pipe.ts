import { Pipe, PipeTransform } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  transform(payload: any[], filterTerm: string): any {

    let myElement: any[] = [];

    if (!filterTerm) return payload;
    if (filterTerm.length == 2){
      myElement = this.SearchInPayload(payload, ['abbreviation'], filterTerm);
    } else if (filterTerm.length != 2){
      myElement = this.SearchInPayload(payload, ['name'], filterTerm);      
    }

    if (myElement.length == 0){
      this.OpenSnackBar();
    } else {
      return myElement;
    }
   
  }


  SearchInPayload (objectData:Array<any>,  combinations: Array<any>, unit: any) {
    
    let input = unit;
    let result: Array<any> = [];
  
    
      let b = objectData.filter((data:any) => {
        let combinationQueries = "";
    
        combinations.forEach((arg:any) => {
          combinationQueries +=
          data.hasOwnProperty(arg) && data[arg].toUpperCase().trim() + "";
        });
    
        return Object.keys(data).some((key:any) => {
          return(
            (data[key] != undefined && 
              data[key] != null && 
              JSON.stringify(data[key]).trim().includes(input.toUpperCase())) ||
            combinationQueries.trim().includes(input.toUpperCase())  
          );
        });
      });
    
      if(b.length != 0){
        result = b
      }
    
    return result;
  }

  OpenSnackBar() {
    this._snackBar.open('No state found for this search');
  }
}
