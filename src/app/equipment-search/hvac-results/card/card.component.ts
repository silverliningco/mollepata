import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Result } from '../../models/results';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() outdoorUnits!: any[];
  @Input('master') masterName = '';

  lengthOutdoorUnits!: number;
  myResults: Result = new Result(null, null, null)
  
// output: max rebate value

  /* selectedOutdoorUnit: string;

  results: []; */

  constructor() { }

  ngOnInit(): void {
    this.lengthOutdoorUnits = this.outdoorUnits.length;
    if (this.lengthOutdoorUnits == 1){
      console.log(this.outdoorUnits[0]);
      this.myResults = this.outdoorUnits[0];
    }

    // If length of outdoorUnits == 1, call this.selectedOutdoorUnit(outdoorUnits[0])
    // If length of outdoorUnits > 1, nothing else is required here.
  }

 /* selectOutdoorUnit(someOutdoorUnit) {
    this.selectedOutdoorUnit = someOutdoorUnit;
    // Load all the results for this outdoor unit, then render the data in the card.
 } */

}
