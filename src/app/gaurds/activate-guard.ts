import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Product } from '../services/product';

export const activateGuard: CanActivateFn = (route, state) => {
  let product_service=inject(Product)
  if(product_service.isAdmin()){
    return true;
  }
  else{
    alert("You are not authorized")
    return false;
  }
};
