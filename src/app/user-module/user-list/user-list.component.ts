import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTable } from "simple-datatables";
import { UserManagementService } from '../services/user-management-service/user-management.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private userManagement: UserManagementService,
              private router: Router) { }

  ngOnInit(): void {
    this.userManagement.allUsersService()
    .subscribe(
      (data) => {
        let self = this;
          let data_info = {
            "data": this.json2array(data)
          };
          const dataTable = new DataTable("#users-table", {
            data: data_info,
            "columns": [{
                select: 0,
                render: function (data, cell, row) {
                  return "<button id='user-" + data + "' class='btn-redirect btn btn-sm btn-primary' type='button'>" + 'Editar' + "</button>";
                }
              }
            ],
          });

          // Set click event
          let bts: any = document.getElementsByClassName('btn-redirect');
          for (const iterator of bts) {
              iterator.addEventListener('click', function(){
                let userID =  (this.id).replace('user-', '');
                self.router.navigate(['/user/edit/' + userID]);
              })
          }

      },
      (error) => {}
    )
  }

  private json2array(json) {
    var result = [];
    for (const item of json) {
      result.push([
        item.id,
        item.firstName,
        item.lastName,
        item.document_type,
        item['document'],
        item.email,
        item.born_date
      ])
    }
    return result;
  }

}
