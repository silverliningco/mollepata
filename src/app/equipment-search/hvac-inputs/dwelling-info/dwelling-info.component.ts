import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { bridgeService } from '../../services/bridge.service';

@Component({
  selector: 'app-dwelling-info',
  templateUrl: './dwelling-info.component.html',
  styleUrls: ['./dwelling-info.component.css']
})
export class DwellingInfoComponent implements OnInit {

DwellingInfoGroup !: FormGroup;
furnaceGroup !: FormGroup;

desableButton: boolean = true;

  myData: DwellingInfo

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService
  ) { }

  ngOnInit(): void {

    this.DwellingInfoGroup = this.formBuilder.group({
      constructionTypeControl: [ '', Validators.required]
    });

    this.furnaceGroup = this.formBuilder.group({
      fuelSourceControl: ['', Validators.required],
    });

  }

  // submitInputs is a callback after any changes are made to the HTML inputs for this component.
  // With any change the user makes, we send the updated data to the parent component.
  submitInputs() {

    this._bridge.dwellingInfoParams.emit({
      data: [myData]
    });
  }

}


