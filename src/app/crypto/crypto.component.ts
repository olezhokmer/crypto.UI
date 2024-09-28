import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css']
})
export class CryptoComponent {
  prices = { currentPrices: [], predictedPrices: [] };
  crypto: any;
  ticker: any;
  mainQuote: any;
  pairName: string = '';

  constructor(private route: ActivatedRoute, private cryptoService: ApiService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.getCryptoDetails(id as string);
  }
  

  getCryptoDetails(id: string): void {
    this.cryptoService.getCryptoDetails(id).subscribe((data: any) => {
      this.crypto = data.crypto;
      this.ticker = data.ticker;
      this.mainQuote = data.mainQuote;
      this.pairName = data.pairName;

      this.cryptoService.getHistory(data.pairName, '1h').subscribe((prices) => {
        this.prices = prices as any;
      })
    });
  }
}
