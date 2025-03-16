import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoriesComponent } from "../categories/categories.component";
import { CommonModule } from '@angular/common';
import { FileUpload, FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-wardrobe',
  standalone: true,
  imports: [CategoriesComponent, CommonModule, FileUpload, ToastModule],
  templateUrl: './wardrobe.component.html',
  styleUrls: ['./wardrobe.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
})
export class WardrobeComponent implements OnInit {
  constructor(private messageService: MessageService) { }

  onBasicUploadAuto(event: UploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
  }
  activeCategory: string = 'T-Shirts';
  images: string[] = [];
  categories: { [key: string]: string[] } = {
    'T-Shirts': [
      './img/t-shirts/IMG-20250314-WA0011.jpg',
      './img/t-shirts/IMG-20250314-WA0023.jpg',
      './img/t-shirts/IMG-20250314-WA0025.jpg',
      './img/t-shirts/IMG-20250314-WA0026.jpg',
      './img/t-shirts/IMG-20250314-WA0027.jpg',
      './img/t-shirts/IMG-20250314-WA0029.jpg',
      './img/t-shirts/IMG-20250314-WA0031.jpg',
      './img/t-shirts/IMG-20250314-WA0041.jpg',
      './img/t-shirts/IMG-20250314-WA0042.jpg',
      './img/t-shirts/IMG-20250314-WA0043.jpg',
    ],
    'Boots': [
      './img/boots/IMG-20250314-WA0034.jpg',
      './img/boots/IMG-20250314-WA0036.jpg',
      './img/boots/IMG-20250314-WA0037.jpg',
      './img/boots/IMG-20250314-WA0038.jpg',
      './img/boots/IMG-20250314-WA0040.jpg',
    ],
    'Jeans': [
      './img/jeans/IMG-20250314-WA0030.jpg',
      './img/jeans/IMG-20250314-WA0032.jpg',
      './img/jeans/IMG-20250314-WA0035.jpg',
      './img/jeans/IMG-20250314-WA0035 - Copy.jpg',
    ],
    'Accessories': [
      './img/asscories/IMG-20250314-WA0015.jpg',
      './img/asscories/IMG-20250314-WA0018.jpg',
      './img/asscories/IMG-20250314-WA0019.jpg',
      './img/asscories/IMG-20250314-WA0020.jpg',
      './img/asscories/IMG-20250314-WA0021.jpg',
      './img/asscories/IMG-20250314-WA0022.jpg',
    ]
  };
  ngOnInit() {
    this.onCategorySelected(this.activeCategory);
  }
  onCategorySelected(category: string) {
    this.activeCategory = category;
    this.images = this.categories[category as keyof typeof this.categories];
  }
}
