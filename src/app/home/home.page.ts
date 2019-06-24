import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private headers = new HttpHeaders('Content-Type: application/x-www-form-urlencoded; charset=UTF-8');

  constructor(private route: Router, public httpClient: HttpClient, public homeService: HomeService) { }

  ngOnInit() {
    console.log("1")
    this.loadMyUser();
  }

  loadMyUser() {
    this.httpClient.get('http://localhost:8080/users/' + this.homeService.user.id, { headers: this.headers }).subscribe((val) => {  
        this.homeService.user.device = val.device;
        this.homeService.user.mail = val.mail;
        this.homeService.user.name = val.name;
      }, error => {
        console.log(error)
      }
    )
  }

  goToDevices() {
    this.route.navigateByUrl('/devices')
  }

  logout() {
    this.route.navigateByUrl('/login');
  }
}
