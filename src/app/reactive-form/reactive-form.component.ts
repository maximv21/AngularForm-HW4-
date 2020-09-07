import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray,ValidationErrors} from '@angular/forms';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['../app.component.css']
})
export class ReactiveFormComponent  {
  myForm : FormGroup;
    
	
	constructor(){
        this.myForm = new FormGroup({
             
            "userName": new FormControl(null, [Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
            "password": new FormControl(null, [Validators.required,this.customValidator]),
            "emails": new FormArray([])
        });
    }
    
	/*Email add/delete buttons*/
	addEmail() {
		this.emailsFormArray.push(new FormControl(null, [Validators.required, Validators.email]));    }   
    
    removeEmail(index: number) {       
		this.emailsFormArray.removeAt(index);   }
    
	customValidator = function (control: AbstractControl): ValidationErrors | null  {
	
		let errors: any = {}, value: string = control.value || '';
	
		if (!value) {
			return null
		}
		/*All the errors are stored in object and  returned to 'formControl error object'*/
		if (/[A-Z]+/g.test(value) === false) {
			errors.capitalLetters = "password must include at least 1 capital letter"
		}
		if (/[a-z]+/g.test(value) === false) {
			errors.lowCaseLetters = "password must include at least 1 low case letter"  
		}
		if (/[0-9]+/g.test(value) === false) {
			errors.digits = "password must include at least 1 digit"
		}
		console.log(errors)
			return errors;

	}   
	/*Getters for a convenient access to elements in template*/
	get emailsFormArray() {      
			return this.myForm.get('emails') as FormArray;    
		}
	get name() {
		
			return this.myForm.get('userName');
	}
	get pass() {
			return	this.myForm.get('password');
	}
    submit(){
        console.log(this.myForm);
		
    }
}

