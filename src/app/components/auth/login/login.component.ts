import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginInfo } from '../../../models/auth/Login';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink, NgIf, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService, BrowserModule]
})
export class LoginComponent {

  login: LoginInfo = {
    username: '',
    password: ''
  }

  invalidData: boolean = false;
  afterRegistration: boolean = false;

  constructor(private authService: AuthService, private aRoute: ActivatedRoute, private router: Router) {

    this.aRoute.queryParams.subscribe( params => {
      if(params['registration'] === 'true')

        this.afterRegistration = true;
    })
  }

  onSubmit(myLogin: LoginInfo) {
    
    this.authService.authorizeTheUser(myLogin).subscribe({
      next: message => this.nextFunction(message),
      error: errorMessage => this.errorFunction(errorMessage)
    });
  }

  nextFunction(message: any)
  {
    console.log(message);
    this.invalidData = false;
    this.router.navigate(['/home']);
  }

  errorFunction(message: any) {

    this.invalidData = true;
  }

}
