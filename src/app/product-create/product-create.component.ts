import { ProductService } from './product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  hide: boolean = true;

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  currencyInputChanged(value) {
    var num = value.replace(/[$,]/g, "");
    return Number(num);
  }

  onSubmit(f) {
    this.productService.createProduct(
      f.value.title,
      f.value.price, 
      f.value.description,
      f.value.imageUrl,
      f.value.category );
    f.resetform()
  }
}
