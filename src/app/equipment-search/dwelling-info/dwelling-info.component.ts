import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dwelling-info',
  templateUrl: './dwelling-info.component.html',
  styleUrls: ['./dwelling-info.component.css']
})
export class DwellingInfoComponent implements OnInit {
  
  dwellingInfoForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    // Dwelling info form group.
    this.dwellingInfoForm = this.fb.group({
      constructionType: [ '', Validators.required],
      fuelSource: ['', Validators.required]
    });

  }

  submitInputs(){
    
  }
}
