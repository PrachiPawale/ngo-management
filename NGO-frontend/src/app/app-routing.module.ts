import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { DonateComponent } from "./donate/donate.component";
import { OurWorkComponent } from "./our-work/our-work.component";

import { LoginComponent } from "./admin/login/login.component";
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { ProjectsComponent } from "./projects/projects.component";
import { AdminContactsComponent } from "./admin/admincontacts/admincontacts.component";
import { AdminDonationsComponent } from "./admin/admin-donations/admin-donations.component";
import { AdminProjectsComponent } from "./admin/admin-projects/admin-projects.component";
import { AuthGuard } from "./guards/auth.guard";
import { AdminLayoutComponent } from "./admin/admin-layout/admin-layout.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { NgoService } from "./services/ngo.service";
import { AdminNgoComponent } from "./admin/admin-ngo/admin-ngo.component";
import { NgoComponent } from "./ngo/ngo.component";
import { NgoDetailsComponent } from "./ngo-details/ngo-details.component";

const routes: Routes = [
  // Public pages
  {
    path: "",
    component: HomeComponent,
  },

  {
    path: "about",
    component: AboutComponent,
  },

  {
    path: "our-work",
    component: OurWorkComponent,
  },

  {
    path: "projects",
    component: ProjectsComponent,
  },

  {
    path: "contact",
    component: ContactComponent,
  },

  {
    path: "donate",
    component: DonateComponent,
  },

  // Admin Login
  {
    path: "admin/login",
    component: LoginComponent,
  },

  {
    path: "ngo",
    component: NgoComponent,
  },

  {
    path: "ngo/:id",
    component: NgoDetailsComponent,
  },

  // Admin Panel
  {
    path: "admin",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],

    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },

      {
        path: "dashboard",
        component: DashboardComponent,
      },

      {
        path: "projects",
        component: AdminProjectsComponent,
      },

      {
        path: "contacts",
        component: AdminContactsComponent,
      },

      {
        path: "donations",
        component: AdminDonationsComponent,
      },

      {
        path: "admin-ngo",
        component: AdminNgoComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
