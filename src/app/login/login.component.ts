import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  processing :boolean = false;
  loginForm: FormGroup;
  accessToken:string = '';


  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  public login(){

    console.log('Calling Login method');
    this.loginService.getCsrfToken().subscribe({
      next: (data) => {
        console.log('You get your X-CSRF token : ', data);
        this.loginService.login(this.loginForm.value).subscribe(
          {
            next: (data2) => {
              this.accessToken = data2.accessToken;
              this.loginService.accessToken= this.accessToken;
              localStorage.setItem('token',this.accessToken);;
              // this.loginService.getCurrentUser().subscribe({
              //   next: (data3) => {
              //     console.log("USER", data3);

              //   },
              //   error:  err3 =>{
              //     console.log("ERROR", err3);

              //   }
              // });

              this.router.navigate(['/admin/characters']);

            },
            error:  err2 =>{
              console.log("ERROR", err2);
              localStorage.removeItem('token');
              this.loginService.accessToken= '';


            }
          }
        );



      },
      error:  err =>{
        console.log("Error login method - login form Component", err);

      }
    });
  }


}
