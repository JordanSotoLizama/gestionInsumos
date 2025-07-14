import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Tienda {
  id: string;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  constructor(private firestore: Firestore) {}

  getTiendas(): Observable<Tienda[]> {
    const tiendaRef = collection(this.firestore, 'tiendas');
    return collectionData(tiendaRef, { idField: 'id' }) as Observable<Tienda[]>;
  }
}