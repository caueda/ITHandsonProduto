import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Produto } from 'src/app/model/Produto.model';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {

  form: FormGroup;

  @Output() produtoFormEvent = new EventEmitter<any>();
  
  @Input() produto: Produto = {
    nome: '',
    descricao: '',
    preco: null,
    imageUrl: null
  };

  @Input() produtoId: number = null;
  @Input() loading = false;
  @Input() errorResponse = null;
  @Input() mensagem: string;

  @Input() isUnexpectedError: Function;
  @Input() isBusinessError: Function;
  @Input() closeDialog: Function;

  error:any;

  constructor(private router: Router, private produtoService: ProdutoService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'nome': new FormControl(this.produto.nome, [Validators.required, Validators.minLength(3)]),
      'descricao': new FormControl(this.produto.descricao, [Validators.required, Validators.minLength(3)]),
      'preco': new FormControl(this.produto.preco, [Validators.required, Validators.min(0.01)]),
      'imageUrl': new FormControl(this.produto.imageUrl, [Validators.required, Validators.minLength(3)])
    });
  }

  resetForm() {
    this.form.reset();
  }

  createFormControls(produto: Produto) {
    this.form = new FormGroup({
      'nome': new FormControl(produto.nome, [Validators.required, Validators.minLength(3)]),
      'descricao': new FormControl(produto.descricao, [Validators.required, Validators.minLength(3)]),
      'preco': new FormControl(produto.preco, [Validators.required, Validators.min(0.01)]),
      'imageUrl': new FormControl(produto.imageUrl, [Validators.required, Validators.minLength(3)])
    });
  }  

  onSubmit() {
    console.log('ProdutoForm submitted', this.form.value);
    this.produtoFormEvent.emit(this.form.value);
  }
}
