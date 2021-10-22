import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { OneSignal } from '@ionic-native/onesignal/ngx';

import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/database";



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  firebaseConfig = {
    apiKey: "AIzaSyA-66CktZPOKF0mgWmxosCOdZKC-i1dzt0",
    authDomain: "roblox-4-ever.firebaseapp.com",
    databaseURL: "https://roblox-4-ever-default-rtdb.firebaseio.com",
    projectId: "roblox-4-ever",
    storageBucket: "roblox-4-ever.appspot.com",
    messagingSenderId: "786959345698",
    appId: "1:786959345698:web:4163d67b9310fa0035427b",
    measurementId: "G-HZ30MRXKTK"
  }





  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController
  ) {

    this.initializeApp();

  }

  initializeApp() {

    firebase.initializeApp(this.firebaseConfig);

    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // if (this.platform.is('cordova')) {
      //   this.setupPush();
      // }

      firebase.auth().onAuthStateChanged((user) => {

        if (user) {
          console.log(user)
          this.router.navigate(['/tabs/tab1']);
        }
      })
    });



    


  }

  setupPush() {
    // I recommend to put these into your environment.ts
    this.oneSignal.startInit('24858016-535e-4609-8b8b-7c85e76a7b01', 'NTkyNDNiNzMtMTk1ZC00MTY5LWI2ZmItYzJkYTgyMTMyMDQ5');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData.task);
    });

    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // Just a note that the data is a different place here!
      let additionalData = data.notification.payload.additionalData;

      this.showAlert('Notification opened', 'You already read this before', additionalData.task);
    });

    this.oneSignal.endInit();
  }

  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {
            // E.g: Navigate to a specific screen
          }
        }
      ]
    })
    alert.present();
  }
}