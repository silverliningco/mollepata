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
  
  heatedCooledForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService,
  ) { }

  ngOnInit(): void {
    this.heatedCooledForm = this.formBuilder.group({
      heated: [ '', Validators.required],
      cooled: [ '', Validators.required]
    });
  }

  submitInputs() {

    /* sent the info to results-rebate */
    this._bridge.HVACInputs.emit({
      data: [ this.heatedCooledForm.value, 'heatedCooled']
    });
  }

}
