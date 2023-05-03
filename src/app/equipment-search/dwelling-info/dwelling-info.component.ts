import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dwelling-info',
  templateUrl: './dwelling-info.component.html',
  styleUrls: ['./dwelling-info.component.css']
})
export class DwellingInfoComponent implements OnInit {
  
  @Output()dwellignInfoChange: EventEmitter<any> = new EventEmitter();
  
  dwellingInfoForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    // Dwelling info form group.
    this.dwellingInfoForm = this.fb.group({
      //constructionType: ['', Validators.required],
      fuelSource: ['', Validators.required]
    });

    
    this.dwellingInfoForm.valueChanges.subscribe(selectedValue => {
      this.dwellignInfoChange.emit([selectedValue, this.dwellingInfoForm.valid]);      
    });
  

  }
 
}
