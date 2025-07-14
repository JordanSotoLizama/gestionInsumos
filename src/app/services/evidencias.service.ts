import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvidenciasService {
  constructor(private firestore: Firestore) {}

  agregarEvidencia(evidencia: any) {
    const ref = collection(this.firestore, 'evidencias');
    return addDoc(ref, evidencia);
  }

  eliminarPaquetePickeado(id: string) {
    const ref = doc(this.firestore, 'paquetes-pickeados', id);
    return deleteDoc(ref);
  }

  getEvidencias(): Observable<any[]> {
    const ref = collection(this.firestore, 'evidencias');
    return collectionData(ref, { idField: 'id' }); // importante incluir el id
  }

  guardarMovimientoSalida(nombre: string, cantidad: number) {
    const ref = collection(this.firestore, 'movimientos');
    return addDoc(ref, {
      insumo: { nombre },
      cantidad,
      tipo: 'salida',
      fecha: new Date()
    });
  }
}