import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.scss']
})
export class MenuUserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  close() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
