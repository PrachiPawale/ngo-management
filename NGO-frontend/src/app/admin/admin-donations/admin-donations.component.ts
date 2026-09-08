import { Component } from "@angular/core";
import { DonationService } from "../../services/donation.service";

@Component({
  selector: "app-admin-donations",
  templateUrl: "./admin-donations.component.html",
  styleUrls: ["./admin-donations.component.css"],
})
export class AdminDonationsComponent {
  donations: any[] = [];

  loading = false;
  errorMessage = "";

  constructor(private donationService: DonationService) {}

  ngOnInit(): void {
    this.loadDonations();
  }

  loadDonations(): void {
    this.loading = true;
    this.errorMessage = "";

    this.donationService.getDonations().subscribe({
      next: (data) => {
        this.donations = data;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);

        this.loading = false;

        this.errorMessage = "Unable to load donations.";
      },
    });
  }

  deleteDonation(id: number): void {
    if (!confirm("Are you sure you want to delete this donation?")) {
      return;
    }

    this.donationService.deleteDonation(id).subscribe({
      next: () => {
        this.loadDonations();
      },
      error: (error) => {
        console.error(error);

        this.errorMessage = "Unable to delete the donation.";
      },
    });
  }

  acceptDonation(id: number): void {
    if (!confirm("Are you sure you want to accept this donation?")) {
      return;
    }

    this.donationService.updateDonationStatus(id, "accepted").subscribe({
      next: (response) => {
        console.log(response);

        // Update UI immediately
        const donation = this.donations.find((d) => d.id === id);

        if (donation) {
          donation.status = "accepted";
        }
      },

      error: (error) => {
        console.error("Error accepting donation:", error);

        this.errorMessage = "Unable to accept donation.";
      },  
    });
  }

  rejectDonation(id: number): void {
  this.donationService.updateDonationStatus(id, 'pending')
    .subscribe({
      next: () => {
        const donation = this.donations.find(d => d.id === id);

        if (donation) {
          donation.status = 'pending';
        }
      },
      error: (error) => {
        console.error('Error changing donation status:', error);
      }
    });
}
}
