import { Component, OnInit } from '@angular/core';

interface User {
  email: string;
  password: string;
  phone: string;
  role: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {

  userEmail: string = '';
  userPhone: string = '';
  userRole: string = '';

  constructor() { }

  ngOnInit() {
     // Recuperamos el usuario del localStorage
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      const user: User = JSON.parse(stored);
      this.userEmail = user.email;
      this.userPhone = user.phone;
      this.userRole = user.role;
    }
  }

}
