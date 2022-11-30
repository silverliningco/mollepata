import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { bridgeService } from '../../services/bridge.service';
import { EndPointsService } from '../../services/endPoints.service';

import { EligibilityQuestions, EligybilityRequirement } from '../../models/hvac-inputs';

@Component({
  selector: 'app-questions-requirement',
  templateUrl: './questions-requirement.component.html',
  styleUrls: ['./questions-requirement.component.css']
})
export class QuestionsRequirementComponent implements OnInit {

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
    this._bridge.paramsQuestionsRequirements
    .subscribe((payload: any) =>{
      let params = payload.data;
      this.VerifyParamsComplete(params);
    })

    this.rebateGroup = this.formBuilder.group({
      eligibilityQuestionsControl: [ null, Validators.required],
      eligybilityRequirementControl: [ null, Validators.required]
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


    if (this.selectionQuestions.length >= 1 ){
      let index: number | null = this.SelectionUser(this.selectionRequirements, questionId);
      if (index == null){
        this.selectionQuestions.push(question);
      } else {
        this.selectionQuestions[index] = question;
      }
    } else {
      this.selectionQuestions.push(question);
    }

    console.log('.............................................');
    console.log(this.selectionQuestions.push);
    console.log('.............................................');
  }

  ProcesEligybilityRequirement(requirementId: number | null){

    let optionRequirement = this.rebateGroup.controls['eligybilityRequirementControl'].value;

    let Requiremen = {
      'requirementId': requirementId,
      'options': optionRequirement
    }

    if (this.selectionRequirements.length >= 1 ){
      let index: number | null = this.SelectionUser(this.selectionRequirements, requirementId);
      if (index == null){
        this.selectionRequirements.push(Requiremen);
      } else {
        this.selectionRequirements[index] = Requiremen;
      }
    } else {
      this.selectionRequirements.push(Requiremen);
    }    
  }

  SelectionUser(selections: any, currentSelectionID: any){

    let result: number | null = null;

    found: for (let i = 0; i < selections.length; i++) {
      let elementID = selections[i].requirementId;
      if (elementID == currentSelectionID){
        result = i;
        break found;
      }
    }

    return result;
  }



}