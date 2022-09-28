import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rf-results',
  templateUrl: './rf-results.component.html',
  styleUrls: ['./rf-results.component.css']
})

export class RFResultsComponent implements OnInit {

  // searchInputs represents high level user inputs passed down from the parent component.
  // @Input() searchInputs: any = ''; // decorate the property with @Input()


  @Input() searchInputs: any = '';

  constructor() { }

  ngOnInit(): void {
    
  }

  parse(){
    let a = JSON.parse(this.searchInputs);
    a. my_size

  }

}
