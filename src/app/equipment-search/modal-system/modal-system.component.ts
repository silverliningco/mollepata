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
      coolingCapacity: [null, Validators.required],
      qty: [null, Validators.required],       
    });

    if(this.myData.method == "edit"){
      this.systemForm.patchValue(this.myData.data);
    }

  }

  
  isSplitSystem(){
    return this.myData.systemDesign.some((system:any) => system.systemType === "Split system");
    
  } 
  isMiniSplit(){
    return this.myData.systemDesign.some((system:any) => system.systemType === "Mini-Split");
  }

  hasOutdoors(){
    return this.myData.systemDesign.some((system:any) => system.unitType === "Outdoor unit");
  }

  isEvaporatorCoil(){
    return this.myData.systemDesign.some((system:any) => system.systemType === "Evaporator Coil");
  }

  validateResults(mySystemDesign: any[], myFormValue: any) :boolean {
    
    // if the Outdoor unit is Small Packaged Unit, no more systems can be added
    if(myFormValue.systemType == "Small Packaged Unit"){
      
      // you can only have one small packaged unit
      if(mySystemDesign.length >= 1 && this.myData.method == "add" || mySystemDesign.length > 1) {
        alert("You can only have one system for this option.")
        return false;
      }
    }
  
    // if the Outdoor unit is a Split system and the Indoor unit is a Fan Coil, no more systems can be added.
    if(myFormValue.systemType == "Fan Coil"){
      // you can only have one small packaged unit
      if(mySystemDesign.length >= 2 && this.myData.method == "add" || mySystemDesign.length >2) {
        alert("You can only have 2 systems for this option.")
        return false;
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
    if(this.validateResults(this.myData.systemDesign, myFormValue)) {

      this.dialogRef.close({method: this.myData.method, index: this.myData.index, data: myFormValue })

    }
  
  }

}


