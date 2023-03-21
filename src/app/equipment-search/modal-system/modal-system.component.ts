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
      quantity: [null, Validators.required],       
    });

    console.log(this.myData);
    if(this.myData.method == "edit"){
      this.systemForm.patchValue(this.myData.data);
    }

  }

  addEditSystem() {

    // Exclude empty fields on form submit.
    let myFormValue = { ...this.systemForm.value };

    for (let prop in myFormValue) {
      if (!myFormValue[prop]) {
        delete myFormValue[prop];
      }
    }

    this.dialogRef.close({method: this.myData.method, index: this.myData.index, data: myFormValue })
  
  }

}


