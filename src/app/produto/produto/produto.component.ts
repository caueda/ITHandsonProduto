import { Component, OnInit, ViewChild } from '@angular/core';
import { Produto } from 'src/app/model/Produto.model';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  loading: boolean = false;
  errorResponse = null;
  mensagem: string = null;

  @ViewChild('produtoForm') produtoForm: any;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
  }

  postProduto(produto) {
    this.produtoService.saveProduto({... produto})
      .subscribe({
        next: next => {},
        error: error => {
          console.log(error);
          this.errorResponse = error;
          this.mensagem = null;
        },
        complete: () => {
          this.errorResponse = null;
          this.mensagem = 'Produto criado com sucesso.';
          this.produtoForm.resetForm();
        }
      });
  }

  isUnexpectedError() {
    return  this.errorResponse && (this.errorResponse?.error?.type !== undefined);
  }

  isBusinessError() {
    return this.errorResponse && (this.errorResponse?.field);
  }

  closeDialog = () => {
    this.mensagem = null;
  }
}
