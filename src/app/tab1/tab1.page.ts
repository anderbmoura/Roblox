import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

//firebase SDK import

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import 'firebase/database';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @Output() tipoSorteio: string

  public cardLOL: any;
  teste = 1

   constructor(
    private navCtrl: NavController,
    private router: Router,
  
  ) {

  }


  ngOnInit() {

    setTimeout(() => { 

      firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.analytics().logEvent('seleção sorteio');

        var ref = firebase.database().ref('/mountCard')
        this.cardLOL = []
    
        ref.once('value').then(async snapshot =>{
           snapshot.forEach(value => {
           this.cardLOL.push(
             value.val()
             )
          })
        })
      } else {
        this.router.navigate(['/login']);
      }
    })

     }, 3000);

  }



  isValid(){
    firebase.auth().signOut().then(res => {
      console.log(res)
      this.navCtrl.navigateForward('/login')
    }).catch((error) => {
      console.log(error)
    });
  }

    goSorteio(index) {
  
      if(index == 0){
        this.tipoSorteio = 'diario'
      } else {
        this.tipoSorteio = 'mensal'
      }
    this.navCtrl.navigateForward('/league', {state: {
      sorteio: this.tipoSorteio
    }})
  }

}