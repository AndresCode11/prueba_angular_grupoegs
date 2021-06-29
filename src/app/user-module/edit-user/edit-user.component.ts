import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserManagementService } from '../services/user-management-service/user-management.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public form_edit: FormGroup;
  
  constructor(private route: ActivatedRoute,
              private userManagement: UserManagementService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getUserData();
    this.form_edit = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      document_type: ['', Validators.required],
      document: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      born_date: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  getUserData() {
    let id = this.route.snapshot.paramMap.get('id');
    let formData = {
      user_id: id
    }  
    this.userManagement.userDataService(formData)
    .subscribe(
      (data: any) => {
        this.form_edit.setValue({ 
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          document_type : data.document_type,
          document: data.document,
          born_date: data.born_date,
          city: data.city        
        });
      },
      (error) => {}
    )
  }

  get f() {
    return this.form_edit.controls;
  }

  edit() {
    let id = this.route.snapshot.paramMap.get('id');
    if(this.form_edit.valid) {
      let formData = {
        'id': id,
        'first_name': this.f.firstName.value,
        'last_name': this.f.lastName.value,
        'email': this.f.email.value,
        'document_type': this.f.document_type.value,
        'document': this.f.document.value,
        'born_date': this.f.born_date.value,
        'city': this.f.city.value
      }
      this.userManagement.editUserService(formData)
      .subscribe(
          (data) => {
            Swal.fire({
              timer: 1000,
              icon: 'success',
              title: '',
              text: 'Usuario editado'
            })
          },
          (error) => {
            Swal.fire({
              timer: 1000,
              icon: 'error',
              title: '',
              text: 'Error al editar el usuario'
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
       Object.keys(this.form_edit.controls).forEach(key => {
        // Get errors of every form control
        console.log(this.form_edit.get(key).errors);
      });
    }
  }

}
