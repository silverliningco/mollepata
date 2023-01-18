import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import StatesData from './../../../assets/json/states.json';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  locationForm!: FormGroup;

  states: String[] =  StatesData;  // This should probably be an array of strings no mas.

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    // Location form group.
    this.locationForm = this.fb.group({
      state: ["", Validators.required]
    });

  }

}
