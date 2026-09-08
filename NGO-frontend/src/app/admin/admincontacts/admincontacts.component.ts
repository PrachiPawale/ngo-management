import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-admincontacts',
  templateUrl: './admincontacts.component.html',
  styleUrls: ['./admincontacts.component.css']
})
export class AdminContactsComponent implements OnInit {

   contacts: any[] = [];

  loading = false;
  errorMessage = '';

  constructor(
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {

    this.loading = true;
    this.errorMessage = '';

    this.contactService.getContacts().subscribe({

      next: (data) => {
        this.contacts = data;
        this.loading = false;
      },
      error: (error) => {

        console.error(error);

        this.loading = false;

        this.errorMessage =
          'Unable to load contact messages.';
      }

    });
  }

  deleteContact(id: number): void {

    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }

    this.contactService.deleteContact(id).subscribe({

      next: () => {
        this.loadContacts();
      },
        error: (error) => {
        console.error(error);
        this.errorMessage =
          'Unable to delete the message.';
      }

    });
  }

}

