import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-volunteer',
  templateUrl: './admin-volunteer.component.html',
  styleUrls: ['./admin-volunteer.component.css']
})
export class AdminVolunteerComponent implements OnInit {

  volunteers: any[] = [];

  loading = false;

  successMessage = '';
  errorMessage = '';

  private apiUrl = 'https://ngo-management-backend-db65.onrender.com/api/volunteers';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadVolunteers();
  }

  // =================================
  // GET ALL VOLUNTEERS
  // =================================

  loadVolunteers(): void {

    this.loading = true;

    this.http.get<any[]>(this.apiUrl).subscribe({

      next: (data) => {
        this.volunteers = data;
        this.loading = false;
      },

      error: (error) => {

        console.error('Error loading volunteers:', error);

        this.errorMessage =
          error.error?.message ||
          'Failed to load volunteer applications.';

        this.loading = false;
      }

    });
  }


  // =================================
  // ACCEPT VOLUNTEER
  // =================================

  acceptVolunteer(id: number): void {

    this.updateStatus(id, 'accepted');
  }


  // =================================
  // REJECT VOLUNTEER
  // =================================

  rejectVolunteer(id: number): void {

    this.updateStatus(id, 'rejected');
  }


  // =================================
  // UPDATE STATUS
  // =================================

  updateStatus(id: number, status: string): void {

    this.http.put(
      `${this.apiUrl}/${id}/status`,
      { status: status }
    ).subscribe({

      next: (response: any) => {

        this.successMessage = response.message;

        // Update the row immediately
        const volunteer = this.volunteers.find(
          v => v.id === id
        );

        if (volunteer) {
          volunteer.status = status;
        }

        this.clearMessages();
      },

      error: (error) => {

        console.error('Error updating status:', error);

        this.errorMessage =
          error.error?.message ||
          'Failed to update volunteer status.';

        this.clearMessages();
      }

    });
  }


  // =================================
  // DELETE VOLUNTEER
  // =================================

  deleteVolunteer(id: number): void {

    const confirmed = confirm(
      'Are you sure you want to delete this volunteer application?'
    );

    if (!confirmed) {
      return;
    }

    this.http.delete(
      `${this.apiUrl}/${id}`
    ).subscribe({

      next: (response: any) => {

        this.successMessage = response.message;

        // Remove from table immediately
        this.volunteers = this.volunteers.filter(
          v => v.id !== id
        );

        this.clearMessages();
      },

      error: (error) => {

        console.error('Error deleting volunteer:', error);

        this.errorMessage =
          error.error?.message ||
          'Failed to delete volunteer.';

        this.clearMessages();
      }

    });
  }


  // =================================
  // CLEAR MESSAGES
  // =================================

  clearMessages(): void {

    setTimeout(() => {

      this.successMessage = '';
      this.errorMessage = '';

    }, 3000);
  }

}