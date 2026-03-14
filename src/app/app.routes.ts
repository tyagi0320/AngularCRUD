import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Addproduct } from './components/addproduct/addproduct';
import { API } from './components/api/api';
import { Contact } from './components/contact/contact';
import { Productdetails } from './components/productdetails/productdetails';
import { Editproduct } from './components/editproduct/editproduct';
import { Category } from './components/category/category';
import { activateGuard } from './gaurds/activate-guard';
import { deactivateGuard } from './gaurds/deactivate-guard';

export const routes: Routes = [
    {path:'',component:Home},
    {path:'addproduct',component:Addproduct,canActivate:[activateGuard]},
    {path:'editproduct/:id',component:Editproduct,canActivate:[activateGuard]},
    {path:'productdetails/:id',component:Productdetails,canDeactivate:[deactivateGuard]},
    {path:'api',component:API},
    {path:'contact',component:Contact},
    {path:'category',component:Category}
];
