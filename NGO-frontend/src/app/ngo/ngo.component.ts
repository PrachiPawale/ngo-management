import { Component, OnInit } from '@angular/core';
import { NgoService } from '../services/ngo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ngo',
  templateUrl: './ngo.component.html',
  styleUrls: ['./ngo.component.css']
})
export class NgoComponent implements OnInit {

  ngos: any[] = [];
  filteredNGOs: any[] = [];

  searchText: string = '';
  selectedCategory: string = '';

  categories: string[] = [
    'Education',
    'Healthcare',
    'Environment',
    'Women Empowerment',
    'Child Welfare'
  ];

  constructor(
    private ngoService: NgoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadNGOs();
  }

  loadNGOs(): void {
    this.ngoService.getNGOs().subscribe({
      next: (data) => {
        this.ngos = data;
        this.filteredNGOs = data;
      },
      error: (error) => {
        console.error('Error loading NGOs:', error);
      }
    });
  }

  filterNGOs(): void {

    const search = this.searchText.trim().toLowerCase();

    this.filteredNGOs = this.ngos.filter(ngo => {

      const matchesSearch =
        !search ||
        ngo.name?.toLowerCase().includes(search) ||
        ngo.description?.toLowerCase().includes(search);

      const matchesCategory =
        !this.selectedCategory ||
        ngo.category?.toLowerCase() ===
        this.selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }

  onSearch(): void {
    this.filterNGOs();
  }

  onCategoryChange(): void {
    this.filterNGOs();
  }

  viewNGO(id: number): void {
    this.router.navigate(['/ngo', id]);
  }

}