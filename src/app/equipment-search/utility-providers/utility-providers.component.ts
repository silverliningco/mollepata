import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {UtilityInfo} from './../models/hvac-inputs'

@Component({
  selector: 'app-utility-providers',
  templateUrl: './utility-providers.component.html',
  styleUrls: ['./utility-providers.component.css']
})
export class UtilityProvidersComponent implements OnInit {

  electricProviders: Array<UtilityInfo> = [];
  fossilFuelProviders: Array<UtilityInfo> = [];
  
  utilityProvidersForm!: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    // This component needs to take a location as input and load the default utilities for that location.
    // ...

    // Form group.
    this.utilityProvidersForm = this.fb.group({
      electricUtilityId: [ '', Validators.required],
      fossilFuelUtilityId: ['', Validators.required]
    });

  }

}
