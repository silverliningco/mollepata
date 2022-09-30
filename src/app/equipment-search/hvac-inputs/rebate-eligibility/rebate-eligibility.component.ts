import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rebate-eligibility',
  templateUrl: './rebate-eligibility.component.html',
  styleUrls: ['./rebate-eligibility.component.css']
})
export class RebateEligibilityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   
  <form [formGroup]="eligibilityQuestionsGroup">
    <!-- Name of step -->
   <ng-template matStepLabel>Eligibility questions</ng-template>
    <h2 class="rc-main-title">Eligibility questions</h2> 
    <!-- Content of step -->
    <div fxLayout fxLayoutAlign="center"> 
      <!-- User input -->
     <div fxFlex="40" fxLayout="column" fxLayoutAlign="center stretch" fxFlex.xs="100" fxFlex.sm="70" fxFlex.md="40" fxLayoutGap="20">
        <div formArrayName="questions" *ngFor ="let question of questions.controls; let i = index">
          <strong>{{question.value.questionText}}</strong>
          <div [formGroupName]="i" class="rc-elegibility-questions">
            <mat-radio-group aria-label="Select an option"  formControlName="answer" >
              <mat-radio-button *ngFor="let option of question.value.options" [value]="option">{{option}}</mat-radio-button>
            </mat-radio-group>
          </div>
        </div>
        <div *ngIf="noResultsEQ">
          <div class="rc-alert info">
            <mat-icon class="rc-icon-alert">info</mat-icon>
            <p>Whoa, looks like no rebate eligibility questions apply. Just smack the "Continue" button.</p>
          </div>
       </div>

        <!-- button -->
        <div fxLayout="row" fxLayoutAlign="space-between center" class="rc-stepper-buttons">
          <button type="button" mat-button matStepperPrevious>Back</button>
          <button type="button" [disabled]="eligibilityQuestionsGroup.invalid" mat-raised-button color="primary" matStepperNext>Continue
            <mat-icon>arrow_forward</mat-icon>
          </button>
        </div>
      </div>
    </div>
  </form>
  
   */

}
