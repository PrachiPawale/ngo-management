import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';

  errorMessage = '';
  loading = false;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  login(): void {

    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required.';
      return;
    }

    this.loading = true;

    const credentials = {
      username: this.username,
      password: this.password
    };

    this.adminService.login(credentials).subscribe({

      next: (response) => {

        console.log(response);

        localStorage.setItem('token', response.token);

        this.loading = false;

        this.router.navigate(['/admin/dashboard']);
      },

      error: (error) => {

        console.error(error);

        this.errorMessage =
          error.error?.message || 'Invalid username or password.';

        this.loading = false;
      }

    });
  }
}