import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Product } from '../../services/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  prodData:any
  private product_service=inject(Product);
  private cdr=inject(ChangeDetectorRef);
  ngOnInit(): void {
    this.product_service.getProducts().subscribe({
      next:(data:any)=>{
        console.log(data)
        this.prodData=data
        this.cdr.detectChanges();
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  deleteprod(id:any){
    if(window.confirm("Do you want to delete?")){
      this.product_service.deleteProduct(id).subscribe({
        next:(data:any)=>{
          this.prodData=this.prodData.filter((prod:any)=> prod.id!=id);
          alert("Product Deleted!")
          this.cdr.detectChanges();
        },
        error:(err:any)=>{
          console.log(err)
        }
      })
    }
  }
}
