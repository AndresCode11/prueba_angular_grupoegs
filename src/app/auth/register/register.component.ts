import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form_register: FormGroup;
  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.form_register = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      document_type: ['', Validators.required],
      document: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      born_date: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  get f() {
    return this.form_register.controls;
  }

  public register() {
    if(this.form_register.valid) {
      let formData = {
        'first_name': this.f.firstName.value,
        'last_name': this.f.lastName.value,
        'email': this.f.email.value,
        'document_type': this.f.document_type.value,
        'document': this.f.document.value,
        'password': this.f.password.value,
        'born_date': this.f.born_date.value,
        'city': this.f.city.value
      }
      this.authService.registerService(formData)
      .subscribe(
        (success) => {
          Swal.fire({
            timer: 1000,
            icon: 'success',
            title: '',
            text: 'Usuario generado de manera exitosa'
          })
          this.router.navigate(['/user']);
        },
        (error) => {
          Swal.fire({
            timer: 1000,
            icon: 'error',
            title: 'Error',
            text: 'Error al crear usuario'
          })
        }
      )
    }
    else {
      Swal.fire({
        timer: 10000,
        icon: 'error',
        title: 'Completa el formulario',
        text: 'Campos incompletos o con datos incorrectos'
      });
       // Get all Form Controls keys and loop them
      Object.keys(this.form_register.controls).forEach(key => {
        // Get errors of every form control
        console.log(this.form_register.get(key).errors);
      });
    }
  }

}
