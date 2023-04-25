import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-system',
  templateUrl: './modal-system.component.html',
  styleUrls: ['./modal-system.component.css']
})
export class ModalSystemComponent implements OnInit {  

  systemForm !: FormGroup;  

  outdoorSystemTypes : Array<string> = ["Split system", "Mini-Split", "Small Packaged Unit"];
  indoorSystemTypes : Array<string> = ["Fan Coil", "Evaporator Coil", "Mini-Split indoor"];

  constructor(
    private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public myData: any,
    private dialogRef: MatDialogRef<ModalSystemComponent>) { }

  ngOnInit(): void {
    this.systemForm = this.formBuilder.group({
      unitType: [null, Validators.required],
      systemType: [null, Validators.required],
      HVACType: [null, Validators.required],
      energyDistribution: [null, Validators.required],   
      msIndoorUnitStyle: [null, Validators.required],
      size: [null, Validators.required],
      qty: [null, Validators.required],       
    });
 
    // Populate dynamic systemTypes for outdoor and indoor units.
    this.populateSystemTypes();

    if(this.myData.method == "edit") {
      this.systemForm.patchValue(this.myData.data);
    } else {
      this.systemForm.controls["unitType"].patchValue(this.myData.unitType);
    }

  }
  
  populateSystemTypes() {
    
    const someMiniSplitIndoor = this.myData.payload.systemDesign?.some((system:any) => system.systemType === "Mini-Split indoor");
    if(someMiniSplitIndoor) {
      this.outdoorSystemTypes = ["Mini-Split"];
      this.indoorSystemTypes = ["Mini-Split indoor"];
    } 

    const someFanCoilOrEvaporatorIndoor = this.myData.payload.systemDesign?.some((system:any) => system.systemType === "Fan Coil" || system.systemType === "Evaporator Coil");
    if(someFanCoilOrEvaporatorIndoor) {
      this.outdoorSystemTypes = ["Split system", "Mini-Split"];
    }

    const someSplitSystemsOutdoor = this.myData.payload.systemDesign?.some((system:any) => system.systemType === "Split system");
    if(someSplitSystemsOutdoor) {
      this.indoorSystemTypes = ["Fan Coil", "Evaporator Coil"];
    }

    if(this.myData.payload.dwellingInfo?.fuelSource == 'None'){
      this.indoorSystemTypes = ["Fan Coil", "Mini-Split indoor"];
    }

    const someFurnace = this.myData.payload.systemDesign?.some((system:any) => system.unitType === "Furnace");
    if(someFurnace) {
      this.indoorSystemTypes = ["Evaporator Coil"];
    }
  }

  validateResults(mySystemDesign: any[], myFormValue: any) :boolean {
    
    // if the Outdoor unit is Small Packaged Unit, no more systems can be added
    if(myFormValue.systemType == "Small Packaged Unit"){
      
      // you can only have one small packaged unit
      if(mySystemDesign){
        if(mySystemDesign.length >= 1 && this.myData.method == "add" || mySystemDesign.length > 1) {
          alert("You can only have one system for this option.")
          return false;
        }
      }
    }
   
     // If the Outdoor unit is Mini-Split and the Indoor unit is Mini-Split indoor controlling the sum of qty(<=5)
     if(myFormValue.systemType == "Mini-Split indoor") {
      let sumaDeQuantities = mySystemDesign.reduce((total, objeto) => total + (objeto.qty || 0), 0);
      if(this.myData.method == "edit"){
        sumaDeQuantities = sumaDeQuantities - this.myData.data.qty;
      }
      if((sumaDeQuantities + myFormValue.qty) > 5){
        alert("The sum of the quantities must be <= 5")
        return false;
      }
     }

    return true;
  }

  addEditSystem() {

    // Exclude empty fields on form submit.
    let myFormValue = { ...this.systemForm.value };

    for (let prop in myFormValue) {
      if (!myFormValue[prop]) {
        delete myFormValue[prop];
      }
    }

    // Validate modal
    if(this.validateResults(this.myData.payload.systemDesign, myFormValue)) {

      this.dialogRef.close({method: this.myData.method, index: this.myData.index, data: myFormValue })

    }
  
  }

}


