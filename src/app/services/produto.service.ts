import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../model/Produto.model';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResponse } from '../model/paginatedResponse';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private readonly REST_API_PRODUTO = environment.REST_API_PRODUTO;
  private readonly PRODUCT_SERVER_ERROR =
    'An error occurred with Product API. Please try again later.';

  constructor(private http: HttpClient) {}

  fetchProdutos() {
    return this.http.get<Produto[]>(this.REST_API_PRODUTO).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error(this.PRODUCT_SERVER_ERROR));
      })
    );
  }

  fetchProdutosByExample(page: number = 0, size: number = 0, produto: Produto) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.post<PaginatedResponse<Produto>>(
      this.REST_API_PRODUTO + '/example',
      produto,
      { params: params }
    );
  }

  fetchCountProdutos(
    produto: Produto = {
      nome: '',
      descricao: '',
      preco: null,
      imageUrl: null
    }
  ): Observable<number> {
    return this.http.post<number>(`${this.REST_API_PRODUTO}/total`, produto);
  }

  saveProduto(produto: Produto) {
    return this.http.post(this.REST_API_PRODUTO, produto).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error(this.PRODUCT_SERVER_ERROR));
      })
    );
  }

  deleteProduto(id: string) {
    return this.http.delete(this.REST_API_PRODUTO + `/${id}`).pipe();
  }
}
