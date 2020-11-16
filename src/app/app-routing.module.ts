import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { CartComponent } from './components/home/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/home/shop/shop.component';
import { WishlistComponent } from './components/home/wishlist/wishlist.component';
import { LoginComponent } from './components/login/login.component';
// import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import { ProductComponent } from './components/products/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { UserManagementComponent } from './components/users/user-management/user-management.component';
import { AuthGuard } from './utility/guard/auth.guard';

const routes: Routes = [
{path:'', redirectTo: 'register', pathMatch:'full'},
{path:'login', component: LoginComponent},
{path:'register', component: RegisterComponent},
{path:'home', component: HomeComponent, 
children:[
  {path:'', redirectTo: 'home', pathMatch:'full'},
  {path: 'cart', component:CartComponent},
  {path: 'wishlist', component:WishlistComponent},
  {path: 'shop', component:ShopComponent}
],
canActivate: [AuthGuard]
},
{path:'adminHome', component: AdminhomeComponent,
children:[
  {path:'', redirectTo: 'adminHome', pathMatch:'full'},
  {path:'products', component: ProductComponent},
  {path:'users', component: UserManagementComponent}
],
canActivate: [AuthGuard]
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
