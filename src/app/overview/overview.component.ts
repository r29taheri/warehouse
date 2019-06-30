import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  products: Array<Product> = new Array<Product>();
  floors: Array<number> = [];
  sections: Array<number> = [];
  constructor(private productService: ProductService) { }
  onGet() {
    this.products = this.productService.getProducts();
  }
  getFloorAndSection() {
    for(let i=0;i< this.productService.floor; i++) {
      this.floors.push(i+1);
    }
    for(let i=0;i< this.productService.section; i++) {
      this.sections.push(i+1);
    }
  }
  ngOnInit() {
    this.onGet();
    this.getFloorAndSection();
  }
}