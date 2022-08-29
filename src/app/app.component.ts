import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Produto } from './model/Produto.model';
import { ProdutoService } from './services/produto.service';

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

  mensagem: string;
  error:any;

  constructor(private router: Router, private produtoService: ProdutoService) {
  }

  ngOnInit(): void {
  }

  inicializaProduto() {
    this.produto = {
      nome: '',
      descricao: '',
      preco: null,
      imageUrl: null
    };
  }

  postProduto() {
    this.produtoService.saveProduto({... this.produto})
      .subscribe({
        next: (next) => {          
        },
        error: (error) => {
          console.log(error);
          this.error = error;
          this.mensagem = null;
        },
        complete: () => {
          this.error = null;
          this.mensagem = "Produto criado com sucesso.";
        }
      });
    this.inicializaProduto();      
    this.form.reset();
  }

  onSubmit() {
    this.postProduto();
  }
}
