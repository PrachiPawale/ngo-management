import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ContactService {
 private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  sendMessage(contact: any) {
    return this.http.post(
      `${this.apiUrl}/contacts`,
      contact
    );
  }

  getContacts() {
    return this.http.get<any[]>(
      `${this.apiUrl}/contacts`
    );
  }
  deleteContact(id: number) {
    return this.http.delete(
      `${this.apiUrl}/contacts/${id}`
    );
  }

}
