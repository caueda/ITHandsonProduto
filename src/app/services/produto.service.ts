import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Produto } from "../model/Produto.model";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({providedIn: 'root'})
export class ProdutoService {

    private readonly REST_API_PRODUTO = environment.REST_API_PRODUTO;
    private readonly PRODUCT_SERVER_ERROR = 'An error occurred with Product API. Please try again later.';

    constructor(private http: HttpClient) {}

    fetchProdutos() {
        return this.http.get<Produto[]>(this.REST_API_PRODUTO)
          .pipe(
            catchError((error) => {
              console.error(error);                 
              return throwError(() => new Error(this.PRODUCT_SERVER_ERROR)); 
            })
          );
      }

    saveProduto(produto: Produto) {      
        return this.http.post(this.REST_API_PRODUTO, produto)
        .pipe(
            catchError((error) => {
                console.error(error);
                return throwError(() => new Error(this.PRODUCT_SERVER_ERROR));
            })
        );
    }
}