import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  user =  {
    id: 2,
    device: [],
    name: '',
    mail: ''
  }

  device =  {
    id: 2,
    sensor: [],
    uid: ''
  }

  constructor() { }
}
