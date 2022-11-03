import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-lines',
  templateUrl: './product-lines.component.html',
  styleUrls: ['./product-lines.component.css']
})
export class ProductLinesComponent implements OnInit {

  productLines: string[] = ['P1', 'P2', 'P3', 'P4', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10'];

  constructor() { }

  ngOnInit(): void {
  }

}
