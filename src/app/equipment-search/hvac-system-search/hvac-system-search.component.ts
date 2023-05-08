import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatStepper, StepperOrientation  } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EquipmentSearch } from '../interfaces/equipment-search.interface'
import { MatDialog } from '@angular/material/dialog';
import { ModalSystemComponent } from '../modal-system/modal-system.component';

@Component({
  selector: 'hvac-system-search',
  templateUrl: './hvac-system-search.component.html',
  styleUrls: ['./hvac-system-search.component.css']
})

export class HVACSystemSearchComponent implements OnInit {

  //pass Object to template, to iterate object keys using *ngFor (AHRI Ratings)
  Object = Object;

  @ViewChild('stepper')
  stepper!: MatStepper;
  systemSizeForm!: FormGroup;

  // equipmentSearchData used for payload.
  myData: EquipmentSearch = {};
  payload!: EquipmentSearch;

  
  stepperOrientation: Observable<StepperOrientation>;

  MySubmitValidation: any = { location: false, utilityProviders: false, dwellingInfo: false, systemSize: false, systemDesign: false };

  systems: any[] = []

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public breakpointObserver: BreakpointObserver,
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(
        map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
   }

  ngOnInit(): void {

    // System size form group.
    this.systemSizeForm = this.fb.group({
      heatingBTUH: [null, [
        Validators.required,
        Validators.min(8000),
        Validators.max(135000),
      ]],
      coolingTons: [null, Validators.required],
    });

    this.systemSizeForm.valueChanges.subscribe(selectedValue => {
      this.myData.systemSize = selectedValue;
      this.MySubmitValidation["systemSize"] = this.systemSizeForm.valid;
    });

  }

  setNewLocation(locationData: any) {
    this.myData.location = locationData[0];
    this.MySubmitValidation["location"] = locationData[1];
  }

  setNewUtilityProviders(utilityProvidersData: any) {
    this.myData.utilityProviders = utilityProvidersData[0];
    this.MySubmitValidation["utilityProviders"] = utilityProvidersData[1];
  }

  setDwellignInfo(dwellignInfoData: any) {
    this.myData.dwellingInfo = dwellignInfoData[0];
    this.MySubmitValidation["dwellingInfo"] = dwellignInfoData[1];
  }

  // Open dialog 
  openDialog(method: string, unitType: string, i?: number): void {

    let myData = {}

    if (method == "edit" && i !== undefined) {
      myData = { method: method, unitType: unitType, index: i, data: this.systems[i], payload: this.myData || []}
    }else { 
      myData = { method: method, unitType: unitType, payload: this.myData || []}
    }

    const dialogRef = this.dialog.open(ModalSystemComponent, {
      data: myData
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result) {
        switch (result.method) {
          case "add":
  
            this.systems.push(result.data);
            break;
  
          case "edit":
  
            this.systems[result.index] = result.data;
            break;
  
          default:
            break;
        }
      }

      this.myData.systemDesign = [...this.systems];
    });
  }

  // Delete system
  deleteSystem(i: number,e: Event){
    if(confirm("Are you sure that you want to delete the system?")) {
        this.systems.splice(i, 1);
        this.myData.systemDesign = [...this.systems];
    }
    e.stopPropagation()
  }

  toolBoxValidation(unitType: string): boolean {

    if(this.myData.systemDesign) {
      const hasSmallPackagedUnit = this.myData.systemDesign.some(system => system.systemType === "Small Packaged Unit");
      switch (unitType) {
        case "Outdoor unit":
           
          const hasOutdoorUnit = this.myData.systemDesign.some(system => system.unitType === "Outdoor unit");
           
           if(hasOutdoorUnit){
            return true;
           }

          break;

        case "Indoor unit":

          if(hasSmallPackagedUnit){
           return true;
          }
          
          const hasFanOrEvaporatorCoil = this.myData.systemDesign.some(system => system.systemType === "Fan Coil" || system.systemType === "Evaporator Coil");
          if(hasFanOrEvaporatorCoil){
            return true;
          }
          
           // If the Outdoor unit is Mini-Split and the Indoor unit is Mini-Split indoor controlling the sum of qty(=5), hide add button.
          let sumaDeQuantities = this.myData.systemDesign.reduce((total, objeto) => total + (objeto.qty || 0), 0);
          if(sumaDeQuantities == 5){
            return true;
          }
          break;

        case "Furnace":
          
          if(hasSmallPackagedUnit){
            return true;
          }
           
          const hasIndoorUnits = this.myData.systemDesign.some(system => system.unitType === "Indoor unit");
          const hasFurnaces = this.myData.systemDesign.some(system => system.unitType === "Furnace");
          const equalEvaporatorCoil = this.myData.systemDesign.some(system => system.systemType === "Evaporator Coil" );
          if(hasIndoorUnits && !equalEvaporatorCoil || hasFurnaces){
            return true;
          }

          break;
      
        default:
          break;
      }
    }
    
    return false;
  }

  // tabChange is a callback when the progress bar step is changed.
  // If the new step is the final step in sequence, we load the equipment search results.
  tabChange(e: any) {

    // If this is the last step in sequence, load the results (ahri combinations).
    if (this.stepper?.steps.length - 1 == e.selectedIndex) {

      // Assemble inputs and load or re-load results.
      // The OnChanges lifecycle hook is triggered when the @Input property value changes. In the case of an object,
      // that value is the object reference. If the object reference does not change, OnChanges is not triggered.
      // To force change detection is to set a new object reference after modifying the property values
      this.payload = { ...this.myData };

    }

  }

}
