import { Component } from "@angular/core";
import { ContactService } from "../services/contact.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent {
  contact = {
    name: "",
    email: "",
    message: "",
  };

  successMessage = "";
  errorMessage = "";
  loading = false;

  constructor(private contactService: ContactService) {}

  submitContactForm(): void {
    this.successMessage = "";
    this.errorMessage = "";

    if (!this.contact.name || !this.contact.email || !this.contact.message) {
      this.errorMessage = "Please fill in all fields.";
      return;
    }
    this.loading = true;

    this.contactService.sendMessage(this.contact).subscribe({
      next: (response) => {
        console.log(response);

        this.successMessage = "Your message has been sent successfully.";

        this.contact = {
          name: "",
          email: "",
          message: "",
        };

        this.loading = false;
      },

      error: (error) => {
        console.error(error);

        this.errorMessage = "Unable to send your message.";
        this.loading = false;
      },
    });
  }
}
