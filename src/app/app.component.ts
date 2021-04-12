import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import Parse from 'parse';

import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router : Router,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    private ga: GoogleAnalytics
  ) {

    Parse.initialize("wM6yD6kcHoVienOaM2MWMNio18zSq3Kb53ki99UC", "zJiAlu9pZnazMxRnv2WyK04KCisQ9gMFqMWBkPEO");
    Parse.serverURL = 'https://parseapi.back4app.com/';


    
    Parse.User.currentAsync().then(user => {
      console.log('Logged user', user);
      if(user == null){
        this.router.navigateByUrl('/login');
      } else {
        this.router.navigateByUrl('/tabs/tab1');
      }

     })

     
    

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.platform.is('cordova')) {
        this.setupPush();
      }

      this.ga.startTrackerWithId('UA-185750880-1')
      .then(() => {}).catch(e => alert('Error starting GoogleAnalytics == '+ e));

    });

    //verifica versão

    const version = Parse.Object.extend('version');
    const query = new Parse.Query(version);

    query.find().then((results) => {

      let versao = results[0].attributes.version
      
      console.log(versao)

      if(versao == '1427'){
        console.log("Você esta na versão certa")
      } else {
        this.newVersion()
      }
     
    }, (error) => {
    
    });
  
  }

  async newVersion() {
    const alert = await this.alertCtrl.create({
      header: 'Nova versão disponível',
      message: 'Por favor, atualize o app pela Play Store!',
      backdropDismiss: false
    });

    await alert.present();
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