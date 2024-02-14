import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shop/services/product.service';
import { RestErrorHandlerService } from '../../services/rest-error-handler.service';
import { UserService } from 'src/app/user/services/user.service';
import { Product } from 'src/app/shop/models/product';
import { Address } from 'src/app/user/models/address';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  filteredProducts: Product[] = [];
  filteredShops: Address[] = [];

  constructor(private restErrorSvc: RestErrorHandlerService,
    private productService: ProductService,
    private userService: UserService,
    private location: Location,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let searchStr = params.get("searchStr");
      if (searchStr) {
        this.search(searchStr);
      }
    })
  }

  search(searchStr: string) {
    let filter = searchStr.toLowerCase();
    this.filterProducts(filter);
    this.filterAddresses(filter);
  }

  filterProducts(filter: string) {
    this.productService.getAllProducts().subscribe({
      next: items => {
        console.log(items)
        this.filteredProducts = items.filter(item =>
          JSON.stringify(item).toLowerCase().includes(filter)
        );
        console.log(this.filteredProducts)
      },
      error: err => {
        this.restErrorSvc.processFetchError(err);
      }
    })
  }

  filterAddresses(filter: string) {
    this.userService.getShops().subscribe({
      next: shops => {
        this.filteredShops = shops.filter(shop => 
          JSON.stringify(shop).toLowerCase().includes(filter)
        )

        console.log(this.filteredShops);
      },
      error: err => {
        this.restErrorSvc.processFetchError(err);
      }
    })
  }

  goBack() {
    this.location.back();
  }
}
