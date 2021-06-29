import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form_login: FormGroup;
  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              private router: Router ) {
    
    this.form_login = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  public login() {
    let formData = {
        email: this.f.email.value,
        password: this.f.password.value
    };

    this.authService.loginService(formData)
    .subscribe(
      (data: any) => {
          this.authService.setToken(data.token);
          this.router.navigate(['/user']);
          Swal.fire({
            timer: 1000,
            icon: 'success',
            title: 'Registro exitoso',
            text: ''
          })
      },
      (error) => {
        Swal.fire({
          timer: 5000,
          icon: 'error',
          title: 'Acceso denegado',
          text: error.error.error
        })
      }
    );
  }

  get f() {
    return this.form_login.controls;
  }

}
