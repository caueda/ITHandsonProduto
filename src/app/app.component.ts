import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Produto } from './model/Produto.model';

@Component({
  selector: 'micro-app-produto',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild("f") form: NgForm;
  produto: Produto = {
    nome: '',
    descricao: '',
    preco: null,
    imageUrl: null
  };

  constructor(private router: Router) {
    this.router.initialNavigation();
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
