import { Product } from './../product-create/product.model';
import { ProductService } from './../product-create/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  
  private productsSub: Subscription;
  mySubscription :any;
  products : Product[] = [];
  count:number =-1;
  totalProducts :number;
  constructor(private productService: ProductService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    })
   }

  ngOnInit() {
    this.productService.fetchProduct();
    this.productsSub = this.productService
      .getProductUpdateListener()
      .subscribe(productData => {
        this.products = productData.products;
        this.totalProducts = productData.productCount;
        console.log(this.products);
      })  
  }

  onCategory(category){
    this.productService.fetchCategory(category);
    this.productsSub = this.productService
      .getProductUpdateListener()
      .subscribe(productData => {
        this.products = productData.products;
        this.totalProducts = productData.productCount;
      })
  }

  onAll(){
    this.ngOnInit();
  }

  addCart(id){
    console.log(id);
    this.productService.addToCart(id);
    this.router.navigate(['/cart']);
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
    this.mySubscription.unsubscribe();
  }
}
