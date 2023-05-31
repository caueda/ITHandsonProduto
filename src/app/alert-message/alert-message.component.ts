import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {

  @Input() mensagem: string;
  @Input() isUnexpectedError: Function;
  @Input() isBusinessError: Function;
  error: any;

  constructor() { }

  ngOnInit(): void {
  }


}
