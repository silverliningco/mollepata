import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-utility-providers',
  templateUrl: './utility-providers.component.html',
  styleUrls: ['./utility-providers.component.css']
})
export class UtilityProvidersComponent implements OnInit {

  electricProviders: Array<UtilityInfo> = [];
  fossilFuelProviders: Array<UtilityInfo> = [];

  constructor() { }

  ngOnInit(): void {

    // This component needs to take a location as input and load the default utilities for that location.
    // ...

    // Form group.
    this.utilityProvidersForm = this.formBuilder.group({
      electricUtilityId: [ '', Validators.required],
      fossilFuelUtilityId: ['', Validators.required]
    });

  }

}
