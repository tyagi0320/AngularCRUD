import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../services/product';

@Component({
  selector: 'app-editproduct',
  imports: [ReactiveFormsModule],
  templateUrl: './editproduct.html',
  styleUrl: './editproduct.css',
})
export class Editproduct implements OnInit {

  private ar=inject(ActivatedRoute);
  private product_service=inject(Product);
  private router=inject(Router);

  productId:any;

  prodForm= new FormGroup({
    name: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required),
    quantity: new FormControl('',Validators.required),
  });

  ngOnInit(): void {
    this.productId=this.ar.snapshot.paramMap.get('id');
    this.product_service.getProductById(this.productId).subscribe((data:any)=>{
    this.prodForm.patchValue(data);
      });
  }

  updateData(){
    const formData:any = this.prodForm.value;
    this.product_service.updateProduct(this.productId, formData).subscribe(()=>{
      alert("Product updated successfully!");
      //redirect to home
      this.router.navigateByUrl("/");
    });
  }
}
