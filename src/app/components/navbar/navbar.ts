import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LOCAL_STORAGE } from '../../app.config';
import { Product } from '../../services/product';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit{
  private localStorage=inject(LOCAL_STORAGE);
  count:any=0;
  private product_service=inject(Product)

  ngOnInit(): void {
    this.product_service.cartSubject.subscribe((cartData:any)=>{
      this.count=cartData.length
    })
  }
}
