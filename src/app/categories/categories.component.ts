import { Component, EventEmitter, Output, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PieceService } from '../core/services/piece.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  @Output() categorySelected = new EventEmitter<any>();
  categoryId!: string;
  constructor(private _PieceService: PieceService) { }
  // Chocie Category & Send Category Id & Data
  setCategory(category = this.categoryId) {
    this.categoryId = category;
    this._PieceService.getPieces(category).subscribe({
      next: (data: any) => {
        this.categorySelected.emit({ categoryId: this.categoryId, data: data.data });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
