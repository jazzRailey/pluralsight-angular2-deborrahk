import { Component, OnInit } from '@angular/core';
import { IProduct} from './products';
import { ProductService } from 'src/app/products/product.service';


@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  errorMessage: any;
  pageTitle :  string = "Product Lists";
  imageWidth : number = 50;
  imageMargin : number = 2;
  filteredProducts : IProduct[];
  //listFilter : string = "cart";
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }


  products : IProduct[] = [];
  showImage : boolean = false;
  toggleImage() : void{
  this.showImage = !this.showImage;

  }
  constructor(private productService : ProductService) { 
//this.filteredProducts = this.products;
this._listFilter = "Cart";

  }

onRatingClicked(message : string) :void{
    this.pageTitle = 'Product List : ' + message;
  }

  

  ngOnInit() {
    //this.products = this.productService.getProducts();
    this.productService.getProducts().subscribe(
      products => {
      this.products = products,
      this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error
    )
    

  }

}
