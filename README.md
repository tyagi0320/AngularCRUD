# Angular 21 CRUD Application – Learning Notes

---

## Files Not to Be Used

```
1. styles.css in src
2. server.ts in src
3. main.ts in src
4. main.server.ts in src
5. index.html in src
6. app.config.server.ts in app
7. app.css in app
8. app.routes.server.ts in app
9. app.spec.ts in app
```

---

# Angular Concepts Checklist

```
CHECKLIST: 1,2,3...
```

---

## 1. Angular Structural Directives

Earlier Angular used:

```
*ngIf
*ngFor
*ngSwitch
```

Now Angular 17+ / Angular 21 uses:

```
@if
@for
@switch
```

---

## 2. Component Calling

Angular applications are built using **components**.  
Components are reusable UI blocks used across the application.

---

## 3. Data Binding

Data binding connects **component logic (TypeScript)** with **view (HTML)**.

---

### One Way Data Binding

Used to display data between:

```
Component → View
View → Component
```

Example:

#### component.ts

```ts
title: string = "Hello Angular 21"
```

#### component.html

```html
<h2>{{title}}</h2>
```

---

### Property Binding

Used to set **DOM property values** from the component.

```
Component → View
```

Example:

```html
<img [src]="imageUrl">
```

---

### Event Binding

Used to respond to user actions like clicking or keypressing.

```
View → Component
```

Example:

```html
<button (click)="onButtonClick()">Click Me</button>
```

---

### Two Way Data Binding

Synchronizes data in **both directions**.

```
Component ↔ View
```

Example use cases:

- Search bars
- Forms
- Input fields

Angular uses **ngModel directive**.

```
[(ngModel)]
```

This syntax is known as:

```
Banana in a box syntax
```

Example:

```html
<input [(ngModel)]="username">
```

To use `ngModel`, import:

```ts
import { FormsModule } from '@angular/forms'
```

---

# Angular CRUD Application Setup

---

## Step 1 – Create Angular App

```
ng new myapp1
```

Enable **SSR (Server Side Rendering)** → `Yes`

---

## Step 2 – Install Bootstrap

```
npm install bootstrap
```

Add to **angular.json**

```json
"styles": [
  "src/styles.css",
  "node_modules/bootstrap/dist/css/bootstrap.min.css"
],
"scripts":[
  "node_modules/bootstrap/dist/js/bootstrap.bundle.js"
]
```

---

## Step 3 – Create Components

```
ng g c components/addproduct
ng g c components/editproduct
ng g c components/home
ng g c components/navbar
ng g c components/notfound
ng g c components/productdetails
```

---

## Step 4 – Application Layout

Edit `app.html`

```html
<main>
  <app-navbar></app-navbar>

  <section class="container">
    <router-outlet></router-outlet>
  </section>

</main>
```

Explanation:

- `app.html` defines the **main layout of the application**
- `<router-outlet>` loads route components dynamically

---

## Step 5 – Update app.ts

```ts
import { Component, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Navbar } from './components/navbar/navbar'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('myapp1')
}
```

---

## Step 6 – Routing Setup

Example `app.routes.ts`

```ts
import { Routes } from '@angular/router'
import { Home } from './components/home/home'
import { Addproduct } from './components/addproduct/addproduct'

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'addproduct', component: Addproduct }
]
```

---

## Step 7 – Create Product Service

```
ng g s services/products
```

Services are used to handle **business logic and API communication**.

---

## Step 8 – Create Product Model

Create:

```
models/product.ts
```

Example:

```ts
export interface ProductInterface {
  id: number
  name: string
  price: number
  quantity: number
}
```

---

## Step 9 – HTTP Client Setup

Example service method:

```ts
getProducts(): Observable<ProductInterface[]> {
  return this.http.get<ProductInterface[]>(this.API_URL)
}
```

---

## Step 10 – Rendering Products

Example `home.html`

```html
<h2>Latest Products</h2>

<div class="row">

@for(prod of prodData; track prod.id){

<div class="col-md-4">

<div class="card" style="width:18rem">

<div class="card-body">

<h5 class="card-title">
Name: {{prod.name}}
</h5>

<p class="card-text">
Price: Rs. {{prod.price}}
</p>

<p class="card-text">
Qty: {{prod.quantity}}
</p>

</div>

</div>

</div>

}

</div>
```

---

# Add Product (Reactive Forms)

Angular provides **Reactive Forms** for structured form handling.

Important classes:

```
FormBuilder
FormControl
FormGroup
Validators
```

---

# Edit Product

Add route:

```ts
{ path: 'editproduct/:id', component: Editproduct }
```

Example service method:

```ts
updateProduct(id:any,data:ProductInterface){
  return this.http.put<ProductInterface>(`${this.API_URL}/${id}`,data)
}
```

---

# Delete Product

Service method:

```ts
deleteProduct(id:any):Observable<void>{
  return this.http.delete<void>(`${this.API_URL}/${id}`)
}
```

Example button:

```html
<button class="btn btn-danger" (click)="deleteprod(prod.id)">
Delete
</button>
```

---

# Product Details

Example route:

```ts
{ path: 'productdetails/:id', component: Productdetails }
```

Example button:

```html
<a [routerLink]="['/productdetails',prod.id]" class="btn btn-primary">
View More
</a>
```

---

# Angular Local Storage Setup

## Problem

`localStorage` is a browser global object, not an Angular service.

Angular Dependency Injection cannot inject it directly.

---

## Solution

Create **InjectionToken**

```ts
export const LOCAL_STORAGE = new InjectionToken<Storage | null>('LOCAL_STORAGE')
```

---

## Provider Configuration

```ts
{
  provide: LOCAL_STORAGE,
  useFactory: () =>
    isPlatformBrowser(inject(PLATFORM_ID))
      ? window.localStorage
      : null
}
```

---

## Using Local Storage

Inject it:

```ts
private storage = inject(LOCAL_STORAGE)
```

Save data:

```ts
this.storage?.setItem("products", JSON.stringify(data))
```

Read data:

```ts
const products = this.storage?.getItem("products")
```

---

# Add To Cart Feature

Uses **BehaviorSubject**

```ts
public cartSubject = new BehaviorSubject<any[]>([])
```

Used to dynamically update the **cart count in navbar**.

---

# Angular Guards

Guards control access to routes.

### Types

```
canActivate
canDeactivate
canActivateChild
canMatch
resolve
```

---

## Example CanActivate Guard

```
ng g g guards/canActivate
```

Example:

```ts
export const activateGuard: CanActivateFn = (route, state) => {

  let product_service = inject(Product)

  if(product_service.isAdmin()){
    return true
  }
  else{
    alert("You are not authorized")
    return false
  }

}
```

---

# CanDeactivate Guard

Used to warn user before leaving page.

Example:

```ts
export const deactivateGuard: CanDeactivateFn<Productdetails> =
(component) => {

  if(component.hasUnsavedChanges()){
    return confirm("You have unsaved changes. Leave page?")
  }

  return true

}
```

---

# Topics Covered

- Angular 21 syntax
- Routing and nested routing
- Data binding
- Reactive forms
- HTTP client
- Services
- State management
- Local storage
- RxJS
- Guards
- CRUD operations
- Add to cart feature

---

# Tech Stack

```
Angular 21
TypeScript
Bootstrap 5
RxJS
JSON Server
```

---

# Author

Harshit Tyagi
