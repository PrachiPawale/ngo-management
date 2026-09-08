import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { OurWorkComponent } from './our-work/our-work.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { DonateComponent } from './donate/donate.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AdminProjectsComponent } from './admin/admin-projects/admin-projects.component';
import { AdminDonationsComponent } from './admin/admin-donations/admin-donations.component';
import { AdminContactsComponent } from './admin/admincontacts/admincontacts.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { withInterceptorsFromDi } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminNgoComponent } from './admin/admin-ngo/admin-ngo.component';
import { NgoComponent } from './ngo/ngo.component';
import { NgoDetailsComponent } from './ngo-details/ngo-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    OurWorkComponent,
    ProjectsComponent,
    ContactComponent,
    DonateComponent,
    LoginComponent,
    DashboardComponent,
    AdminProjectsComponent,
    AdminDonationsComponent,
    AdminContactsComponent,
    AdminLayoutComponent,
    PageNotFoundComponent,
    AdminNgoComponent,
    NgoComponent,
    NgoDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
