import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { EndpointsService } from '../services/endpoints.service';

@Component({
  selector: 'app-eligibility-criteria',
  templateUrl: './eligibility-criteria.component.html',
  styleUrls: ['./eligibility-criteria.component.css']
})
export class EligibilityCriteriaComponent implements OnInit, OnChanges {

  @Input() myParams!: any; 
  @Output()eligibilityQuestionsChange: EventEmitter<any> = new EventEmitter();
  @Output()eligibilityRequirementsChange: EventEmitter<any> = new EventEmitter();

  eligibilityQuestionsForm !: FormGroup;
  eligibilityRequirementsForm !: FormGroup;
  myEligibilityCriteria!: any;

  constructor(private _endpoint: EndpointsService, private fb: FormBuilder) { }

  get questions(){
    return this.eligibilityQuestionsForm.get('questions') as FormArray;
  }

  get requirements(){
    return this.eligibilityRequirementsForm.get('requirements') as FormArray;
  }
  
  ngOnChanges(changes: SimpleChanges): void {

    const currentState: any = changes["myParams"].currentValue;
console.log(currentState);
    if(currentState) {
      this.loadDefaultEligibility(null);
     }

  }
  ngOnInit(): void {
    
    this.eligibilityQuestionsForm = this.fb.group({
      questions: this.fb.array([])
    });
    this.eligibilityRequirementsForm = this.fb.group({
      requirements: this.fb.array([])
    });

    this.questions.valueChanges.subscribe(selectedValue => {
      this.eligibilityQuestionsChange.emit(selectedValue);      
    });
    
    this.requirements.valueChanges.subscribe(selectedValue => {
      this.eligibilityRequirementsChange.emit(selectedValue);      
    });

  }
  
  // loadDefaultEligibility loads the available eligibility questions and requirements and their default values.
  loadDefaultEligibility(myParams: any) {
    this._endpoint.ElegibilityCriteria(myParams).subscribe({
      next: (resp: any) => {
        this.myEligibilityCriteria = resp;
        resp.eligibilityQuestions.forEach((question:any)  => {
          this.AddQuestion(question)
        }); 
      },
      error: (e) => alert(e.error)
    })
  }

  /* ElegibilityQuestions */
  AddQuestion(question:any){
    const QuestionFormGroup  = this.fb.group({
      questionId: question.questionId,
      selectedValue: [question.defaultValue],
      questionText: question.questionText,
      options: [question.options]
    });
    
    this.questions.push(QuestionFormGroup);
  }

}
