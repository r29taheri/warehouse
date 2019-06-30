import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../models/product';
import { codeChecker } from '../validators/codeChecker';
import { ActivatedRoute, Router } from '@angular/router';
import { quantityChecker } from '../validators/quantityChecker';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  products: Array<Product> = new Array<Product>();
  editMode: boolean = false;
  editProduct: any;
  product = new FormGroup({
    code: new FormControl({value: '', disabled: this.editMode}, [Validators.required, codeChecker]),
    quantity: new FormControl('', [Validators.required, Validators.minLength(1), quantityChecker]),
    floor: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
  });
  floors: Array<number> = [];
  sections: Array<number> = [];
  buttonTitle: string = "Add product";
  showMessage: boolean = false;
  errorMessage: string = '';
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }
  get formProductControls(): any {
    return this.product['controls'];
 }
  onAdd() {
    if (this.product.invalid) {
      return;
    }
    if(!this.editMode) {
      let isUnique=true;
      this.errorMessage = null;
      this.products.forEach(element => {
        if(element.code === this.product.value.code.toUpperCase()) {
          isUnique=false; 
          this.errorMessage = "There is a product with this code,\n Please change the code.";
          setTimeout(() => {
            this.errorMessage = "";
          }, 10000);
        }
      });
      if(isUnique) {
        this.productService.addProduct(this.product.value.code.toUpperCase(), this.product.value.quantity, +this.product.value.floor, +this.product.value.section);
        this.showMessage = true;
        this.product.reset();
        setTimeout(() => {
          this.showMessage = false;
        }, 2000);
      }
    }
    if(this.editMode) {
      this.productService.updateProject(this.editProduct.code, this.product.value.quantity, +this.product.value.floor, +this.product.value.section);
      this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
          this.router.navigateByUrl("/show");
        }, 2000);
    }
  }
  getFloorAndSection() {
    for(let i=0;i< this.productService.floor; i++) {
      this.floors.push(i+1);
    }
    for(let i=0;i< this.productService.section; i++) {
      this.sections.push(i+1);
    }
  }
  onGet() {
    this.products = this.productService.getProducts();
  }
  onEditMode() {
    this.route.params.subscribe(params => {
      if(params.code) {
        const product = this.productService.getOneProduct(params.code);
        if(product) {
          this.editProduct = this.productService.getOneProduct(params.code);
          this.editMode = true;
          this.product.patchValue({
            'code': product.code,
            'floor': product.floor,
            'quantity': product.quantity,
            'section': product.section
          });
          this.product.get('code').disable();
          this.buttonTitle = "Edit Product";
        } else {
          this.product.patchValue({
            'code': params.code,
          });
        }
      }
    })
  }
  onCancel() {
    this.router.navigateByUrl("/show")
  }
  ngOnInit() {
    this.onGet();
    this.getFloorAndSection();
    this.onEditMode();
  }

}
