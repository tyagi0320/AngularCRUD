import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { LOCAL_STORAGE } from '../../app.config';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../services/product';

@Component({
  selector: 'app-productdetails',
  imports: [],
  templateUrl: './productdetails.html',
  styleUrl: './productdetails.css',
})
export class Productdetails implements OnInit{
  private localstorage=inject(LOCAL_STORAGE);
  prodData:any={};
  private ar=inject(ActivatedRoute)
  private product_service=inject(Product)
  private cdr=inject(ChangeDetectorRef);

  ngOnInit(): void {
    let id=this.ar.snapshot.paramMap.get('id');
    this.product_service.getProductById(id).subscribe({
      next:(data:any)=>{
        console.log(data)
        this.prodData=data;
        this.cdr.detectChanges();
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }
addCart(pdata:any){
  if(this.localstorage?.getItem("mycart")!=undefined){
    let localData:any = localStorage.getItem("mycart");
    let prodata = JSON.parse(localData)
    let status = false;

    prodata.forEach((pro:any, ind:number)=>{
      if(pro.id == pdata.id){
        pro.pquantity += 1;
        status = true;
      }
    })

    if(status){
      localStorage.setItem("mycart", JSON.stringify(prodata));
      this.product_service.addCartSubject(prodata);
      alert("Product Quantity update successfully")
    }
    else{
      let data:any = {...pdata, 'pquantity':'1'}
      prodata.push(data)
      localStorage.setItem("mycart", JSON.stringify(prodata));
      this.product_service.addCartSubject(prodata);
      alert("Product Addtocart successfully")
    }
  }
  else{
    let arr:any[] = [];
    let data:any = {...pdata, 'pquantity':'1'}
    arr.push(data)
    localStorage.setItem("mycart", JSON.stringify(arr));
    alert("Product Addtocart successfully")
  }
}

hasUnsavedChanges(){
  return true;
}
}
