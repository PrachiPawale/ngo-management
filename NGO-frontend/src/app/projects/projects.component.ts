import { Component,OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {

  projects: any[] = [];

  loading = false;
  errorMessage = '';

  constructor(
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {

    this.loading = true;
    this.errorMessage = '';

    this.projectService.getProjects().subscribe({

      next: (data) => {
        this.projects = data;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);

        this.loading = false;

        this.errorMessage =
          'Unable to load projects. Please try again later.';
      }

    });

  }

}