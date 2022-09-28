import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {

  // searchInputs represents high level user inputs passed down from the parent component.
  //@Input() searchInputs = ''; // decorate the property with @Input()

  constructor() { }

  ngOnInit(): void {
    
  }

}
