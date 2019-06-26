import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
})
export class DevicesPage implements OnInit {

  devices: any;

  constructor(private route: Router, public httpClient: HttpClient, public homeService: HomeService) { }

  ngOnInit() {
    if (!this.homeService.user) {
      this.route.navigateByUrl('/login');
      return;
    }
    this.devices = this.homeService.user.device;
  }

  goToDevice(device: any) {
    this.route.navigateByUrl('/devices/' + device.uid);
  }
}
