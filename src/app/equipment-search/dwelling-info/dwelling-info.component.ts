import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dwelling-info',
  templateUrl: './dwelling-info.component.html',
  styleUrls: ['./dwelling-info.component.css']
})
export class DwellingInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // Dwelling info form group.
    this.dwellingInfoForm = this.formBuilder.group({
      constructionType: [ '', Validators.required],
      fuelSource: ['', Validators.required]
    });

  }

}
