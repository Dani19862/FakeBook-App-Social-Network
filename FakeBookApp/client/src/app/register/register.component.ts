import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../services/account.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter<boolean>()
  registerForm: FormGroup;
  maxDate:Date;
  validationErrors: any;


  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router) { }



  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18); // set the maxDate to 18 years ago from today
  }
  initializeForm() {
    this.registerForm = this.fb.group({   // create the inputs of user form to register

      username:["",Validators.required],
      knownAs:["",Validators.required],
      dateOfBirth:["",Validators.required],
      city:["",Validators.required],
      country:["",Validators.required],
      password: ['',
      [Validators.required,
       Validators.minLength(4),
       Validators.maxLength(8)
      ]],                                     // => password
      confirmPassword: ['',
      [Validators.required,
      this.matchValues('password')]]          // => ConfirmPassword
    })

      this.registerForm.get('password')?.valueChanges.subscribe(()=>{         // subscribe to the valueChanges of the password form control
        this.registerForm.get('confirmPassword')?.updateValueAndValidity();   // update the value and validity of the confirmPassword form control
      })

    }


   //  method to match password and confirmPassword
  matchValues(matchTo: string): ValidatorFn {
      return (control:AbstractControl): ValidationErrors | null =>{
        const controlValue  = control.value;      // value of the form control that is being validated
        const matchingControl = (control?.parent as FormGroup)?.controls[matchTo];
        const matchingControlValue = matchingControl?.value;   // value of the matching control
      return controlValue === matchingControlValue ? null : { isMatching: true };    // if the values are equal, return null, else return isMatching: true
      }

  }

  register(){
    this.accountService.register(this.registerForm.value).subscribe(
      (reg) => {
       this.router.navigate(['/members']);
       this.cancel();
      },
      error =>{
        if(Array.isArray(error)){
        this.validationErrors = error;
      }
    }
    )
    console.log(this.registerForm.value);
  }
  cancel(){
    this.cancelRegister.emit(false);
  }
}


