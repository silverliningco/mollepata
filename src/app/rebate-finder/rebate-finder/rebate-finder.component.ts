import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rebate-finder',
  templateUrl: './rebate-finder.component.html',
  styleUrls: ['./rebate-finder.component.css']
})

export class RebateFinderComponent implements OnInit {

  // searchInputs represents high level user inputs for this search.
  searchInputs = 'Some user inputs here oxoxoxo';

  constructor() { }

  ngOnInit(): void {
  }

}
