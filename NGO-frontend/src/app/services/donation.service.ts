import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class DonationService {
  private apiUrl = `${environment.apiUrl}/donations`;

  constructor(private http: HttpClient) {}

  createDonation(donation: any): Observable<any> {
    return this.http.post(this.apiUrl, donation);
  }

  getDonations() {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteDonation(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateDonationStatus(id: number, status: string) {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status });
  }

  sendOTP(email: string) {
    return this.http.post(`${this.apiUrl}/send-otp`, { email });
  }

  verifyOTP(email: string, otp: string) {
    return this.http.post<{
      message: string;
      verified: boolean;
    }>(`${this.apiUrl}/verify-otp`, {
      email,
      otp,
    });
  }
}
