import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Produto } from 'src/app/model/Produto.model';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {

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

  postProduto = () => {
    this.produtoService.saveProduto({...this.produto})
      .subscribe({
        next: next => {},
        error: error => {
          console.log(error);
          this.error = error;
          this.mensagem = null;
        },
        complete: () => {
          this.error = null;
          this.mensagem = 'Produto criado com sucesso.';
          this.inicializaProduto();
          this.form.reset();
        }
      });
  }
  

  onSubmit() {
    this.postProduto();
  }
}
