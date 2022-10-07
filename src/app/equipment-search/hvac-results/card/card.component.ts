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

  @Input() indoor!: string[];
  @Input('master') masterName = '';

  constructor() { }

  ngOnInit(): void {
  }

 
}
