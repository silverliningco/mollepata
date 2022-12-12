import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HeatedCooled } from '../../models/rebate-finder-inputs';

import { bridgeService } from '../../services/bridge.service';

@Component({
  selector: 'app-heated-cooled',
  templateUrl: './heated-cooled.component.html',
  styleUrls: ['./heated-cooled.component.css']
})
export class HeatedCooledComponent implements OnInit {
  
  headedCooledGroup !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService,
  ) { }

  ngOnInit(): void {
    this.headedCooledGroup = this.formBuilder.group({
      heatedControl: [ '', Validators.required],
      cooledControl: [ '', Validators.required]
    });
  }

  submitInputs() {

    let myHeatedCooled: HeatedCooled = new HeatedCooled(
      this.headedCooledGroup.controls['heatedControl'].value,
      this.headedCooledGroup.controls['cooledControl'].value,
    )

    /* sent the info to results-rebate */
    this._bridge.HVACInputs.emit({
      data: [myHeatedCooled, 'heatedCooled']
    });
  }

}
