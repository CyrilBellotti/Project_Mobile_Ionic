import { Component, OnInit } from '@angular/core';
import { MsalService } from '../services/msal.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private msalService: MsalService,
    private route: Router,
    public httpClient: HttpClient,
    public homeService: HomeService
  ) { }

  ngOnInit() {
    // this.loadMyUser();
    console.log(this.msalService.getUser());
  }

  useremail(){
    let useremail = this.msalService.getUserEmail();
    return useremail;
  }

  login(){
    this.msalService.login();
    console.log("toto", this.msalService.getUserEmail());
  }

  signup(){
    this.msalService.signup();
  }

  logout(){
    this.msalService.logout();
  }

  isUserLoggedIn(){
    return this.msalService.isLoggedIn();
  }

  goToHome() {
    console.log(this.msalService.getUserEmail());
    this.httpClient.get('http://localhost:8080/users/mail/' + this.msalService.getUserEmail()).subscribe((val) => {
      this.homeService.user = val;
      console.log(this.homeService.user);
      }, error => {
        console.log(error)
      }
    )
    this.route.navigateByUrl('/home')
  }

  // loadMyUser() {
  //   this.httpClient.get('http://localhost:8080/users/' + 2, { headers: this.headers }).subscribe((val) => {  
  //       this.homeService.user = val;
  //     }, error => {
  //       console.log(error)
  //     }
  //   )
  // }
}
