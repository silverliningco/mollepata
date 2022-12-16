import { Component, OnInit } from '@angular/core';

import { bridgeService } from '../../services/bridge.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-product-lines',
  templateUrl: './product-lines.component.html',
  styleUrls: ['./product-lines.component.css']
})
export class ProductLinesComponent implements OnInit {

  productLinesForm !: FormGroup;

  productLines= [
    {"id": 3, "title": "HP + fan coil", "description": "", "systemDesign":{ "outdoorSystemType": 1, "indoorSystemType": 1, "furnaceType": 1, "furnaceConfiguration": 1}}, 
    {"id": 5, "title": "Mini-Split (single zone)", "description": "", "systemDesign":{ "outdoorSystemType": 2, "indoorSystemType": 2, "furnaceType": 2, "furnaceConfiguration": 2}}, 
    {"id": 4, "title": "Dual fuel systems", "description": "Heat pump combined with furnace for best efficiency during shoulder months as well as high heat capacity during cold winter days.", "systemDesign":{ "outdoorSystemType": 3, "indoorSystemType": 3, "furnaceType": 3, "furnaceConfiguration": 3}},  
    {"id": 6, "title": "Mini-Split (multi zone)", "description": "", "systemDesign":{ "outdoorSystemType": 4, "indoorSystemType": 4, "furnaceType": 4, "furnaceConfiguration": 4}},  
    {"id": 2, "title": "AC + furnace", "description": "", "systemDesign":{ "outdoorSystemType": 5, "indoorSystemType": 5, "furnaceType": 5, "furnaceConfiguration": 5}}, 
    {"id": 7, "title": "Small packaged unit", "description": "", "systemDesign":{ "outdoorSystemType": 6, "indoorSystemType": 6, "furnaceType": 6, "furnaceConfiguration": 6}}
  
  ];

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService) { }

  ngOnInit(): void {
    this.productLinesForm = this.formBuilder.group({
      productLine: new FormControl(this.productLines[0].id, [Validators.required]),
    });
    this.emitInputs(this.productLines[0].systemDesign)
    
    this.productLinesForm.valueChanges.subscribe(selectedValue => {
      const first = this.productLines.find((obj) => {
        return obj.id === selectedValue.productLine;
      });
      this.emitInputs(first!.systemDesign)
    });
  }

  private emitInputs(selectedValue:any){
    this._bridge.HVACInputs.emit({
      data: [selectedValue, "systemDesign"]
    });
  }

}
