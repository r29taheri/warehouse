import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Array<Product> = new Array<Product>();
  floor: number = 3;
  section: number = 3;
  constructor() { }

  addProduct(code: string, quantity: number, floor: number, section: number) {
    this.products.push(new Product(code, quantity, floor, section))
  }
  getProducts() {
    return this.products;
  }
  getWithDetail(floor: number, section?: number) {
    let result = [];
    if(section) {
      this.products.forEach(product => {
        if(product.floor === floor && product.section === section) {
          result.push(product);
        }
      });
      return result;
    }
    this.products.forEach(product => {
      if(product.floor === floor)
        result.push(product);
    });
    return result;
  }
  getOneProduct(code: string) {
    const found = this.products.find(function(element) {
      return element.code == code;
    });
    return found;
  }
  updateProject(code: string, quantity: number, floor: number, section: number) {
    for (var i in this.products) {
      if (this.products[i].code == code) {
        this.products[i].quantity = quantity;
        this.products[i].floor = floor;
        this.products[i].section = section;
        break;
      }
    }
  }
}
