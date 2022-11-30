import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { bridgeService } from '../../../services/bridge.service';

@Component({
  selector: 'app-applied-filters',
  templateUrl: './applied-filters.component.html',
  styleUrls: ['./applied-filters.component.css']
})
export class AppliedFiltersComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService,
  ) { }

  ngOnInit(): void {
  }

 

}
