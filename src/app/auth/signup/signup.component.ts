import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide:boolean = true;
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  
  onSubmit(f){
    this.authService.createUser(f.value.name,f.value.phone,f.value.email,f.value.password);
  }
}
