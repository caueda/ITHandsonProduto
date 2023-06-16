import { Component, Input, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/Produto.model';
import { PaginatedResponse } from 'src/app/model/paginatedResponse';
import { ProdutoService } from 'src/app/services/produto.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { ProdutoEditComponent } from '../produto-edit/produto-edit.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-produto-consulta',
  templateUrl: './produto-consulta.component.html',
  styleUrls: ['./produto-consulta.component.css'],
  providers: [DialogService],
})
export class ProdutoConsultaComponent implements OnInit {

  form: FormGroup;

  @Input() mensagem: string;
  @Input() error: any;

  produtos: Produto[] = [];
  page: number = 0;
  rows: number = 5;
  total: number = 0;
  loading: boolean = false;

  produto: Produto = {
    nome: '',
    descricao: '',
    preco: null,
    imageUrl: null,
  };

  paginatedResponse: PaginatedResponse<Produto>;

  constructor(
            private produtoService: ProdutoService, 
            private confirmationService: ConfirmationService,
            private dialogService: DialogService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      'nome': new FormControl(this.produto.nome, []),
      'descricao': new FormControl(this.produto.descricao, []),
    });

    this.fetchProdutos();
    this.fetchCountProdutos();
  }

  onSubmit() {
    if(this.produto) this.fetchProdutos();
  }

  onPage(event) {
    this.page = Math.floor(event.first / event.rows);
    this.fetchProdutos();
    this.loading = false;
  }

  onSort(event) {
    console.log(event);
    return this.produtos.sort((a, b) => {
      return a[event.field] > b[event.field]
        ? 1 * event.order
        : -1 * event.order;
    });
  }

  deleteProduto(id: string): void {
    console.log(`deleteProduto: ${id}`);
    
    this.confirmationService.confirm({
        message: 'Tem certeza que deseja excluir o produto ?',
        accept: () => {
          this.produtoService
            .deleteProduto(id).subscribe(
              (res) => { 
                this.fetchProdutos(); 
                this.error = null; 
              },
              (error) => {
                console.log(error);
                this.error = error;
              }
            );
        }
      });
  
      console.log('deleteProduto: fim');
  }

  editProduto(id: string) {
    const ref = this.dialogService.open(ProdutoEditComponent, {
      data: { id },
      header: 'Editar Produto',
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
    });
    ref.onClose.subscribe((produto: Produto) => {
      if (produto) {
        this.fetchProdutos();
        this.fetchCountProdutos();
      }
    });
  }

  fetchCountProdutos(): void {
    this.produtoService.fetchCountProdutos(this.produto).subscribe({
      next: (count) => (this.total = count),
      error: (error) => {
        console.log(error);
        this.error = error;
      },
    });
  }

  fetchProdutos(): void {
    this.loading = true;
    this.produtoService
      .fetchProdutosByExample(this.page, this.rows, this.produto)
      .subscribe({
        next: (response) => {
          this.paginatedResponse = response;
          this.produtos = response.content;
        },
        error: (error) => {
          console.log(error);
          this.error = error;
          this.loading = false;
        },
        complete: () => {
          try {
            this.loading = false;

            if (this.paginatedResponse?.content) {
              this.produtos = [...this.paginatedResponse.content];
              this.total = this.paginatedResponse.totalElements;
            } else {
              this.total = 0;
            }
          } catch (error) {
            this.total = 0;
          }
        },
      });
  }

  isUnexpectedError = () => {
    console.log('isUnexpectedError {}', this.error);
    return this.error && this.error.error.type !== undefined;
  }

  isBusinessError = () => {
    console.log('isBusinessError {}', this.error);
    return this.error && this.error.error.type === undefined;
  }
}
