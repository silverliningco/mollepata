import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
//import StatesData from './../../../assets/json/states.json';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  @Output()locationChange: EventEmitter<any> = new EventEmitter();
  
  locationForm!: FormGroup;

  //states: String[] =  StatesData;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    // Location form group.
    this.locationForm = this.fb.group({
      state: ['', Validators.required]
    });

    this.locationForm.valueChanges.subscribe(selectedValue => {
      this.locationChange.emit([selectedValue, this.locationForm.valid]);
    });
  }

}
