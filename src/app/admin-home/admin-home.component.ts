import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private loginSerice: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  public isLoggedIn(){
    return localStorage.getItem('token')?true:false;
  }
  public logout(){
    this.loginSerice.logout();
    localStorage.removeItem('token');
    this.router.navigate(['/admin/login']);
  }


}
