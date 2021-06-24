import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private authStatusListener = new Subject<boolean>();
    private isAuthenticated: boolean = false;
    private userId:string = null;

    constructor(private http: HttpClient, private router: Router) { }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getUserId() {
        return this.userId;
    }

    createUser(name: string, phone: string, email: string, password: string) {
        const user = {
            name: name,
            phone: phone,
            email: email,
            password: password,
        }
        return this.http.post<{ message: string, result: { name: string, phone: string, email: string, password: string } }>
        ("http://localhost:3000/api/user/signup", user)
            .subscribe(response => {
                console.log(response);
                this.router.navigate(['/login']);
            }, error => {
                this.authStatusListener.next(false);
            })
    }

    login(email: string, password: string) {
        const authData = {
            email: email,
            password: password,
        };
        this.http.post<{ message: string, userId: string }>
        ("http://localhost:3000/api/user/login", authData)
            .subscribe(response => {
                this.router.navigate(['/order']);
                console.log(response);
                this.userId = response.userId;
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                this.saveAuthData(response.userId);
            }, error => {
                console.log(error);
                this.router.navigate(['/login']);
                this.authStatusListener.next(false);
            })
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if(!authInformation){
            return;
        }
        this.userId = authInformation.userId;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
    }

    logout(){
        this.userId = null;
        this.isAuthenticated = null;
        this.clearCart();
        this.clearAuthData();
        this.authStatusListener.next(false);
    }

    private saveAuthData(userId: string){
        localStorage.setItem('userId',userId);
    }

    private clearAuthData(){
        localStorage.removeItem("userId");
    }
    
    private getAuthData(){
        const userId = localStorage.getItem("userId");
        if(!userId){
          return;
        } 
        return{
          userId: userId,
        }
    }

    clearCart(){
        const user = {
            id: localStorage.getItem('userId')
        } 
        this.http.post("http://localhost:3000/api/user/clearCart",user)
            .subscribe(result=>{
                console.log(result);
            })
    }

    
}