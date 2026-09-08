import { Component } from "@angular/core";
import { DonationService } from "../services/donation.service";

@Component({
  selector: "app-donate",
  templateUrl: "./donate.component.html",
  styleUrls: ["./donate.component.css"],
})
export class DonateComponent {
  donation = {
    name: "",
    email: "",
    amount: 0,
  };

  loading = false;
  successMessage = "";
  errorMessage = "";
  otp = "";
  otpSent = false;
  emailVerified = false;
  otpLoading = false;
  otpMessage = "";

  constructor(private donationService: DonationService) {}

  submitDonation(): void {
    this.successMessage = "";
    this.errorMessage = "";

    if (
      !this.donation.name ||
      !this.donation.email ||
      this.donation.amount <= 0
    ) {
      this.errorMessage = "Please fill all fields correctly.";
      return;
    }

    this.loading = true;

    this.donationService.createDonation(this.donation).subscribe({
      next: () => {
        this.loading = false;

        this.successMessage =
          "Thank you! Your donation has been submitted successfully.";

        this.donation = {
          name: "",
          email: "",
          amount: 0,
        };
      },

      error: (error) => {
        console.error(error);

        this.loading = false;

        this.errorMessage = "Unable to submit donation. Please try again.";
      },
    });
  }

  sendOTP(): void {
    this.otpMessage = "";

    if (!this.donation.email) {
      this.errorMessage = "Please enter your email first.";
      return;
    }

    this.otpLoading = true;

    this.donationService.sendOTP(this.donation.email).subscribe({
      next: (response: any) => {
        this.otpSent = true;
        this.otpLoading = false;

        this.otpMessage = "OTP sent successfully. Check your email.";
      },

      error: (error) => {
        console.error(error);

        this.otpLoading = false;

        this.errorMessage = "Unable to send OTP. Please check your email.";
      },
    });
  }

  verifyOTP(): void {
    if (!this.otp) {
      this.errorMessage = "Please enter the OTP.";
      return;
    }

    this.otpLoading = true;

    this.donationService.verifyOTP(this.donation.email, this.otp).subscribe({
      next: (response) => {
        this.emailVerified = response.verified;
        this.otpLoading = false;

        if (this.emailVerified) {
          this.emailVerified = true;
          this.otpMessage = "Email verified successfully.";

          this.errorMessage = "";
        }
      },

      error: (error) => {
        console.error(error);

        this.emailVerified = false;
        this.otpLoading = false;

        this.errorMessage = "Invalid or expired OTP.";
      },
    });
  }
}
