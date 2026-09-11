import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent {

  volunteer = {
    name: '',
    email: '',
    phone: '',
    ngo: '',
    skills: '',
    message: ''
  };

  submitted = false;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  submitVolunteer() {

    this.submitted = false;
    this.errorMessage = '';

    if (!this.volunteer.name || !this.volunteer.email) {
      this.errorMessage = 'Name and email are required.';
      return;
    }

    this.http.post(
      'http://localhost:8080/api/volunteers',
      this.volunteer
    ).subscribe({

      next: (response: any) => {
        console.log('Volunteer submitted:', response);

        this.submitted = true;

        this.volunteer = {
          name: '',
          email: '',
          phone: '',
          ngo: '',
          skills: '',
          message: ''
        };
      },

      error: (error) => {
        console.error('Volunteer submission error:', error);

        this.errorMessage =
          error.error?.message ||
          'Failed to submit volunteer application.';
      }

    });
  }
}