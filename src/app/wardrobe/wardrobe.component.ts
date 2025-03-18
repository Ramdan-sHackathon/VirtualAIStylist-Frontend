import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { CategoriesComponent } from "../categories/categories.component";
import { CommonModule } from '@angular/common';
import { FileUpload, FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Piece } from '../core/interfaces/Piece';
import { PieceService } from '../core/services/piece.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { filter } from 'rxjs';

interface data {
  id: string;
  imageUrl: string;
}
@Component({
  selector: 'app-wardrobe',
  standalone: true,
  imports: [CategoriesComponent, CommonModule, FileUpload, ToastModule, ReactiveFormsModule],
  templateUrl: './wardrobe.component.html',
  styleUrls: ['./wardrobe.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
})
export class WardrobeComponent implements OnInit {
  activeCategory: string = '';
  categoryId: string = '1';
  Pieces = signal<data[]>([]);
  uploadForm!: FormGroup;
  constructor(private messageService: MessageService, private _PieceService: PieceService, private fb: FormBuilder) { }
  ngOnInit() {
    this.uploadForm = this.fb.group({
      files: [null]
    });
    this._PieceService.getPieces('1').subscribe({
      next: (data: any) => {
        this.onCategorySelected({ categoryId: '1', data: data.data });
      }
    })
  }
  onCategorySelected(event: { categoryId: string; data: { id: string; imageUrl: string }[] }) {
    this.Pieces.set(event.data.map((item: { id: string; imageUrl: string }) => ({ id: item.id, imageUrl: item.imageUrl })));
    console.log(this.Pieces);
    switch (event.categoryId) {
      case '1':
        this.categoryId = '1'
        this.activeCategory = 'T-Shirts';
        break;
      case '2':
        this.categoryId = '2'
        this.activeCategory = 'Boots';
        break;
      case '3':
        this.categoryId = '3'
        this.activeCategory = 'Jeans';
        break;
      case '4':
        this.categoryId = '4'
        this.activeCategory = 'Accessories';
        break;
      default:
        this.activeCategory = 'Unknown Category';
        break;
    }
  }
  onBasicUploadAuto(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Image File Uploaded with Auto Mode' });
  }
  onFileSelect(event: any) {
    const files = event.files;
    this.uploadForm.patchValue({ files: files });
  }
  uploadPieces() {
    if (!this.uploadForm.value.files || this.uploadForm.value.files.length === 0) {
      this.messageService.add({ severity: 'warn', summary: 'No Image Selected', detail: 'Please select Image first' });
      return;
    }
    const files: File[] = this.uploadForm.value.files;
    const formData = new FormData();
    formData.append("WardrobeId", this.categoryId);
    for (let i = 0; i < files.length; i++) {
      formData.append(`Pieces`, files[i]);
    }
    this._PieceService.addPiece(formData).subscribe({
      next: (response: any) => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Upload Successful', detail: 'Piece Image Added Successfully ✅' });
        this.Pieces.update((oldPieces) => [...oldPieces, { id: response.WardrobeId, imageUrl: response.data }]);
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Upload Failed', detail: error.error?.title || 'Error uploading piece' });
      }
    });
  }
  deletePiece(pieceId: string) {
    this._PieceService.deletePiece([Number(pieceId)]).subscribe({
      next: (response) => {
        console.log(response);
        this.Pieces.update((oldPieces) => oldPieces.filter(piece => piece.id !== pieceId));
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Image Deleted Successfully ✅ !' });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
