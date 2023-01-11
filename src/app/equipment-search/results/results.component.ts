import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // First load the available eligibility questions and requirements and their default values.
    loadDefaultEligibility();

    // Then load the results with the given user inputs and default values for eligibility questions/requirements.
    loadResults();

  }

  // loadDefaultEligibility loads the available eligibility questions and requirements and their default values.
  loadDefaultEligibility() {

    // ...

  }

  // loadResults loads the AHRI combinations for the given input params and rebate eligibility details.
  loadResults() {

    // ...

    // this.results = output from service
    // May have to group or order the results here.

  }

  // updateResults is a callback when the user changes rebate eligibility inputs.
  updateResults() {

    // loadResults()

  }

}
