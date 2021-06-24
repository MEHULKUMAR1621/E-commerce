import { ProductsComponent } from './products/products.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrderComponent } from './order/order.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    { path: "create", component: ProductCreateComponent , canActivate: [AuthGuard] },
    { path: "order", component: OrderComponent, canActivate: [AuthGuard] },
    { path: "cart", component: CartComponent , canActivate: [AuthGuard]},
    { path: "" , component: ProductsComponent},

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {}