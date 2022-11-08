import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { bridgeService } from '../../../services/bridge.service';

@Component({
  selector: 'app-applied-filters',
  templateUrl: './applied-filters.component.html',
  styleUrls: ['./applied-filters.component.css']
})
export class AppliedFiltersComponent implements OnInit {

  listFilters: string[] = [];


  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService,
  ) { }

  ngOnInit(): void {
    this._bridge.filters
        .subscribe((payload: any) => {
            this.listFilters = payload.data;
        });
  }

  DeactivateFilter(filter: string){

    let index = this.listFilters.indexOf(filter);

    this.listFilters.splice(index, 1);

    console.log(this.listFilters);
  }
  

}
