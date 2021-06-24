import { ProductService } from './../product-create/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders = [];
  totalPrice = 0;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    setTimeout(() => {
      this.productService.viewOrder()
        .subscribe(result => {
          for (var i = 0; i < result.value.length; i++) {
            this.orders.push(result.value[i].products);
            // for (var i = 0; i < this.orders.length; i++) {
            //   this.totalPrice += this.orders[i].product.price * this.orders[i].quantity;
            // }
          }
          
          console.log(this.orders);
        })
    }, 500);
  }

}
