import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-redirector',
  template: '', // No muestra nada, solo redirige
  standalone: false,
})
export class RedirectorPage implements OnInit {
  constructor(private router: Router, private auth: Auth) {}

  ngOnInit(): void {
    console.log('RedirectorPage cargado');
    // Escucha si el usuario está autenticado en Firebase
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.router.navigate(['/home-menu']); // Usuario logueado
      } else {
        this.router.navigate(['/login']); // Usuario no logueado
      }
    });
  }
}