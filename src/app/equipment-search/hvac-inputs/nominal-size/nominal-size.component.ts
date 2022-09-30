import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nominal-size',
  templateUrl: './nominal-size.component.html',
  styleUrls: ['./nominal-size.component.css']
})
export class NominalSizeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  /* 
  
  <form [formGroup]="nominalSizeGroup">
    <!-- Name of step -->
    <ng-template matStepLabel>Equipment Size</ng-template>
    <h2 class="rc-main-title">Equipment Size</h2>
    <!-- Content of step -->
    <div fxLayout fxLayoutAlign="center">
      <!-- User input -->
      <div fxFlex="40" fxLayout="column" fxLayoutAlign="center stretch" fxFlex.xs="100" fxFlex.sm="70" fxFlex.md="40" fxLayoutGap="20">

        <!-- input -->
        <mat-form-field appearance="fill"  >
          <mat-label>Cooling tons</mat-label>
          <mat-select  #sGroup formControlName="coolingTons">
              <mat-option [value]="0.5" radioGroup="sGroup"> < 1.0 </mat-option>
              <mat-option [value]="1.0" radioGroup="sGroup"> 1.0  </mat-option>
              <mat-option [value]="1.5" radioGroup="sGroup"> 1.5 </mat-option>
              <mat-option [value]="2.0" radioGroup="sGroup"> 2.0 </mat-option>
              <mat-option [value]="2.5" radioGroup="sGroup"> 2.5 </mat-option>
              <mat-option [value]="3.0" radioGroup="sGroup"> 3.0 </mat-option>
              <mat-option [value]="3.5" radioGroup="sGroup"> 3.5 </mat-option>
              <mat-option [value]="4.0" radioGroup="sGroup"> 4.0 </mat-option>
              <mat-option [value]="4.5" radioGroup="sGroup"> 4.5 </mat-option>
              <mat-option [value]="5.0" radioGroup="sGroup"> 5.0 </mat-option>
          </mat-select>
        </mat-form-field>


        <!-- input -->
        <mat-form-field appearance="fill">
          <mat-label>Heating BTUH</mat-label>
          <input matInput placeholder="Heating BTUH" type="number" formControlName="heatingBTUH" required>
          
          <!-- error -->
          <mat-error *ngIf="nominalSizeGroup.get('heatingBTUH')?.hasError('is_not_number') && nominalSizeGroup.get('heatingBTUH')?.touched">
            Heating BTUH <strong>must be a number.</strong>
          </mat-error>
          <mat-error *ngIf="nominalSizeGroup.get('heatingBTUH')?.hasError('null_not_permit') && nominalSizeGroup.get('heatingBTUH')?.touched">
            Heating BTUH is <strong>required</strong>
          </mat-error>
          <mat-error *ngIf="nominalSizeGroup.get('heatingBTUH')?.hasError('need_between_4_6_characters') && nominalSizeGroup.get('heatingBTUH')?.touched">
            Heating BTUH must be <strong>between 4 and 6 digits</strong>.
          </mat-error>
          <mat-error *ngIf="nominalSizeGroup.get('heatingBTUH')?.hasError('Hbtuh_invalid_value') && nominalSizeGroup.get('heatingBTUH')?.touched">               
            Heating BTUH must be a whole number <strong>between 8,000 and 135,000</strong>.
          </mat-error>
          <mat-error *ngIf="nominalSizeGroup.get('heatingBTUH')?.hasError('it_not_integer') && nominalSizeGroup.get('heatingBTUH')?.touched">
            Heating BTUH is not <strong>integer</strong>.
          </mat-error>
        </mat-form-field>

        <!-- button -->
        <div fxLayout="row" fxLayoutAlign="space-between center" class="rc-stepper-buttons">
          <button type="button" mat-button matStepperPrevious>Back</button>
          <button type="button" [disabled]="nominalSizeGroup.invalid" mat-raised-button color="primary" matStepperNext>Continue
            <mat-icon>arrow_forward</mat-icon>
          </button>
        </div>
      </div>
    </div>
  </form>
  
  */

}
