import { Component, OnInit } from '@angular/core';
import { AdmobFreeService } from '../../service/admobfree.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Parse } from 'parse';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-counterstrike',
  templateUrl: './counterstrike.page.html',
  styleUrls: ['./counterstrike.page.scss'],
})
export class CounterstrikePage implements OnInit {

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

    this.montaCS();

  }

  ionViewWillEnter(){
    this.admobFreeService.BannerAd();
  }

  ionViewWillLeave(){
   this.admobFreeService.hideBannerAd();
  }

  async shareWhats(){
    // Text + Image or URL works
    this.socialSharing.shareViaWhatsApp('Estou te convidando a conhecer o Skins, um aplicativo que sorteia skin de jogos da atualidade. Use meu código *'+Parse.User.current().id+'* na hora do cadastro e me ajude a ter mais chances de ganhar. Baixe agora!', null, this.url).then(() => {
    
    }).catch((e) => {
      // Error!
    });

}




  async ParticiparcsChave(){

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
    query.equalTo("game", 'CS');
    query.equalTo("tipo", '1');
    query.descending("createdAt");
    query.limit(1);
    query.find().then((results) => {
    query.count().then(count => {

    var participando;
    var game;   


    if(count == 0){
      console.log("novo usuário");
    } else {
    console.log(results[0]);
    dataPart = results[0].createdAt.getDate();
    participando = results[0].attributes.participando;
    game = results[0].attributes.game;
    }

  
  if (count == 1){
    participando = 0;
}



  if(participando == 1){
    aguarde.dismiss();
    opsParticipou.present()
  } else {

  aguarde.dismiss();
 
  }

}, (error) => {
  console.log("erro desconhecido.")

});

});
   
  }

  async ParticiparcsSkin(){

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
    query.equalTo("game", 'CS');
    query.equalTo("tipo", '2');
    query.descending("createdAt");
    query.limit(1);
    query.find().then((results) => {
    query.count().then(count => {

    var participando;
    var game;    


    if(count == 0){
      console.log("novo usuário");
    } else {
    console.log(results[0]);
    dataPart = results[0].createdAt.getDate();
    participando = results[0].attributes.participando;
    game = results[0].attributes.game;
    }

  
  if (count == 1){
    participando = 0;
}

  if(participando == 1){
    aguarde.dismiss();
    opsParticipou.present()
  } else {


  }

}, (error) => {
  console.log("erro desconhecido.")

});

});
   
  }


  calendarioCS(){
    this.navCtrl.navigateForward("/calendariocs");
  }

  
  montaCS(){

    let rand = Math.random (); 
    var descricao
        
    var url = "https://animeplay.s3-us-west-2.amazonaws.com/cardslol.json?"+rand;
  
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", url);
    httpRequest.responseType = "json";
    httpRequest.send();
    httpRequest.addEventListener("readystatechange", function () {
  
      (<HTMLInputElement>document.getElementById("cardSorteioChave")).src = httpRequest.response[2].url_img_chave;
        document.getElementById("descricaoChave").innerHTML= ""+httpRequest.response[2].descricaoChave;
       (<HTMLInputElement>document.getElementById("cardSorteioSkinCS")).src = httpRequest.response[3].url_img_skincs;
       document.getElementById("descricaoSkin").innerHTML= ""+httpRequest.response[3].descricao_skincs;

    });
    }

}
