import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  states: State[] = [];  // This should probably be an array of strings no mas.

  constructor() { }

  ngOnInit(): void {

    // Location form group.
    this.locationForm = this.formBuilder.group({
      state: ["", Validators.required]
    });

  }

}
