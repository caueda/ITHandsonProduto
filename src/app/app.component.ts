import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'micro-app-produto',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor() {
    console.log('AppComponent');
  }

  ngOnInit(): void {
  }
}
