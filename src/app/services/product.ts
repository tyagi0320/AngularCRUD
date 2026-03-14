import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductInterface } from '../components/models/product';
import { LOCAL_STORAGE } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private http=inject(HttpClient);
  private localStorage=inject(LOCAL_STORAGE)
  private ldata:any=this.localStorage?.getItem('mycart')
  public cartSubject=new BehaviorSubject<any>(this.localStorage?.getItem('mycart')!=undefined?JSON.parse(this.ldata):[])
  private API_URL="http://localhost:3000/products";
  getProducts():Observable<ProductInterface[]>{
    return this.http.get<ProductInterface[]>(this.API_URL)
  }
  addProduct(data:ProductInterface):Observable<ProductInterface[]>{
    return this.http.post<ProductInterface[]>(this.API_URL,data)
  }
  getProductById(id:any):Observable<ProductInterface>{
    return this.http.get<ProductInterface>(`${this.API_URL}/${id}`)
  }
  updateProduct(id:any,data:ProductInterface){
    return this.http.put<ProductInterface>(`${this.API_URL}/${id}`,data);
  }
  deleteProduct(id:any):Observable<void>{
    return this.http.delete<void>(`${this.API_URL}/${id}`)
  }
  addCartSubject(data:any){
    this.cartSubject.next(data);
  }
  isAdmin(){
  return false;
}
}
