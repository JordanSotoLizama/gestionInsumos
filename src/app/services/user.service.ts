import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: Firestore) {}

  async getUserData(uid: string) {
    const userRef = doc(this.firestore, 'usuarios', uid);
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      return null;
    }
  }
}