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

  // show all the options  
  myEligybilityRequirement: EligybilityRequirement[] = [];
  myEligibilityQuestions: EligibilityQuestions[] = [];

  // all the selections of user
  selectionRequirements: EligybilityRequirement[] = [];
  selectionQuestions: EligibilityQuestions[] = []; 

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService,
    private _endPoint: EndPointsService
  ) { }

  ngOnInit(): void {
    this._bridge.paramsRebates
      .subscribe((payload: any) =>{
        let params = payload.data;
        this.VerifyParamsComplete(params);
      })

    this._bridge.resultsRebateFinder
        .subscribe((payload: any) => {
          this.results = payload.data;
          this.selectingBestOption(this.results);
         });

    this.rebateGroup = this.formBuilder.group({
      eligibilityQuestionsControl: this.formBuilder.array([]),
      eligybilityRequirementControl: this.formBuilder.array([])
    });

   
  }

  VerifyParamsComplete(params: any){
    let haveValueNull!:boolean; 

    for (let key in params) {
        let element = params[key];
        haveValueNull = Object.values(element).some(x => x === null);
    }

    if (haveValueNull == false){
      this.GetRebates();
    }

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

    let question = {
      'questionId': questionId,
      'options': optionQuestion
    }


    return question;
  }

  ProcesEligybilityRequirement(requirementId: number | null){

    let optionRequirement = this.rebateGroup.controls['eligybilityRequirementControl'].value;

    let Requiremen = {
      'requirementId': requirementId,
      'options': optionRequirement
    }
    
    if (this.selectionRequirements.length = 0){
      this.selectionRequirements.push(Requiremen);
    } else {
      let index = this.SelectionUser(this.selectionRequirements, requirementId);
      this.selectionRequirements.splice(index, 0, Requiremen)
    }
  }

  SelectionUser(selections: any, currentSelectionID: any){

    let result: number;

    found: for (let i = 0; i < selections.length; i++) {
      let elementID = selections[i].requirementId;
      if (elementID == currentSelectionID){
        result = i;
        break found;
      }
    }

    return result;

  }

  SearchInResponses (objectData:Array<any>,  combinations: Array<any>, unit: any) {
    
    let input = unit;
    let result: Array<any> = [];
  
    
      let b = objectData.filter((data:any) => {
        let combinationQueries = "";
    
        combinations.forEach((arg:any) => {
          combinationQueries +=
          data.hasOwnProperty(arg) && data[arg].trim() + "";
        });
    
        return Object.keys(data).some((key:any) => {
          return(
            (data[key] != undefined && 
              data[key] != null && 
              JSON.stringify(data[key]).trim().includes(input)) ||
            combinationQueries.trim().includes(input)  
            
          );
        });
      });
    
      if(b.length != 0){
        result = b
      }
    
    return result;
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