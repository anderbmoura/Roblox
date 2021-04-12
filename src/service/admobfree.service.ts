import { Injectable, OnInit } from "@angular/core";
import {
  AdMobFree,
  AdMobFreeBannerConfig,
  AdMobFreeInterstitialConfig,
  AdMobFreeRewardVideoConfig
} from '@ionic-native/admob-free/ngx';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { Parse } from 'parse';


@Injectable()
export class AdmobFreeService implements OnInit {

  argumentos = null;
  

  //Interstitial Ad's Configurations
  interstitialConfig: AdMobFreeInterstitialConfig = {
    // add your config here
    // for the sake of this example we will just use the test config
    isTesting: false,
    autoShow: false,
    id: "ca-app-pub-4960570157635148/2539580422"
  };

  //Reward Video Ad's Configurations
  RewardVideoConfig: AdMobFreeRewardVideoConfig = {
    isTesting: false, // Remove in production
    autoShow: false,//
    id: "ca-app-pub-4960570157635148/2568229534"
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
        message: "Boa sorte, você esta participando deste sorteio. Você ganhou pontos de raspadinha.",
        duration: 5000
      });

      if(this.counter === 10) {
        console.log("Anuncio Visualizado 10 segundos!")
    } else {
      console.log("anuncio fechado antes!")
    }

      this.admobFree.rewardVideo.prepare()
        .then(async () => {

          var iduser: String;
          iduser = Parse.User.current().id;

          var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
          var string_length = 6;
          var randomstring = '';
          for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
          }
          // var Pontos = Math.round(5 + Math.random()*7);

          const participate = Parse.Object.extend('participate');
          const myNewObject = new participate();

          const User = new Parse.User();
          const query = new Parse.Query(User);

          query.get(iduser).then((user) => {

            myNewObject.set('nome', user.attributes.invocador);
            myNewObject.set('game', this.jogoPar);
            myNewObject.set('iduser', iduser);
            myNewObject.set('participando', 1);
            myNewObject.set('bilheteSorte', randomstring.toUpperCase());
            myNewObject.set('tipo', this.tipo);

            myNewObject.save();
            toast.present();

          })


          query.get(iduser).then((user) => {
            if (user.attributes.pontos == undefined) {
              pontos = 0
            } else {
              var pontos = user.attributes.pontos;
            }
            user.set('pontos', pontos + Math.round(5 + Math.random() * 5));
            user.save().then((response) => {

            }).catch((error) => {

            });
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
    this.counter = 0
    setInterval(function(){
          
      // do your thing
  
      this.counter++;
      console.log(this.counter);
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
   

