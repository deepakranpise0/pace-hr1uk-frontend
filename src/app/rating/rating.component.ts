import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'pace-hr1-uk-frontend-rating',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent {
  filledStars: number = 0;
  savedStars: number = 0;

  fillStars(starNumber: number) {
    if (this.savedStars === 0) {
      this.filledStars = starNumber;
    } else {
      this.filledStars = Math.max(starNumber, this.savedStars);
    }
  }

  resetStars() {
    if (this.savedStars === 0) {
      this.filledStars = 0;
    } else {
      if (this.savedStars < this.filledStars) {
        this.filledStars = this.savedStars;
      }
    }
  }

  public handleStars(event: Event, index: number) {
    event.preventDefault();
    this.savedStars = index; // Save the marked stars
    this.fillStars(index);
  }
}
