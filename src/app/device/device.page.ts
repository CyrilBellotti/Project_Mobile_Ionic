import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.page.html',
  styleUrls: ['./device.page.scss'],
})
export class DevicePage implements OnInit {

  private headers = new HttpHeaders('Content-Type: application/x-www-form-urlencoded; charset=UTF-8');
  actualState: string = 'list';
  device: { id: number; sensor: any[]; uid: string; }

  constructor(private activatedRoute: ActivatedRoute, private route: Router, public httpClient: HttpClient, public homeService: HomeService) { }

  ngOnInit() {
    this.httpClient.get("http://localhost:8080/devices/" + this.activatedRoute.snapshot.paramMap.get('id'), { headers: this.headers }).subscribe((val) => {  
        this.homeService.device.id = val.id;
        this.homeService.device.sensor = val.sensor;
        this.homeService.device.uid = val.uid;
        this.device = this.homeService.device;
      }, error => {
        console.log(error)
      }
    )
  }

  segmentChanged(e) {
    this.actualState = e.detail.value
  }

}
