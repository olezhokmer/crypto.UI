import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptosListComponent } from './cryptos-list/cryptos-list.component';
import { CryptoComponent } from './crypto/crypto.component';
import { SignalsComponent } from './signals/signals.component';

const routes: Routes = [
  { path: '', component: CryptosListComponent },
  { path: 'crypto', component: CryptoComponent },
  { path: 'signals', component: SignalsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
