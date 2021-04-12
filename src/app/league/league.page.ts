import { AdmobFreeService } from '../../service/admobfree.service';
import { Parse } from 'parse';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-league',
  templateUrl: './league.page.html',
  styleUrls: ['./league.page.scss'],
})
export class LeaguePage implements OnInit {

  url = 'https://play.google.com/store/apps/details?id=com.skinsapp.news';

  constructor(
    private admobFreeService: AdmobFreeService,
    public alertController: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private socialSharing: SocialSharing
  ) {

  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    document.addEventListener("backbutton",function(e) {
      console.log("disable back button")
    }, false);
}

  ionViewWillEnter() {
    this.admobFreeService.BannerAd();
    //this.badgePartipou();
    //this.badgePartipouSkinLol();
  }

  ionViewWillLeave() {
    this.admobFreeService.hideBannerAd();
  }

  badgePartipou() {

    const node = document.querySelector('.participoubau')
    node.classList.add('animated', 'fadeIn')

    function handleAnimationEnd() {
      node.classList.remove('animated', 'fadeIn')
      node.removeEventListener('animationend', handleAnimationEnd)
    }

    node.addEventListener('animationend', handleAnimationEnd)


    var dataPart;

    var today = new Date();
    var todayInt;
    todayInt = today.getDate();
    var idd: String;
    idd = Parse.User.current().id;

    const participate = Parse.Object.extend('participate');
    const query = new Parse.Query(participate);
    query.equalTo("iduser", idd);
    query.equalTo("game", 'LOL');
    query.equalTo("tipo", '1');
    query.descending("createdAt");
    query.limit(1);
    query.find().then((results) => {
      query.count().then(count => {

        var participando;
        var game;

        if (count == 0) {
          console.log("novo usuário");
        } else {
          dataPart = results[0].createdAt.getDate();
          participando = results[0].attributes.participando;
          game = results[0].attributes.game;
        }

        if (count == 1) {
          participando = 0;
        }

        if (dataPart == todayInt && game == 'LOL' || participando == 1) {
          var $participou = document.querySelector('.participoubau'),
            HTMLNovo = '<ion-badge color="success">Você já participou hoje</ion-badge>';
          $participou.innerHTML = HTMLNovo;
        } else {
          var $participou = document.querySelector('.participoubau'),
            HTMLNovo = '<ion-badge color="medium">Você ainda não participou hoje</ion-badge>';
          $participou.innerHTML = HTMLNovo;
        }

      });

    });

  }

  badgePartipouSkinLol() {

    const node = document.querySelector('.participouskinlol')
    node.classList.add('animated', 'fadeIn')

    function handleAnimationEnd() {
      node.classList.remove('animated', 'fadeIn')
      node.removeEventListener('animationend', handleAnimationEnd)
    }

    node.addEventListener('animationend', handleAnimationEnd)


    var dataPart;

    var today = new Date();
    var todayInt;
    todayInt = today.getDate();
    var idd: String;
    idd = Parse.User.current().id;

    const participate = Parse.Object.extend('participate');
    const query = new Parse.Query(participate);
    query.equalTo("iduser", idd);
    query.equalTo("game", 'LOL');
    query.equalTo("tipo", '2');
    query.descending("createdAt");
    query.limit(1);
    query.find().then((results) => {
      query.count().then(count => {

        var participando;
        var game;

        if (count == 0) {
          console.log("novo usuário");
        } else {
          dataPart = results[0].createdAt.getDate();
          participando = results[0].attributes.participando;
          game = results[0].attributes.game;
        }

        if (count == 1) {
          participando = 0;
        }

        if (participando == 1) {
          var $participou = document.querySelector('.participouskinlol'),
            HTMLNovo = '<ion-badge color="success">Você já participou hoje</ion-badge>';
          $participou.innerHTML = HTMLNovo;
        } else {
          var $participou = document.querySelector('.participouskinlol'),
            HTMLNovo = '<ion-badge color="medium">Você ainda não participou hoje</ion-badge>';
          $participou.innerHTML = HTMLNovo;
        }

      });

    });

  }

  async shareWhats() {
    // Text + Image or URL works
    this.socialSharing.shareViaWhatsApp('Estou te convidando a conhecer o Skins, um aplicativo que sorteia skins de League of Legends. Baixe agora!', null, this.url).then(() => {

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

  passaParamentro(jogoo: String, tipoo: String) {
    this.admobFreeService.passaJogoParamentro(jogoo, tipoo);
  }

  async ParticiparBau() {

    const aguarde = await this.loadingCtrl.create({
      spinner: "dots",
      message: "Aguarde..."
    });

    const opsParticipou = await this.alertController.create({
      header: 'ATENÇÃO',
      message: 'Ops! Você já participou hoje, volte amanhã :)',
      buttons: ['Ok']
    });


    aguarde.present();

    var dataPart;

    var today = new Date();
    var todayInt;
    todayInt = today.getDate();
    var idd: String;
    idd = Parse.User.current().id;



    const participate = Parse.Object.extend('participate');
    const query = new Parse.Query(participate);
    query.equalTo("iduser", idd);
    query.equalTo("game", 'LOL');
    query.equalTo("tipo", '1');
    query.descending("createdAt");
    query.limit(1);
    query.find().then((results) => {
      query.count().then(count => {

        var participando;
        var game;


        if (count == 0) {
          console.log("novo usuário");
        } else {
          dataPart = results[0].createdAt.getDate();
          participando = results[0].attributes.participando;
          game = results[0].attributes.game;
        }



        if (count == 1) {
          participando = 0;
        }



        if (participando == 1) {
          aguarde.dismiss();
          opsParticipou.present()
        } else {


          aguarde.dismiss();
          this.showRewardVideo()
          this.passaParamentro('LOL', '1');
        }

      }, (error) => {
        console.log("erro desconhecido.")

      });

    });

  }

  async ParticiparSkin() {

    const aguarde = await this.loadingCtrl.create({
      spinner: "dots",
      message: "Aguarde..."
    });

    const opsParticipou = await this.alertController.create({
      header: 'ATENÇÃO',
      message: 'Ops! Você já participou hoje, volte amanhã :)',
      buttons: ['Ok']
    });


    aguarde.present();

    var dataPart;

    var today = new Date();
    var todayInt;
    todayInt = today.getDate();
    var idd: String;
    idd = Parse.User.current().id;



    const participate = Parse.Object.extend('participate');
    const query = new Parse.Query(participate);
    query.equalTo("iduser", idd);
    query.equalTo("game", 'LOL');
    query.equalTo("tipo", '2');
    query.descending("createdAt");
    query.limit(1);
    query.find().then((results) => {
      query.count().then(count => {

        var participando;
        var game;


        if (count == 0) {
          console.log("novo usuário");
        } else {
          dataPart = results[0].createdAt.getDate();
          participando = results[0].attributes.participando;
          game = results[0].attributes.game;

        }



        if (count == 1) {
          participando = 0;
        }



        if (participando == 1) {
          aguarde.dismiss();
          opsParticipou.present()
        } else {

          aguarde.dismiss();
          this.showRewardVideo();
          this.passaParamentro('LOL', '2');
        }

      }, (error) => {
        console.log("erro desconhecido.")

      });

    });

  }



  async ParticiparPontos() {

    const aguarde = await this.loadingCtrl.create({
      spinner: "dots",
      message: "Aguarde..."
    });

    const opsParticipou = await this.alertController.create({
      header: 'ATENÇÃO',
      message: 'Ops! Você já participou hoje, volte amanhã :)',
      buttons: ['Ok']
    });


    aguarde.present();

    var dataPart;

    var today = new Date();
    var todayInt;
    todayInt = today.getDate();
    var idd: String;
    idd = Parse.User.current().id;



    const participate = Parse.Object.extend('participate');
    const query = new Parse.Query(participate);
    query.equalTo("iduser", idd);
    query.equalTo("game", 'LOL');
    query.equalTo("tipo", '3');
    query.descending("createdAt");
    query.limit(1);
    query.find().then((results) => {
      query.count().then(count => {

        var participando;
        var game;


        if (count == 0) {
          console.log("novo usuário");
        } else {
          dataPart = results[0].createdAt.getDate();
          participando = results[0].attributes.participando;
          game = results[0].attributes.game;

        }



        if (count == 1) {
          participando = 0;
        }



        if (participando == 1) {
          aguarde.dismiss();
          opsParticipou.present()
        } else {

          aguarde.dismiss();
          this.showRewardVideo();
          this.passaParamentro('LOL', '3');
        }

      }, (error) => {
        console.log("erro desconhecido.")

      });

    });

  }


}
