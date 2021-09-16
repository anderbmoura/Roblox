import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';

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

  public cardLOL = [];
  teste = 1

   constructor(
    private navCtrl: NavController
  ) {

  }

  ngOnInit() {

    firebase.analytics().logEvent('seleção sorteio');

    var ref = firebase.database().ref('/mountCard')

    ref.once('value').then(async snapshot =>{
       snapshot.forEach(value => {
       this.cardLOL.push(
         value.val()
         )
      })
    })

  }



  isValid(){
    if (this.teste == 0) {
      return false
    } else {
      return true
    }
  }

    goLeague() {
    this.navCtrl.navigateForward('/league')
  }

}