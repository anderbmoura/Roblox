import { Injectable, OnInit } from "@angular/core";
import {
  AdMobFree,
  AdMobFreeBannerConfig,
  AdMobFreeInterstitialConfig,
  AdMobFreeRewardVideoConfig
} from '@ionic-native/admob-free/ngx';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

//firebase import
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import 'firebase/database';
import { random } from "lodash";



@Injectable({
  providedIn: 'root',
})
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
    isTesting: false, // Remove in production
    autoShow: false,
    id: "ca-app-pub-4960570157635148/7079885498"
  };

  invocador: String;
  //tipo: any;
  counter: any;

  constructor(
    private admobFree: AdMobFree,
    public platform: Platform,
    public toastCtrl: ToastController,
    public alertController: AlertController,
    private storage: Storage
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

          let valorStorage

        await  this.storage.get('name').then((val) => {
            valorStorage = val
            console.log(val)
          });

          console.log(valorStorage)

          if ( valorStorage == 'diario'){
          

          firebase.auth().onAuthStateChanged(function(user) {

            if (user) {

              var username = firebase.database().ref('/users/' + user.uid)

              username.on('value', (snapshot) =>{

                console.log(user)

                var seconds = new Date()
                var data = new Date()


                firebase.database().ref('/participate/'+randomstring+user.uid).set({
                  game: 'roblox',
                  identificacao: 'diario',
                  robloxName: snapshot.val().robloxName,
                  date: data,
                  type: 1,
                  uid: user.uid
                })

                firebase.database().ref('/participateDaily/'+user.uid).set({
                  id: user.uid
                })

                toast.present()
                
              })

            } else {
              // No user is signed in.
            }
          });
        } else {

          
          firebase.auth().onAuthStateChanged(function(user) {

            if (user) {

              var username = firebase.database().ref('/users/' + user.uid)

              username.on('value', (snapshot) =>{

                console.log(user)

                var seconds = new Date()
                var data = new Date()


                firebase.database().ref('/participate/'+randomstring+user.uid).set({
                  game: 'roblox',
                  identificacao: 'mensal',
                  robloxName: snapshot.val().robloxName,
                  date: data,
                  type: 2,
                  uid: user.uid
                })

                firebase.database().ref('/participateMounth/'+user.uid).push({
                  id: user.uid,
                  data: data.getDate()
                })

                toast.present()
                
              })

            } else {
              // No user is signed in.
            }
          });


        }
        }).catch(e => alert(e));
    });
  }

  ngOnInit() {
      
  }

  

  BannerAd() {
    let bannerConfig: AdMobFreeBannerConfig = {
      isTesting: false, // Remove in production
      autoShow: true,//,
      id: "ca-app-pub-4960570157635148/2100673943"
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

  // passaJogoParamentro(ident: String, tipo: String) {
  //   this.jogoPar = ident;
  //   this.tipo = tipo;
  // }


}
   

