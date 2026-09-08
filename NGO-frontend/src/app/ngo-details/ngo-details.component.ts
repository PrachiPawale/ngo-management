import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgoService } from '../services/ngo.service';

@Component({
  selector: 'app-ngo-details',
  templateUrl: './ngo-details.component.html',
  styleUrls: ['./ngo-details.component.css']
})
export class NgoDetailsComponent implements OnInit {

  ngo: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private ngoService: NgoService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadNGO(Number(id));
    }
  }

  loadNGO(id: number): void {

    this.ngoService.getNGOById(id).subscribe({
      next: (data) => {
        this.ngo = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading NGO:', error);
        this.loading = false;
      }
    });

  }

  goBack(): void {
    this.router.navigate(['/ngo']);
  }

  donate(): void {
    this.router.navigate(['/donate']);
  }

}