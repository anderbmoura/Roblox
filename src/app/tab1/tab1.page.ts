import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';

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
  pushes: any = [];

   constructor(
    private navCtrl: NavController,
    private router: Router,
    private fcm: FCM,
    public plt: Platform
  ) {

    this.plt.ready()
    .then(() => {
      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        };
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        // Register your new token in your back-end if you want
        // backend.registerToken(token);
      });
    })

  }

  subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
  }
  getToken() {
    this.fcm.getToken().then(token => {
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }
  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
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