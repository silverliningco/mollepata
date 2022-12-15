import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-lines',
  templateUrl: './product-lines.component.html',
  styleUrls: ['./product-lines.component.css']
})
export class ProductLinesComponent implements OnInit {

  productLines= [
    {"id": 3, "title": "HP + fan coil", "description": "", "systemDesign":{}}, 
    {"id": 5, "title": "Mini-Split (single zone)", "description": "", "systemDesign":{}}, 
    {"id": 4, "title": "Dual fuel systems", "description": "Heat pump combined with furnace for best efficiency during shoulder months as well as high heat capacity during cold winter days.", "systemDesign":{}},  
    {"id": 6, "title": "Mini-Split (multi zone)", "description": "", "systemDesign":{}},  
    {"id": 2, "title": "AC + furnace", "description": "", "systemDesign":{}}, 
    {"id": 7, "title": "Small packaged unit", "description": "", "systemDesign":{}}
  
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
