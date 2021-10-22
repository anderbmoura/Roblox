import { AdmobFreeService } from '../../service/admobfree.service';
import { Parse } from 'parse';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

//firebase SDK import

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import 'firebase/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-league',
  templateUrl: './league.page.html',
  styleUrls: ['./league.page.scss'],
})
export class LeaguePage implements OnInit {

  tipoSorteio: string
  tipo: number
  enableButton = false
  participar = true


  public participateMounth = [];

  url = 'https://play.google.com/store/apps/details?id=com.skinsapp.news';

  constructor(

    private admobFreeService: AdmobFreeService,
    public alertController: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private navCtrl: NavController,
    public router: Router,
    private socialSharing: SocialSharing,
    private storage: Storage

  ) {

    if (router.getCurrentNavigation().extras.state) {
      const getSorteio = this.router.getCurrentNavigation().extras.state.sorteio;
      this.tipoSorteio = getSorteio
    }
    
    console.log(this.tipoSorteio)
  }

  ngOnInit() {



    if(this.tipoSorteio == 'diario'){
      this.tipo = 1
    } else {
      this.tipo = 2
    }
  }

  ionViewDidEnter() {
    document.addEventListener("backbutton",function(e) {
      console.log("disable back button")
    }, false);
}


  ionViewWillEnter() {

    let data = new Date()

    const user = firebase.auth().currentUser;

    if (user) {

      var username = firebase.database().ref('/participateMounth/'+user.uid)
      username.once('value', (snapshot) =>{

        console.log(snapshot.val())
        console.log(user.uid)

        
         snapshot.forEach(value => {

          if (value.val().data == data.getDate()) {
                this.participar = false
          }
         
        })

      }
    )}

    this.admobFreeService.BannerAd();
    console.log(this.tipoSorteio)
    //this.badgePartipou();
    //this.badgePartipouSkinLol();
  }


  ionViewWillLeave() {
    this.admobFreeService.hideBannerAd();
  }



  async shareWhats() {
    // Text + Image or URL works
    this.socialSharing.shareViaWhatsApp('Venha participar comigo no sorteio de 50 ROBUX, todo dia tem um ganhador.', null, this.url).then(() => {

    }).catch((e) => {
      // Error!
    });

  }

  // showInterstitial(){
  //   this.admobFreeService.InterstitialAd();
  // }

  showRewardVideo() {
    this.admobFreeService.RewardVideoAd();
  }

  // passaParamentro(ident: String, tipo: String) {
  //   this.admobFreeService.passaJogoParamentro(ident, tipo);
  // }

  async Participar() {
    this.storage.clear()
    this.storage.set('name', this.tipoSorteio);
    

    const aguarde = await this.loadingCtrl.create({
      spinner: "dots",
      message: "Aguarde..."
    });

    const opsParticipou = await this.alertController.create({
      header: 'ATENÇÃO',
      message: 'Ops! Você já participou hoje, você podera participar novamente amanhã',
      buttons: ['Ok']
    });

    aguarde.present()

       // this.showRewardVideo()
       //this.passaParamentro('diario', '1');

        const user = firebase.auth().currentUser;


        if(this.tipoSorteio == 'diario'){
      if (user) {

        var username = firebase.database().ref('/participateDaily/'+user.uid)
        username.once('value', (snapshot) =>{

          console.log(snapshot.val())
          console.log(user.uid)

        if(snapshot.val() != null){
          if(snapshot.val().id == user.uid){

                  aguarde.dismiss()
                  opsParticipou.present()

         } } else {
       
        aguarde.dismiss()
        this.showRewardVideo()

          }

        }
      )}
    } else {
       
        if (this.participar == true){
        
          aguarde.dismiss()
          this.enableButton = true
          this.showRewardVideo()

        } else { 
          aguarde.dismiss()
          opsParticipou.present()
        }
      }

  }

}
