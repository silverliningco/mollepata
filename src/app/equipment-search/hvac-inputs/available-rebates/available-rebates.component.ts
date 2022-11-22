import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { bridgeService } from '../../services/bridge.service';
import { EndPointsService } from '../../services/endPoints.service';

import { EligibilityQuestions, EligybilityRequirement } from '../../models/hvac-inputs';

@Component({
  selector: 'app-available-rebates',
  templateUrl: './available-rebates.component.html',
  styleUrls: ['./available-rebates.component.css']
})
export class AvailableRebatesComponent implements OnInit {

  rebateGroup !: FormGroup;

  // order results inside cards
  results: any;
  bestOption: any[] = [];

  myEligybilityRequirement: EligybilityRequirement[] = [];
  myEligibilityQuestions: EligibilityQuestions[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService,
    private _endPoint: EndPointsService
  ) { }

  ngOnInit(): void {
    this._bridge.resultsRebateFinder
        .subscribe((payload: any) => {
          this.results = payload.data;
          this.selectingBestOption(this.results);
         });

    this.rebateGroup = this.formBuilder.group({
      eligibilityQuestionsControl: [ null, Validators.required],
      eligybilityRequirementControl: [ null, Validators.required]
    });

    this.GetRebates();
  }

  PreparetoGetRebates(){
    let body = {
      'commerceInfo': '',
      'utilityProviders': '',
      'location': '',
      'dwellingInfo': '',
      'systemDesign': '',
      'skus': '',
      'nominalSize': '',
      'mj8LoadCalculation': ''
    }

    return body
  }

  GetRebates(){
    
    /* this._endPoint.Rebate(this.PreparetoGetRebates()).subscribe({
      next: (resp) => {
      },
      error: (e) => alert(e.error)
    }) */

    // provicional
      let a = [ 
        {
          "options": ["Yes", "No"],
          "requirementId": 4,
          "requirementText": "Heat pumps must be used to supplement the pre-existing heating system during heating season."
        },
        {
          "options": ["Yes", "No"],
          "requirementId": 5,
          "requirementText": "If pre-existing heating system is oil or propane, integrated controls must be installed."
        },
        {
          "options": ["Yes", "No"],
          "requirementId": 6,
          "requirementText": "Heat pumps must be used as the sole source of heating during heating season."
        },
        {
          "options": ["Yes", "No"],
          "requirementId": 7,
          "requirementText": "Mass Save whole-home verification form must be completed and signed."
        },
        {
          "options": ["Yes", "No"],
          "requirementId": 8,
          "requirementText": "Weatherization recommendations made during a Home Energy Assessment must be complete prior to installation."
        },
        {
          "options": ["Yes", "No"],
          "requirementId": 9,
          "requirementText": "Requires completion of a Home Energy Assessment or Special Home Visit to confirm the inefficiency of existing space heating."
        }
      ]
      let b =  [
        {
          "options": ["Electric resistance", "Heating oil", "Natural gas", "Propane", "Other or N/A"],
          "questionId": 1,
          "questionText": "Existing heating system fuel source"
        }, 
        {
          "options": ["Condensing", "Non-condensing", "Other or N/A"],
          "questionId": 2,
          "questionText": "Existing furnace or boiler type"
        }
      ]

    this.myEligybilityRequirement = a;
    this.myEligibilityQuestions = b;
  }

  ProcesEligybilityQuestions(questionId: number | null){

    let optionQuestion = this.rebateGroup.controls['eligibilityQuestionsControl'].value;
    console.log(optionQuestion);
    console.log(questionId);

    let question = {
      'questionId': questionId,
      'optionQuestion': optionQuestion
    }

    return question;
  }

  ProcesEligybilityRequirement(requirementId: number | null){

    let optionRequirement = this.rebateGroup.controls['eligybilityRequirementControl'].value;
    console.log(optionRequirement);
    console.log(requirementId);

    let Requiremen = {
      'requirementId': requirementId,
      'optionRequirement': optionRequirement
    }

    return Requiremen;
  }

  selectingBestOption(results: any){
    let max!: any;

    results.forEach((element:any) => {
      // returns the results ordered from maximum to minimum
      element.forEach((element2: any) => {
        max =  element2.sort( function(a: any, b:any) {
          if (a.totalAvailableRebates < b.totalAvailableRebates || a.totalAvailableRebates === null) return +1;
          if (a.totalAvailableRebates > b.totalAvailableRebates || b.totalAvailableRebates === null) return -1;
          return 0;
        });
        this.bestOption.push( max);
      });
    }); 

    // return the rebatess in order
    this._bridge.OrderResultsRebateFinder.emit({
      data: this.bestOption
    });

  }



}