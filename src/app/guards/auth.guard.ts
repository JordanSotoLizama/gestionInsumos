import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const usuario = localStorage.getItem('currentUser');

    if (usuario) {
      return true; // usuario autenticado, puede ingresar
    }

    // usuario no autenticado, redirigir al login
    this.router.navigate(['/login']);
    return false;
  }
}