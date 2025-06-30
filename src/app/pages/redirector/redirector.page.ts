import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirector',
  template: '',
  standalone: false, // No muestra nada
})
export class RedirectorPage {
  constructor(private router: Router) {
    const usuario = localStorage.getItem('currentUser');
    if (usuario) {
      this.router.navigate(['/home-menu']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}