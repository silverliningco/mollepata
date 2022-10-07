import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { bridgeService } from '../../services/bridge.service';
import { EndPointsService } from '../../services/endPoints.service';

interface ParamsRebateEligibility {
	utilityProviders: any;
	state: string;
	fuelSource: string;
}

@Component({
  selector: 'app-rebate-eligibility',
  templateUrl: './rebate-eligibility.component.html',
  styleUrls: ['./rebate-eligibility.component.css']
})
export class RebateEligibilityComponent implements OnInit {

  rebateEligibilityGroup !: FormGroup;

  myEligibilityQuestions:Array<any> = [];
  noResultsEQ: boolean = true;

  params!: ParamsRebateEligibility; 

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService,
    private _endPoint: EndPointsService
  ) { }

  ngOnInit(): void {

    this._bridge.paramsRebateEligibility
        .subscribe((payload: any) => {
          this.completeParams(payload.data);
         });

    this.rebateEligibilityGroup = this.formBuilder.group({
      questions: this.formBuilder.array([])
    });
  }

  // por que los valores que no llegan deven de completarce con ''
  completeParams(prm: ParamsRebateEligibility): void{

    console.log(prm)

    let ArrayValues =  Object.values(prm);
    let complete: boolean = false;

    complete: for (let value of ArrayValues) {
      if (value == null || value == undefined || value === ''){
        complete =  false;
        break complete
      } else {
        if(typeof value === 'object'){
          let ArrValues = Object.values(value);
          for (let valueN of ArrValues) {
            if (valueN == null || valueN == undefined || valueN === ''){
              complete =  false;
              break complete
            } else {
              complete = true
            }
          }

        } else {
          complete = true
        }
      }
    }

    if(complete == true){
      this.params = prm;
      this.LoadEligibilityQuestions();
    }
  }

  PrepareDataEligibilityQuestions(){
    let body = {
      country: "US",
      state: this.params?.state,
      utilityProviders: { 
        electricUtilityId: this.params?.utilityProviders?.electricUtilityId,
        fossilFuelUtilityId: this.params?.utilityProviders?.fossilFuelUtilityId
      },
      fuelSource: this.params?.fuelSource,
      rebateTypes:["electric", "OEM", "distributor", "fossil fuel"],
      OEM: "Carrier",
      storeIds: []
    }

    console.log(body);
    return body;
  }

  get questions(){
    return this.rebateEligibilityGroup.get('questions') as FormArray;
  }

  AddQuestion(question:any){

    // se debe de limpliar el FormArray
    // this.questions.reset();

    const RebateEligibilityGroup  = this.formBuilder.group({
      questionId: question.questionId,
      answer: ['',  Validators.required],
      questionText: question.questionText,
      options: [question.options]
    });
    this.questions.push(RebateEligibilityGroup);
  }

  LoadEligibilityQuestions(){

    this._endPoint.ElegibilityQuestions(this.PrepareDataEligibilityQuestions()).subscribe({
      next: (resp) => {
        console.log(resp);
        if(resp.length > 0) {
          for (let iterator of resp) {
            this.AddQuestion(iterator)
            this.noResultsEQ = false;
          }
        } else {
          this.noResultsEQ = true;
        }
        
      },
      error: (e) => alert(e.error),
      complete: () => console.info('complete')
    })
  }

  AnswersEligibilityQuestions(){
    // Create interface to dynamically asign properties
    interface IAnswer {
      [key: string]: string
    }
    var myAnswers: IAnswer = {};

    let myQuestions = this.rebateEligibilityGroup.value.questions;
    myQuestions.forEach((question: any) => {
      myAnswers![question.questionId] = question.answer;
    });

    
    return myAnswers;

  }



}
