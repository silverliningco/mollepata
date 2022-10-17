import { Component, Input, OnInit } from '@angular/core';
import { Result } from '../../models/results';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() myResults!: any[];
  @Input('master') masterName = '';

  myRes!: Result;
  

  arrayOutdoors!: boolean;
  

  constructor() { }

  ngOnInit(): void {
    console.log(this.myResults);

    let myLenght = this.myResults.length;
    if (myLenght != undefined) {
      this.arrayOutdoors = true;
      this.ParsingResult(this.myResults)
    } else {
      this.arrayOutdoors = false;
    }
    
    // If length of outdoorUnits == 1, call this.selectedOutdoorUnit(outdoorUnits[0])
    // If length of outdoorUnits > 1, nothing else is required here.
  }

 /* selectOutdoorUnit(someOutdoorUnit) {
    this.selectedOutdoorUnit = someOutdoorUnit;
    // Load all the results for this outdoor unit, then render the data in the card.
 } */

  ParsingResult(results: any[]){

    let rawOptions: any[] = [];
    
    // select indoors and furnace options
    for (let iR of results) {
      for (let iC of iR.components) {
        if (iC.type != 'outdoorUnit'){
          rawOptions.push(iC);
          // console.log(iC);
        }
      }
    }

    console.log(rawOptions);

    // selecionar por indoor y furnace rawOptions

  }
  

}
