import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const usuario = localStorage.getItem('currentUser');
    if (usuario) {
      // Si ya está logueado, redirige al home
      this.router.navigate(['/home-menu']);
      return false;
    }
    return true;
  }
}