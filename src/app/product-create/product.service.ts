import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import  { map, subscribeOn } from "rxjs/operators";
import { Subject } from 'rxjs';
import { stringify } from 'querystring';

@Injectable({ providedIn: 'root' })
export class ProductService {
    
    private products:Product[] = [];
    private cart = [];
    private cartProduct = 0;
    private productsUpdated = new Subject<{ products: Product[]; productCount: number }>();
    private cartUpdated = new Subject<{ cart: any[] ; cartCount: number }>();
    private productsTotalPrice = new Subject<{ TotalPrice: number }>();
    constructor(private http: HttpClient, private router: Router) { }

    createProduct(title, price, description, imageUrl, category) {
        const product = {
            title: title,
            price: price,
            description: description,
            imageUrl: imageUrl,
            category: category,
        }
        this.http.post("http://localhost:3000/api/product/create", product)
            .subscribe(response => {
                console.log(response);
            }, error => {
                console.log(error);
            })

    }

    fetchProduct() {
        this.http.get<{ message: string; products: any; maxProducts: number }>("http://localhost:3000/api/product/")
            .pipe(
                map(postData => {
                    return {
                        products: postData.products.map(product => {
                            return {
                                title: product.title,
                                description: product.description,
                                id: product._id,
                                imageUrl: product.imageUrl,
                                category: product.category,
                                price: product.price
                            };
                        }),
                        maxProducts: postData.maxProducts
                    };
                })
            )
            .subscribe(transformedProductData => {
                console.log(transformedProductData);
                this.products = transformedProductData.products;
                this.productsUpdated.next({
                    products: [...this.products],
                    productCount: transformedProductData.maxProducts
                });
            }, error => {
                console.log(error);
            })
    }

    getProductUpdateListener(){
        return this.productsUpdated.asObservable();
    }

    getCartUpdateListener(){
        return this.cartUpdated.asObservable();
    }

    fetchCategory(category){
        this.http.get<{ message: string; products: any; maxProducts: number }>("http://localhost:3000/api/product/category",{ params:{'category': category}})
        .pipe(
            map(postData => {
                return {
                    products: postData.products.map(product => {
                        return {
                            title: product.title,
                            description: product.description,
                            id: product._id,
                            imageUrl: product.imageUrl,
                            category: product.category,
                            price: product.price
                        };
                    }),
                    maxProducts: postData.maxProducts
                };
            })
        )
        .subscribe(transformedProductData=>{
            console.log(transformedProductData);    
            this.products = transformedProductData.products;
            this.productsUpdated.next({
                products: [...this.products],
                productCount: transformedProductData.maxProducts,
            });
        },error=>{
            console.log(error);
        })
    }

    addToCart(id) {
        this.http.get("http://localhost:3000/api/product/add-cart",{ params:{'id': localStorage.getItem('userId'),'pid': id}})
            .subscribe(val=>{
                console.log(val);
            })
    }

    getCart(id){
    return this.http.get<{message: string, products: any[]}> ("http://localhost:3000/api/product/view-cart",{params:{'id':id}});
    }


    increament(id){
        this.http.get("http://localhost:3000/api/product/increament",{params:{'pid':id,'id': localStorage.getItem('userId')}})
        .subscribe(val=>{
            console.log(val);
        })
    }

    decreament(id){
        this.http.get("http://localhost:3000/api/product/decreament",{params:{'pid':id,'id': localStorage.getItem('userId')}})
        .subscribe(val=>{
            console.log(val);
        })
    }

    deleteProduct(pid){
        const user = {
            id: localStorage.getItem('userId'),
            pid: pid,
        }
        this.http.post<{product:{cart:any}}>("http://localhost:3000/api/product/RemoveCart",user)
            .subscribe(result=>{
                console.log(result);
                this.cartUpdated.next({
                    cart: result.product.cart.items,
                    cartCount: result.product.cart.items.length,
                })
            })
    }
    getOrder(){
        return this.http.get('http://localhost:3000/api/order/save',{params:{'id': localStorage.getItem('userId')}})
    }

    viewOrder(){
        return this.http.get<{message:String,value:any}>('http://localhost:3000/api/order/view',{params: {'id': localStorage.getItem('userId')}})
    } 
}