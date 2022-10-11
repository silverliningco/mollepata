import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

export interface OutdoorUnits {
  id: string,
  indoor: string[]
}


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() outdoorUnits!: string[];
  @Input('master') masterName = '';
// output: max rebate value

  selectedOutdoorUnit: string;

  results: [];

  constructor() { }

  ngOnInit(): void {
    // If length of outdoorUnits == 1, call this.selectedOutdoorUnit(outdoorUnits[0])
    // If length of outdoorUnits > 1, nothing else is required here.
  }

 function selectOutdoorUnit(someOutdoorUnit) {
    this.selectedOutdoorUnit = someOutdoorUnit;
    // Load all the results for this outdoor unit, then render the data in the card.
 }
}
