import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(f){
    console.log(f);
    this.authService.login(f.value.email,f.value.password);
  }
}
