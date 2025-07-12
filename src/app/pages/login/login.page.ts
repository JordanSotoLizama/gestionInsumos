import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface User {
  email: string;
  password: string;
  phone: string;
  role: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';
  error: string = '';

   // “Base de datos” simulada
  //private users: User[] = [
    //{
      //email: 'user1@example.com',
      //password: 'pass1',
      //phone: '123456789',
      //role: 'Operario Bodega'
    //},
    //{
      //email: 'user2@example.com',
      //password: 'pass2',
      //phone: '987654321',
      //role: 'Operario Grua'
    //},
    //{
      //email: 'user3@example.com',
      //password: 'pass3',
      //phone: '555555555',
      //role: 'Jefe Bodega'
    //}
  //];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private authService: AuthService
  ) { }

  ngOnInit() {

    const usuario = localStorage.getItem('currentUser');
    if (usuario) {
      this.router.navigate(['/home-menu']);
    }
    
  }

  //async login() {
    // buscamos coincidencia
    //const found = this.users.find(
      //u => u.email === this.email && u.password === this.password
    //);

    //if (found) {
      // guardamos el usuario para usarlo en otras páginas
      //localStorage.setItem('currentUser', JSON.stringify(found));
      // navegamos a home-menu y limpiamos el historial
      //this.navCtrl.navigateRoot('/home-menu');
    //} else {
      // alerta de credenciales inválidas
      //const alert = await this.alertCtrl.create({
        //header: 'Error',
        //message: 'Usuario o contraseña inválidos',
        //buttons: ['OK']
      //});
      //await alert.present();
    //}
    async login() {
      const email = `${this.username}@dummy.com`;

      try {
        await this.authService.login(email, this.password);
        this.router.navigate(['/home-menu']);
      } catch (err: any) {
        this.error = 'Usuario o contraseña incorrectos';
        console.error(err);
      }
    }

}
