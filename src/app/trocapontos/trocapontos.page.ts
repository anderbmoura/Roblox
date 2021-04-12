import { Component, OnInit } from '@angular/core';
import Parse from 'parse';
import { ScratchCard, SCRATCH_TYPE } from 'scratchcard-js'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-trocapontos',
  templateUrl: './trocapontos.page.html',
  styleUrls: ['./trocapontos.page.scss'],
})
export class TrocapontosPage implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {

    //this.createNewScratchCard();

    const User = new Parse.User();
    const query = new Parse.Query(User);

    var iduser: String;
    iduser = Parse.User.current().id;

    query.get(Parse.User.current().id).then((user) => {

      var pontos = user.attributes.pontos

      if (user.attributes.pontos == undefined){
        pontos = 0
      } else {
        var pontos = user.attributes.pontos;
      }

      document.getElementById("qtdPontos").innerHTML = pontos+ " pontos disponíveis";

      if(user.attributes.pontos < 7150){
        var $iconetrade = document.getElementById('650RP'),
        HTMLNovo = '<ion-badge color="danger" slot="end">JUNTE 7.150 PTS</ion-badge>';
        $iconetrade.innerHTML = HTMLNovo;
      } else {
        var $iconetrade = document.getElementById('650RP'),
        HTMLNovo = '<ion-badge color="success" slot="end">TROCAR 7.150 PTS</ion-badge>';
        $iconetrade.innerHTML = HTMLNovo;
        console.log(user.attributes.tradelink)
      }

      if(user.attributes.pontos < 15180){
        var $iconetrade = document.getElementById('1380RP'),
        HTMLNovo = '<ion-badge color="danger" slot="end">JUNTE 15.180 PTS</ion-badge>';
        $iconetrade.innerHTML = HTMLNovo;
      } else {
        var $iconetrade = document.getElementById('1380RP'),
        HTMLNovo = '<ion-badge color="success" slot="end">TROCAR 15.180 PTS</ion-badge>';
        $iconetrade.innerHTML = HTMLNovo;
        console.log(user.attributes.tradelink)
      }

      if(user.attributes.pontos < 5000){
        var $iconetrade = document.getElementById('BAURP'),
        HTMLNovo = '<ion-badge color="danger" slot="end">JUNTE 5000 PTS</ion-badge>';
        $iconetrade.innerHTML = HTMLNovo;
      } else {
        var $iconetrade = document.getElementById('BAURP'),
        HTMLNovo = '<ion-badge color="success" slot="end">TROCAR 5000 PTS</ion-badge>';
        $iconetrade.innerHTML = HTMLNovo;
        console.log(user.attributes.tradelink)
      }

      if(user.attributes.pontos < 7150){
        var $iconetrade = document.getElementById('10REAIS'),
        HTMLNovo = '<ion-badge color="danger" slot="end">JUNTE 7.150 PTS</ion-badge>';
        $iconetrade.innerHTML = HTMLNovo;
      } else {
        var $iconetrade = document.getElementById('10REAIS'),
        HTMLNovo = '<ion-badge color="success" slot="end">TROCAR 7.150 PTS</ion-badge>';
        $iconetrade.innerHTML = HTMLNovo;
        console.log(user.attributes.tradelink)
      }

      
      if(user.attributes.pontos < 15180){
        var $iconetrade = document.getElementById('20REAIS'),
        HTMLNovo = '<ion-badge color="danger" slot="end">JUNTE 15.180 PTS</ion-badge>';
        $iconetrade.innerHTML = HTMLNovo;
      } else {
        var $iconetrade = document.getElementById('20REAIS'),
        HTMLNovo = '<ion-badge color="success" slot="end">TROCAR 15.180 PTS</ion-badge>';
        $iconetrade.innerHTML = HTMLNovo;
        console.log(user.attributes.tradelink)
      }
    });

  } //FIM NGONINIT

  async juntePontos() {
    const alert = await this.alertController.create({
      header: 'Pontos insuficientes!',
      message: 'Por favor, junte os pontos necessários.',
      buttons: ['OK']
    });

    await alert.present();
  }


  Trocapts(){


    
    const User = new Parse.User();
    const query = new Parse.Query(User);

    var iduser: String;
    iduser = Parse.User.current().id;

    query.get(Parse.User.current().id).then((user) => {

    if(user.attributes.pontos > 5000 && user.attributes.pontos < 15180){
      console.log("VAMOS LÁ");
    } else {
      this.juntePontos();
    }

  }
    )};

 

  // createNewScratchCard() {
  //   const scContainer = document.getElementById('js--sc--container')
  //   const sc = new ScratchCard('#js--sc--container', {
  //     scratchType: SCRATCH_TYPE.CIRCLE,
  //     containerWidth: 300,//scContainer.offsetWidth,
  //     containerHeight: 300,
  //     imageForwardSrc: '../../assets/imgs/steam.jpg',
  //     //imageBackgroundSrc: './assets/images/scratchcard-background.svg',
  //     htmlBackground: '<div class="cardamountcss"><div class="won-amnt">30</div><div class="won-text">Points<br>Won!</div></div>',
  //     clearZoneRadius: 40,
  //     nPoints: 80,
  //     pointSize: 4,
  //     callback: () => {
  //       console.log('Now the window will reload !')
  //     }
  //   })
  //   // Init
  //   sc.init();
  // }


}
