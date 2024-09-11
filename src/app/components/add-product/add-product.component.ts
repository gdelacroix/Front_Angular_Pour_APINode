import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  product = {
    name: '',
    price: 0,
    promotion: false,
    discount: 0,
    category: {
      _id: '',
      name: '',
    },
  };

  categories: any[] = [];
  selectedCategoryId: string = '';
  newCategoryName: string = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data: any[]) => {
      this.categories = data;
    });
  }

  addProduct(): void {
    if (this.selectedCategoryId) {
      // Si une catégorie existante est sélectionnée
      this.product.category._id = this.selectedCategoryId;
      this.saveProduct();
    } else if (this.newCategoryName) {
      // Si une nouvelle catégorie est saisie, on l'ajoute directement au produit
      this.product.category = {
        _id: this.generateCategoryId(),
        name: this.newCategoryName,
      };
      this.saveProduct();
    }
  }
  generateCategoryId(): string {
    const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
    const machineIdentifier = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0');
    const processIdentifier = Math.floor(Math.random() * 0xffff)
      .toString(16)
      .padStart(4, '0');
    const counter = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0');

    return timestamp + machineIdentifier + processIdentifier + counter;
  }

  saveProduct(): void {
    this.productService.addProduct(this.product).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
