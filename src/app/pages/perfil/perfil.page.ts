import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { User } from 'firebase/auth';

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
  userNombre: string = '';

  constructor(private auth: Auth, private firestore: Firestore) {}

  ngOnInit() {
    const currentUser: User | null = this.auth.currentUser;

    if (currentUser) {
      const uid = currentUser.uid;
      this.loadUserData(uid);
    }
  }

  async loadUserData(uid: string) {
    const userDocRef = doc(this.firestore, 'usuarios', uid);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      const data = userSnapshot.data();
      this.userEmail = data['correo'] || '';
      this.userPhone = data['telefono'] || '';
      this.userRole = data['cargo'] || '';
      this.userNombre = data['usuario'] || '';
    } else {
      console.warn('No se encontró el perfil del usuario en Firestore.');
    }
  }
}