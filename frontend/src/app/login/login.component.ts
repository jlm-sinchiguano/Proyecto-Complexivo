import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email?: string;
  password?: string;
  formData?: FormGroup;

  constructor(
    private elementRef: ElementRef,
    private authService: AuthenticationService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.formData = new FormGroup({
      email: new FormControl(""),
      password: new FormControl(""),
    });
  }

  onClickSubmit(data: any) {
    if (data.email && data.password) {
      this.email = data.email;
      this.password = data.password;

      console.log("Login page: " + this.email);
      console.log("Login page: " + this.password);

      if (typeof this.email === 'string' && typeof this.password === 'string') {
        this.authService.login(this.email, this.password)
          .subscribe(data => {
            console.log("Is Login Success: " + data);

            if (data) this.router.navigate(['home']);
          });
      }
    }
  }
}
