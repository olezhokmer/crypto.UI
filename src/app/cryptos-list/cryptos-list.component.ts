import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../api.service'; // Adjust the path accordingly
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cryptos-list',
  templateUrl: './cryptos-list.component.html',
  styleUrls: ['./cryptos-list.component.css']
})
export class CryptosListComponent {
  sortOption: string = 'marketCap';
  cryptos: Crypto[] = [];
  displayedColumns: string[] = ['image', 'name', 'nameFull', 'price', 'action'];
  searchControl = new FormControl('');
  page: number = 1;
  limit: number = 10;
  totalCryptos: number = 0;

  constructor(
    private cryptoService: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getCryptos();
    this.searchControl.valueChanges.subscribe(() => {
      this.page = 1;
      this.getCryptos();
    });
  }

  sortCryptos() {
    this.getCryptos();
  }

  goToCrypto(id: string) {
    this.router.navigate(['/crypto'], { queryParams: { id } });
  }

  getCryptos() {
    const searchQuery = this.searchControl.value || '';
    this.cryptoService.getCryptos(this.page, this.limit, searchQuery, this.sortOption).subscribe((response: any) => {
      this.cryptos = response.data;
      this.totalCryptos = response.totalCount;
    });
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getCryptos();
  }
}
