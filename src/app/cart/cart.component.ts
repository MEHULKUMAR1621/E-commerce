import { AuthService } from './../auth/auth.service';
import { ProductService } from './../product-create/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,OnDestroy {
  private carts = []
  totalcart:number=0
  private productSub: Subscription;
  mySubscription: any;
  constructor(private router: Router, private productService: ProductService, private authService: AuthService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

    this.mySubscription = this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
   }
  

  ngOnInit() {
    setTimeout(()=>{
      const userId = localStorage.getItem('userId');
      this.productSub = this.productService.getCart(userId).subscribe(val=>{
        console.log(val);
        this.totalcart = val.products.length;
        for(var i=0;i<val.products.length;i++){
          this.carts.push(val.products[i]);
        }
      })
    },500)
  }

  onSubmit() {
    this.productService.getOrder().subscribe(val=>{
      console.log(val);
    })
    this.authService.clearCart();
    this.router.navigate(['/order']);
  }

  increamentQty(id,i){
    this.productService.increament(id);
    this.carts[i].quantity+=1;
  }

  decreamentQty(id,i){
    if(this.carts[i].quantity > 1){
      this.productService.decreament(id);
      this.carts[i].quantity-=1; 
    }
    else if(this.carts[i].quantity == 1 ){
      this.productService.deleteProduct(id);
    }
  }

  onDelete(id){
    this.productService.deleteProduct(id);
    this.productSub = this.productService.getCartUpdateListener()
    .subscribe(value=>{
      this.carts = value.cart;
      this.totalcart = value.cartCount;
    })
  }

  onClear(){
    this.authService.clearCart();
  }

  onPlace(){
    let totalAmount = 0;
    this.productService.getOrder();
    // this.productService.getProductTotalPrice()
    //   .subscribe(value=>{
    //     totalAmount = value.TotalPrice;
    //   })
    // this.onClear();
    // this.router.navigate(['order'])
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
    this.productSub.unsubscribe();
  }
}
