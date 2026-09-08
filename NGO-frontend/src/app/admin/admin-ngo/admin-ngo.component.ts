import { Component, OnInit } from '@angular/core';
import { NgoService } from '../../services/ngo.service';

@Component({
  selector: 'app-admin-ngo',
  templateUrl: './admin-ngo.component.html',
  styleUrls: ['./admin-ngo.component.css']
})
export class AdminNgoComponent implements OnInit {

  ngos: any[] = [];

  editing = false;
  editingId: number | null = null;

  ngo = {
    name: '',
    description: '',
    mission: '',
    location: '',
    email: '',
    phone: '',
    logo: '',
    category: ''
  };

  constructor(
    private ngoService: NgoService
  ) {}

  ngOnInit(): void {
    this.loadNGOs();
  }

  loadNGOs(): void {
    this.ngoService.getNGOs().subscribe({

      next: (data) => {
        this.ngos = data;
      },

      error: (error) => {
        console.error(error);
      }

    });
  }

  addNGO(): void {
    this.ngoService.createNGO(this.ngo).subscribe({

      next: () => {
        alert('NGO added successfully');

        this.resetForm();
        this.loadNGOs();
      },

      error: (error) => {
        console.error(error);
        alert('Failed to add NGO');
      }

    });
  }

  editNGO(ngo: any): void {

    this.editing = true;
    this.editingId = ngo.id;

    this.ngo = {
      name: ngo.name,
      description: ngo.description,
      mission: ngo.mission || '',
      location: ngo.location || '',
      email: ngo.email || '',
      phone: ngo.phone || '',
      logo: ngo.logo || '',
      category: ngo.category || ''
    };

  }

  updateNGO(): void {

    if (this.editingId === null) {
      return;
    }

    this.ngoService
      .updateNGO(this.editingId, this.ngo)
      .subscribe({

        next: () => {
          alert('NGO updated successfully');

          this.resetForm();
          this.loadNGOs();
        },

        error: (error) => {
          console.error(error);
          alert('Failed to update NGO');
        }

      });
  }

  deleteNGO(id: number): void {

    if (!confirm('Are you sure you want to delete this NGO?')) {
      return;
    }

    this.ngoService.deleteNGO(id).subscribe({

      next: () => {
        alert('NGO deleted successfully');

        this.loadNGOs();
      },

      error: (error) => {
        console.error(error);
        alert('Failed to delete NGO');
      }

    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {

    this.editing = false;
    this.editingId = null;

    this.ngo = {
      name: '',
      description: '',
      mission: '',
      location: '',
      email: '',
      phone: '',
      logo: '',
      category: ''
    };

  }

}