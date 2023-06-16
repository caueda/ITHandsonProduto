import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/Produto.model';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produto: Produto = {
    nome: '',
    descricao: '',
    preco: null,
    imageUrl: null
  };

  loading: boolean = false;
  error: null;
  mensagem: string = null;

  constructor(private produtoService: ProdutoService) { }

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
        }
      });
  }
}
