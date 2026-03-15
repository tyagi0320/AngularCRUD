"//Files not to be used:
1.styles.css in src
2.server.ts in src
3.main.ts in src
4.main.server.ts in src
5.indext.html in src
6.app.config.server.ts in app
7.app.css in app
8.app.routes.server.ts in app
9.app.spec.ts in app
------------------------------------------------------------------------------------------------------------------------------------------
//Note: {CHECKLIST: 1,2,3,}
1)Earlier we used to use *ngIf , *ngFor, *ngSwitch but now we have @if , @for, @switch
2)Component calling
3)Data binding 
    -One way data binding{}:used display data from {component to view(html)} or {view(html) to component}
    e.g.: .ts=>
           title:string="Hello angular 21"
          .html
          <h2>{{title}}</h2>
    -Property binding[]:sets DOM property to value of component {component to view}
    e.g.: <img [src]="imageurl">
    -Event binding():response to user actions like clicking,keypressing by executing method in component {view to component}
    e.g. <button (click)="onButtonClick()">ClickMe</button>
    -Two way data binding:synchronising data in both directions: changes in component updates view and changes in view updates component simultaneously.
    e.g. used in search bars, forms
    *we use "ngModel" directive for two way data binding with form input elements {especially in template-driven forms}, "ngModel" combines property binding and event binding syntax [()] {also reffered as banana-in-a-box syntax}
    *To use "ngModel" we need to first import and load "FormsModule"
4)Routing and Child Routing(Nested Routing)
5)Angular Lifecycle Hooks and their uses:
     -ngOnInit
     -ngOnChanges
     -ngAfterViewInit
     -ngOnDestroy
6)HTTP Client (Network calling)- used for consuming API or backend services
7)Services in angular
8)Form Handling in Angular
     -Template driven forms
     -Reactive forms
9)Communication between components
     -Parent2child,child2parent,sibling components,unrelated components,direct access,view child
10)LocalStorage
11)State management:
     -Promises vs observable
     -Rxjs operators like map(),filter()
13)Angular signals
14)Angular gaurds    
     -canActivate
     -canDeactivate
     -canActivateChild
     -canMatch
     -Resolve
15)http interceptor     
------------------------------------------------------------------------------------------------------------------------------------------
//Starting with CRUD APP
1. 
-ng new myapp1
-enable SSR -> yes
2. 
Add bootstrap 5 style:
-run npm install bootstrap 
-Add following in angular.json:
 "styles": [
              "src/styles.css",
              "node_modules/bootstrap/dist/css/bootstrap.min.css"
            ],
            "scripts":[
              "node_modules/bootstrap/dist/js/bootstrap.bundle.js"
            ]

3.
Now create new components using command "ng g c components/component_name"
-create addproduct,editproduct,home,navbar,notfound,productdetails components

4. 
-Go to app.html in app and add following:

<main>
<app-navbar></app-navbar>
<section class="container">
<router-outlet></router-outlet>
</section>
</main>

-This app.html defines main layout structure of our application.Hence, we add the components we want to use for our app and then make sure 
to update our app.ts file to ensure that app.ts component is able to use the components mentioned in app.html {In Angular 17+ / Angular 21 (standalone architecture), every component must be explicitly imported into the component that uses it.}
-We will be using "<router-outlet></router-outlet>" which is the most important Angular routing directive.
-app.html is the root template that wraps all the pages

5.Ensure you have following imported necessary components in your app.ts:

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('myapp1');
}

6.
-Now write the Navbar code using bootstrap in navbar.html
-Make sure you use routerLink instead of href
-Make sure you import RouterLink in navbar.ts
-Then go to app.routes.ts and add:

import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Addproduct } from './components/addproduct/addproduct';

export const routes: Routes = [
    {path:'',component:Home},
    {path:'addproduct',component:Addproduct}
];

-This completes your routing setup

7.
-In order to list your products now , create a new service using "ng g s services/service_name"
-ng g s services/products

8.
-To render products from your server firstly create a model(typescript data-structure) to let typescript know what product look like and let typescript ensure consistency in app while calling product anywhere
    -So create models/product.ts
    -Here make sure you export the product data you want to use.{i.e.- export the product interface}
-Now setup communication(service) to talk to your json-server
    -so create ng g s services/product.ts
    -now inject httpclient{this helps you communicate with json-server/external-apis}, make sure to add provideHttpClient() in your app.config.ts
    -now create a method getProducts() that returns this.http.get<ProductInterface[]>
-Now connect the component (home.ts file)
    -Define a variable prodData:any {WE WILL USE IT IN HTML WITH FOR LOOP}
    -export home using lifecycle hook ngOnInit: this lifecycle hook ensures ngOnInit() methods runs after Angular initialises component properties allow secrue data fetching,input property usage and setup immediately after component is rendered.
    export class Home implements OnInit{

    }
    -Bring your product service using inject(Product): private product_service=inject(Product)
    -you can add a ChangeDetectorRef to help Angular handle UI updates automatically: private cdr=inject(ChangeDetectorRef)
    -Inside ngOnInit call this.product_service.getProduts.subscribe():
    ngOnInit(): void{
      this.product_service.getProducts().subscribe({
        next:(data:any)=>{
          console.log(data)
          this.prodData=data
          this.cdr.detectChanges()
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
    -Make sure you have defined your getProducts in the Product.ts file of services folder:
    import { HttpClient } from '@angular/common/http';
    import { inject, Injectable } from '@angular/core';
    import { Observable } from 'rxjs';
    import { ProductInterface } from '../components/models/product';

    @Injectable({
      providedIn: 'root',
    })
    export class ProductTs {
      private http=inject(HttpClient);
      private API_URL="http://localhost:3000/products";
      getProducts():Observable<ProductInterface[]>{
        return this.http.get<ProductInterface[]>(this.API_URL)
      }
    }
    -Now its time you write the html (home.html):
    <h2>Latest Products</h2>
    <div class="row">
    @for(prod of prodData; track prod.id){
      <div class="col-md-4">
      <div class="card" style="width: 18 rem;">
      <div class=card-body>
      <h5 class="card-title">Name:{{prod.name}}</h5>
      <p class="card-text">Price: Rs.{{prod.price}}</p>
      <p class="card-text">Qty: {{prod.quantity}}</p>
      </div>
      </div>
      </div>
    }
    </div>

9. 
To add products to your server we need to create a new component called addproduct.For adding product we will use forms and particulary reactive-forms.
We will also make sure to use form validations too.
{
  Formbuilder-helper service to make form easily, reduces boiler code
  FormControl- manages state and input of single input field (*not needed if using Formbuilder)
  FormGroup-
  .
  .
  etc
}
-Go to addproduct.ts and ensure to import reactiveFormsModule:


10.
Now let us make edit product page. (*create similar logic and steps for addproduct thing as well)
-First create a service to get your products by id and create a service to update your products:
    1.getProductById(id:any):Observable<ProductInterface[]>{
      return this.http.get<ProductInterface[]>(`${this.API_URL}/${id}`)
      }
    2.updateProduct(id:any,data:ProductInterface){
      return this.http.put<ProductInterface>(`${this.API_URL}/${id}`,data);
      }
-Make sure to add this route in your app.routes.ts:
    {path:'editproduct/:id',component:Editproduct},
-Then make the route for editproduct page on the button of your card.
  -<a [RouterLink]="['/editproduct',prod.id]" class="btn btn-primary">Edit Product</a>
-Then make editproduct.ts page
      -Here create a new FormGroup
      -then use ngOnInit
      -then create a updateData function which will be used in the form of editproduct.html
      (*see proper workflow and logic for above 3 points)
-Now make editproduct.html page

11.
Now let us make delete product page
-First create a service to delete product by id
       deleteProduct(id:any):Observable<void>{
    return this.http.delete<void>(`${this.API_URL}/${id}`)
  }
-Then update your Home.ts with following deleteprod function inside export class Home:
       deleteprod(id:any){
    if(window.confirm("Do you want to delete?")){
      this.product_service.deleteProduct(id).subscribe({
        next:(data:any)=>{
          this.deleteprod=this.prodData.filter((prod:any)=> prod.id!=id);
          alert("Product Deleted!")
          this.cdr.detectChanges();
        },
        error:(err:any)=>{
          console.log(err)
        }
      })
    }
  }
-Then add the delete button in Home.html file
    <button class="btn btn-danger" (click)="deleteprod(prod.id)">Delete</button>

12.
Now let us make productdetails functionality.
-We want to store product data locally.But localStorage is not an Angular service,it is a browser global object.So Angular cannot inject it directly.Therefore we create a custom injection token.
So make changes in app.config.ts file:
export const LOCAL_STORAGE=new InjectionToken<Storage|null>('LOCAL_STORAGE')

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(),
    {
      provide: LOCAL_STORAGE,
      useFactory:()=> (isPlatformBrowser(inject(PLATFORM_ID))? window.localStorage : null)

    }
  ]
};
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
CONCEPT:
### Angular Local Storage Setup — Concise Notes

**1. Problem**
`localStorage` is a browser global object, not an Angular service. Angular Dependency Injection (DI) cannot inject it directly.

---

**2. Solution**
Create a custom **InjectionToken** so Angular can provide `localStorage` through DI.

```
export const LOCAL_STORAGE = new InjectionToken<Storage | null>('LOCAL_STORAGE');
```

This token represents the value that will later map to `window.localStorage`.

---

**3. Provider Configuration**

In `app.config.ts`, a provider is registered:

```
{
  provide: LOCAL_STORAGE,
  useFactory: () => (
    isPlatformBrowser(inject(PLATFORM_ID))
      ? window.localStorage
      : null
  )
}
```

Meaning:
When Angular sees `LOCAL_STORAGE`, it runs the factory function to determine the value.

---

**4. Factory Logic**

```
If platform = browser
    return window.localStorage
Else
    return null
```

This prevents errors when running Angular in environments where `window` does not exist (e.g., server-side rendering).

---

**5. PLATFORM_ID**

`PLATFORM_ID` tells Angular where the app is running.

Possible platforms:

* browser
* server

---

**6. isPlatformBrowser()**

This function checks if the current platform is a browser.

```
true  → browser environment
false → server environment
```

---

**7. Why This Check Is Important**

If Angular runs on a server, `window.localStorage` does not exist.
Using this check avoids errors like:

```
ReferenceError: window is not defined
```

---

**8. Using Local Storage in Components/Services**

Inject it like this:

```
private storage = inject(LOCAL_STORAGE);
```

Save data:

```
this.storage?.setItem("products", JSON.stringify(data));
```

Read data:

```
const products = this.storage?.getItem("products");
```

---

**9. Benefits**

* Works with Angular Dependency Injection
* Safe for Server-Side Rendering (SSR)
* Easy to mock during testing
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-Now create export productdetails.ts logic using implements ngOnInit
-Then finally create productdetails.html page
-Then update your home.html:
    <a [routerLink]="['/productdetails',prod.id]" class="btn btn-primary">View More</a>

13.
Now let us implement add to cart functionality where our goal is to dynamically update cart item on navbar

-update product.ts with:
  private localStorage=inject(LOCAL_STORAGE)
  private ldata:any=this.localStorage?.getItem('mycart')
  public cartSubjects=new BehaviorSubject<any>(this.localStorage?.getItem('mycart')!=undefined?JSON.parse(this.ldata):[])
-Create a service called:
addCartSubject(data:any){
    this.addCartSubject.next(data);
  }
-update productdetails.ts with:
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
-Update your Navbar.ts with:
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
-Update Navbar.html with:
  <li class="nav-item">
          <a class="nav-link" routerLink="/addproduct">Cart @if(count>0){({{count}})}</a>
  </li>
-Finally add button on productdetails.html:
    <button class="btn btn-secondary" (click)="addCart(prodData)">Add to Cart</button>

14. 
Now let's apply gaurds on our routes.
1. Firstly we'll use "canActivate gaurd" to allow authorised user access to add and edit products.
step-1: ng g g guards/canActivate
step-2: select canActivate option
step-3: update activate-gaurd.ts:
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
step-4: create isAdmin() or similar logic in product.ts service:
  isAdmin(){
  return false;
}
step-5: update app.routes.ts:
{path:'addproduct',component:Addproduct,canActivate:[activateGuard]},
{path:'editproduct/:id',component:Editproduct,canActivate:[activateGuard]},


2. Now let us use "canDeactivate gaurd" to ensure user have saved their changes while adding items to cart
step-1: ng g g guards/deactivate
step-2: select canDeactivate option
step-3: update deactivate-gaurd.ts:
export const deactivateGuard: CanDeactivateFn<Productdetails> = (
  component,
  currentRoute,
  currentState,
  nextState,
) => {
  if(component.hasUnsavedChanges()){
    return confirm("You have unsaved changes. Do you want to leave?");
  }
  return true;
};
step-4: create hasUnsavedChanges() or similar logic in productdetails.ts:
hasUnsavedChanges(){
  return true;
}
step-5: update app.routes.ts:
{path:'productdetails/:id',component:Productdetails,canDeactivate:[deactivateGuard]},
"
