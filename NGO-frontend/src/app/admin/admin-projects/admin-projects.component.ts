import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.css']
})
export class AdminProjectsComponent implements OnInit {

  projects: any[] = [];

  editing = false;
  editingId: number | null = null;

  project = {
    title: '',
    description: '',
    image: ''
  };

  constructor(
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {

    this.projectService.getProjects().subscribe({

      next: (data) => {
        this.projects = data;
      },

      error: (error) => {
        console.error(error);
      }

    });

  }

  addProject(): void {

    this.projectService.createProject(this.project).subscribe({

      next: () => {

        alert('Project added successfully');

        this.resetForm();
        this.loadProjects();

      },

      error: (error) => {
        console.error(error);
        alert('Failed to add project');
      }

    });

  }

  editProject(project: any): void {

    this.editing = true;
    this.editingId = project.id;

    this.project = {
      title: project.title,
      description: project.description,
      image: project.image || ''
    };

  }

  updateProject(): void {

    if (this.editingId === null) {
      return;
    }

    this.projectService
      .updateProject(this.editingId, this.project)
      .subscribe({

        next: () => {

          alert('Project updated successfully');

          this.resetForm();
          this.loadProjects();

        },

        error: (error) => {
          console.error(error);
          alert('Failed to update project');
        }

      });

  }

  deleteProject(id: number): void {

    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    this.projectService.deleteProject(id).subscribe({

      next: () => {

        alert('Project deleted successfully');

        this.loadProjects();

      },

      error: (error) => {
        console.error(error);
        alert('Failed to delete project');
      }

    });

  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {

    this.editing = false;
    this.editingId = null;

    this.project = {
      title: '',
      description: '',
      image: ''
    };

  }

}