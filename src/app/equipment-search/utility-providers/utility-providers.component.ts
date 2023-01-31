import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {UtilityProviders} from './../interfaces/utility-providers.interface'
import { EndpointsService } from '../services/endpoints.service';

@Component({
  selector: 'app-utility-providers',
  templateUrl: './utility-providers.component.html',
  styleUrls: ['./utility-providers.component.css']
})
export class UtilityProvidersComponent implements OnInit, OnChanges {

  @Input() state: String = 'MA'; 
  @Output()utilityProvidersChange: EventEmitter<any> = new EventEmitter();

  electricProviders: Array<UtilityProviders> = [];
  fossilFuelProviders: Array<UtilityProviders> = [];
  
  utilityProvidersForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private _endpoint: EndpointsService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {

    const currentState: String = changes["state"].currentValue;

    if(currentState) { 
      // This component needs to take a location as input and load the default utilities for that location.
      this._endpoint.Utilities(currentState).subscribe({
        next: (resp: any) => { 
          
          let listUtilities: Array<UtilityProviders> = resp;
  
          this.electricProviders = [];
          this.fossilFuelProviders = [];
  
          listUtilities.forEach(ele => {
            if (ele.electricity === true && ele.fossilFuel === false) {
              this.electricProviders.push(ele);
            } if (ele.electricity === false && ele.fossilFuel === true) {
              this.fossilFuelProviders.push(ele);
            } if (ele.electricity === true && ele.fossilFuel === true) {
              this.electricProviders.push(ele);
              this.fossilFuelProviders.push(ele);
            }
          });
        },
        error: (e) => alert(e.error)
      })
    }

  }

  ngOnInit(): void {

    // Form group.
    this.utilityProvidersForm = this.fb.group({
      electricUtilityId: [ '', Validators.required],
      fossilFuelUtilityId: ['', Validators.required]
    });

    this.utilityProvidersForm.valueChanges.subscribe(selectedValue => {
      this.utilityProvidersChange.emit([selectedValue, this.utilityProvidersForm.valid]);      
    });
  
  }

}
