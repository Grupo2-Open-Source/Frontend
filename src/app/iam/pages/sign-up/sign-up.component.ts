import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {SignUpRequest} from "../../model/sign-up.request";
import {BaseFormComponent} from "../../../shared/components/base-form.component";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent extends BaseFormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;



  constructor(private builder: FormBuilder, private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit(): void {
    this.form = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    let username = this.form.value.username;
    let password = this.form.value.password;
    let firstName = this.form.value.firstName;
    let lastName = this.form.value.lastName;
    let email = this.form.value.email;
    const signUpRequest = new SignUpRequest(username, password, firstName, lastName, email);
    this.authenticationService.signUp(signUpRequest);
    this.submitted = true;
  }

}
