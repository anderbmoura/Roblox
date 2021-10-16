import { Injectable, OnInit } from "@angular/core";
import {
  AdMobFree,
  AdMobFreeBannerConfig,
  AdMobFreeInterstitialConfig,
  AdMobFreeRewardVideoConfig
} from '@ionic-native/admob-free/ngx';
import { Platform, ToastController, AlertController } from '@ionic/angular';

//firebase import
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import 'firebase/database';
import { random } from "lodash";


@Injectable()
export class AdmobFreeService implements OnInit {

  argumentos = null;
  

  //Interstitial Ad's Configurations
  interstitialConfig: AdMobFreeInterstitialConfig = {
    // add your config here
    // for the sake of this example we will just use the test config
    isTesting: true,
    autoShow: false
   // id: "ca-app-pub-4960570157635148/2539580422"
  };

  //Reward Video Ad's Configurations
  RewardVideoConfig: AdMobFreeRewardVideoConfig = {
    isTesting: true, // Remove in production
    autoShow: false//
    //id: "ca-app-pub-4960570157635148/2568229534"
  };

  invocador: String;
  jogoPar: any;
  tipo: any;
  counter: any;

  constructor(
    private admobFree: AdMobFree,
    public platform: Platform,
    public toastCtrl: ToastController,
    public alertController: AlertController
  ) {


    platform.ready().then(() => {

      // Load ad configuration
      this.admobFree.interstitial.config(this.interstitialConfig);
      //Prepare Ad to Show
      this.admobFree.interstitial.prepare()
        .then(() => {
          // alert(1);
        }).catch(e => alert(e));


      // Load ad configuration
      this.admobFree.rewardVideo.config(this.RewardVideoConfig);
      //Prepare Ad to Show
      this.admobFree.rewardVideo.prepare()
        .then(() => {
          // alert(2);
        }).catch(e => alert(e));

    });

    //Handle interstitial's close event to Prepare Ad again
    this.admobFree.on('admob.interstitial.events.CLOSE').subscribe(() => {
      this.admobFree.interstitial.prepare()
        .then(() => {
          //evento ao fechar o InterAD não quero.
        }).catch(e => alert(e));
    });
    //Handle Reward's close event to Prepare Ad again
    this.admobFree.on('admob.rewardvideo.events.CLOSE').subscribe(async () => {

      const toast = await this.toastCtrl.create({
        message: "Boa sorte, você esta participando deste sorteio.",
        duration: 5000
      });


      this.admobFree.rewardVideo.prepare()
        .then(async () => {

          let nomeRoblox

          var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
          var string_length = 10;
          var randomstring = '';
          for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
          }
          

          firebase.auth().onAuthStateChanged(function(user) {

            if (user) {

              var username = firebase.database().ref('/users/' + user.uid)

              username.on('value', (snapshot) =>{

                console.log(user)

                var seconds = new Date()
                var data = new Date()

                firebase.database().ref('/participate/'+randomstring+user.uid).set({
                  game: 'roblox',
                  participateTime: ((seconds.getHours()*3600000)+3600000)+(seconds.getMinutes()*60000),
                  robloxName: snapshot.val().robloxName,
                  date: data,
                  type: 1,
                  uid: user.uid
                })

                firebase.database().ref('/participateTime/'+user.uid).set({
                  participateTime: ((seconds.getHours()*3600000)+3600000)+(seconds.getMinutes()*60000),
                  id: user.uid
                })

                toast.present()
                
              })

            } else {
              // No user is signed in.
            }
          });
        }).catch(e => alert(e));
    });
  }

  ngOnInit() {

  }

  

  BannerAd() {
    let bannerConfig: AdMobFreeBannerConfig = {
      isTesting: false, // Remove in production
      autoShow: true,//,
      id: "ca-app-pub-4960570157635148/1059209304"
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare().then(() => {
      // success
    }).catch(e => alert(e));
  }

  hideBannerAd() {
    this.admobFree.banner.hide();
  }

  InterstitialAd() {
    //Check if Ad is loaded
    this.admobFree.interstitial.isReady().then(() => {
      //Will show prepared Ad
      this.admobFree.interstitial.show().then(() => {
      })
        .catch(e => alert("show " + e));
    })
      .catch(e => alert("isReady " + e));
  }

  RewardVideoAd() {
    setInterval(function(){
  }, 1000);
    //Check if Ad is loaded
    this.admobFree.rewardVideo.isReady().then(() => {
      //Will show prepared Ad
      this.admobFree.rewardVideo.show().then(() => {
      })
        .catch(e => alert("show " + e));
    })
      .catch(e => alert("isReady " + e));
  }

  passaJogoParamentro(jogo: String, tipo: String) {
    this.jogoPar = jogo;
    this.tipo = tipo;
  }


}
   

