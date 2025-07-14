import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface PaquetePickeado {
  id?: string;
  tienda: string;
  anio: number;
  semana: number;
  insumos: { nombre: string; cantidad: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class DistribuirService {
  constructor(private firestore: Firestore) {}

  getPaquetes(): Observable<PaquetePickeado[]> {
    const paquetesRef = collection(this.firestore, 'paquetes-pickeados');
    return collectionData(paquetesRef, { idField: 'id' }) as Observable<PaquetePickeado[]>;
  }
}