import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from "firebase";

/*
  Generated class for the TarefasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TarefasProvider {

  firebaseConfig = {
    apiKey: "AIzaSyAVnABqSyP-bb5gd288rXByOhmZICOetGk",
    authDomain: "ramonms98mobiledev.firebaseapp.com",
    databaseURL: "https://ramonms98mobiledev.firebaseio.com",
    projectId: "ramonms98mobiledev",
    storageBucket: "ramonms98mobiledev.appspot.com",
    messagingSenderId: "513247839946",
    appId: "1:513247839946:web:828f6c0fad2d30fb"
  };

  constructor() {
    console.log('Hello TarefasProvider Provider');
    firebase.initializeApp(this.firebaseConfig);
  }

  listar(){
    return firebase.firestore().collection("tarefas").get().then((querySnapshot) => {
      let tarefas = [];
      querySnapshot.forEach((doc) => {
        tarefas.push({
          id: doc.id,
          descricao: doc.data().descricao
        })
      });
      return tarefas;
    });
  }

  remover(id){
    return firebase.firestore().collection("tarefas").doc(id).delete();
  }

  adicionar(descricao){
    return firebase.firestore().collection("tarefas").add({
      descricao: descricao
    });
  }
 
}
