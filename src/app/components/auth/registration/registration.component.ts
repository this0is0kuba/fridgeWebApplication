import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistrationInfo } from '../../../models/auth/Registration';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SimpleMessage } from '../../../models/auth/SimpleMessage';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, RouterLink, HttpClientModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  providers: [AuthService]
})
export class RegistrationComponent {

  registration: RegistrationInfo = {

    userName: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: new Date('1999-03-25'),
    gender: true,
  }

  freeUsername = true;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(registrationValues: RegistrationInfo) {

    this.authService.registerTheUser(registrationValues).subscribe({
      next: response => this.nextFunction(response),
      error: errorResponse => this.errorFunction(errorResponse)
    });
  }

  nextFunction(response: any) {

    console.log(response);
    
    this.router.navigate(['/login'], { queryParams: { registration: true } });
    this.freeUsername = true;
  }

  
  errorFunction(errorResponse: any) {

    const simpleMessage: SimpleMessage = errorResponse.error;

    console.log(simpleMessage.info);

    if(simpleMessage.info === "User with this name already exists.")
      this.freeUsername = false;
  }
}
