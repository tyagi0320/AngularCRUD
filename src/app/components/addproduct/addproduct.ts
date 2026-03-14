import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../services/product';

@Component({
  selector: 'app-addproduct',
  imports: [ReactiveFormsModule],
  templateUrl: './addproduct.html',
  styleUrl: './addproduct.css',
})
export class Addproduct {
  private product_service=inject(Product)
  private router=inject(Router)

  prodForm= new FormGroup({
    name: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]),
    price: new FormControl('',[Validators.required, Validators.pattern('^[0-9]+$')]),
    quantity: new FormControl('',[Validators.required, Validators.pattern('^[0-9]+$')]),
  })

  get fg(){
    return this.prodForm.controls
  }

  addData(){
    let formData:any=this.prodForm.value;
    this.product_service.addProduct(formData).subscribe({
      next:(data:any)=>{
        alert("Prodcut added");
        //redirect to home
        this.router.navigateByUrl("/")
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }


}
