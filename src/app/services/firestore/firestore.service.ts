import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore:AngularFirestore) { }

  //CREATE A STATE
  public createState(data) {
    return this.firestore.collection('SavedStates').add(data);
  }

  //READ A STATE
  public getState(documentId: string) {
    return this.firestore.collection('SavedStates').doc(documentId).snapshotChanges();
  }

  //READ ALL STATES
  public getStates() {
    return this.firestore.collection('SavedStates', ref => ref.orderBy('date')).snapshotChanges();
  }

  //UPDATE A STATE
  public updateState(documentId: string, data: any) {
    return this.firestore.collection('SavedStates').doc(documentId).set(data);
  }


}
