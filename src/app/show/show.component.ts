import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  products: Array<Product> = new Array<Product>();
  search: string;
  floors: Array<number> = [];
  sections: Array<number> = [];
  floor: number;
  section: number;
  productsCount: number;
  constructor(private productService: ProductService, private router: Router) { }
  onGet() {
    this.products = this.productService.getProducts();
    this.productsCount = this.products.length;
  }
  onGetWithDetail(floor: number, section?: number) {
    this.products = this.productService.getWithDetail(floor, section);
  }
  onEdit(code: string) {
    this.router.navigate(['add', code]);
  }
  getFloorAndSection() {
    for(let i=0;i< this.productService.floor; i++) {
      this.floors.push(i+1);
    }
    for(let i=0;i< this.productService.section; i++) {
      this.sections.push(i+1);
    }
  }
  onSelect(floor?: number, section?: number, floorSelect?: boolean) {
    if(!this.floor && section) return;
    this.section = this.section === section ? null : section;
    if(floorSelect)
      this.floor = this.floor === floor ? null : floor;
    else this.floor = floor;
    if(this.floor)
      this.onGetWithDetail(this.floor, this.section);
    else this.onGet();
    this.saveFilters(this.floor, this.section, this.search);
  }
  saveFilters(floor: number, section: number, search: string) {
    const filters = {
      floor : floor ? floor : undefined,
      section : section ? section : undefined,
      search
    }
    sessionStorage.setItem('filters', JSON.stringify(filters));
  }
  onClearFilters() {
    sessionStorage.removeItem('filters');
    this.search = null;
    this.floor = null;
    this.section = null;
    this.onGet();
  }
  getFilters() {
    const filters = JSON.parse(sessionStorage.getItem('filters'));
    if(filters) {
      this.search = filters.search;
      if(filters.floor) {
        this.floor = filters.floor ? filters.floor : this.floor;
        this.section = filters.section ? filters.section : this.section;
        this.onGetWithDetail(this.floor, this.section);
      return;
      }
    }
    this.onGet();
  }
  ngOnInit() {
    this.onGet();
    this.getFloorAndSection();
    this.getFilters();
  }
}
