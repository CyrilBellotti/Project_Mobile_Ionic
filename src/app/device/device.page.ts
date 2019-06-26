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

  device: { id: number; sensor: any[]; uid: string; }

  
  constructor(private activatedRoute: ActivatedRoute, private route: Router, public httpClient: HttpClient, public homeService: HomeService) { }
  sensorSelected: string;

  ngOnInit() {
    this.sensorSelected = "light"
    this.httpClient.get("http://localhost:8080/devices/uid/" + this.activatedRoute.snapshot.paramMap.get("id")).subscribe((val) => {  
        this.homeService.device = val;
        this.device = this.homeService.device;
        console.log(this.device)
      }, error => {
        console.log(error)
      }
    )
  }

  segmentChanged(e) {
    this.actualState = e.detail.value
  }

  type: String;
  uidSensor: String;
  statsSensorSelected: String;
  statsTypeCalcul: String;
  statsDuree: String;
  actualState: string = 'list';



  runActionOnDevice() {
    if (this.sensorSelected == 'light') {
      console.log(this.homeService.device.sensors)
      this.homeService.device.sensors.forEach(element => {
        if (element.type === "Light") {
          this.type = element.type;
          this.uidSensor = element.uid;
        }
      });
      this.httpClient.post("http://localhost:8080/devices/action/", { type: this.type, uidSensor: this.uidSensor, uidDevice: this.homeService.device.uid }).subscribe((val) => {  
        console.log(val)
      }, error => {
        console.log(error)
      }
    )
    }
  }

  duree: string | number;
  value: { value: number; date: string; }[];
  test: boolean;

  loadStat() {
    let typeCapteur: any;
    this.homeService.device.sensors.forEach(element => {
      if (element.uid == this.statsSensorSelected) {
        typeCapteur = element.type
      }
    });
    if (!this.statsTypeCalcul || !this.statsDuree || !this.statsSensorSelected) {
      console.log("erreur");
      return;
    }
    console.log(typeCapteur)
    if (this.statsDuree === "oneDay") {
      this.duree = 24;
    } else if (this.statsDuree === "oneWeek") {
      this.duree = 168;
    } else if (this.statsDuree === "oneMonth") {
      this.duree = 720;
    }
    this.duree
    console.log(this.statsTypeCalcul, this.duree, this.statsSensorSelected.uid);
    this.httpClient.get("http://localhost:8080/devices/stats/" + this.statsSensorSelected.uid + "/" + this.statsTypeCalcul + "/" + this.duree).subscribe((val) => {  
        console.log(val)
        const lineChartDataArray = [];
        this.value = [
          {
            value: 12,
            date: "12h"
          },
          {
            value: 13,
            date: "13h"
          },
          {
            value: 11,
            date: "14h"
          },
          {
            value: 16,
            date: "15h"
          },
          {
            value: 19,
            date: "16h"
          }
        ]
        lineChartDataArray.length = 0;
        this.lineChartLabels.length = 0;
        this.value.forEach(e => {
          this.lineChartLabels.push(e.date);
          lineChartDataArray.push(e.value);
        })
        this.lineChartData = [
          {data: lineChartDataArray, label: typeCapteur}
        ];
        this.test = true;
      }, error => {
        console.log(error)
      }
    )
  }


  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
  
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }

}
