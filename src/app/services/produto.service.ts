import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Produto } from "../model/Produto.model";

@Injectable({providedIn: 'root'})
export class ProdutoService {

    REST_API_PRODUTO = 'http://localhost:8888/api/v1/produto';

    constructor(private http: HttpClient) {}
    fetchProdutos() {
       return this.http.get<Produto[]>(this.REST_API_PRODUTO);
    }

    saveProduto(produto: Produto) {      
        return this.http.post(this.REST_API_PRODUTO, produto);
    }
}