import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {

  // searchInputs represents high level user inputs passed down from the parent component.
  //@Input() searchInputs = ''; // decorate the property with @Input()

  constructor() { }

  ngOnInit(): void {
    
  }

}
