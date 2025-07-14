import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, doc, updateDoc, increment } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Insumo {
  id: string;
  nombre: string;
  stock: number;
}

@Injectable({
  providedIn: 'root',
})
export class InsumosService {
  constructor(private firestore: Firestore) {}

  getInsumos(): Observable<Insumo[]> {
    const insumosRef = collection(this.firestore, 'insumos');
    return collectionData(insumosRef, { idField: 'id' }) as Observable<Insumo[]>;
  }

  actualizarStock(id: string, cantidad: number) {
    const ref = doc(this.firestore, 'insumos', id);
    return updateDoc(ref, { stock: increment(cantidad) });
  }

  actualizarStockSalida(id: string, cantidad: number) {
    const ref = doc(this.firestore, 'insumos', id);
    return updateDoc(ref, { stock: increment(-cantidad) });
  }
}