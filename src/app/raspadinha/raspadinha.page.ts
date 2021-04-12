import { Component, destroyPlatform, OnInit } from '@angular/core';
import { ScratchCard, SCRATCH_TYPE } from 'scratchcard-js'
import { AdmobFreeService } from '../../service/admobfree.service';
import Parse from 'parse';
import { AlertController, LoadingController } from '@ionic/angular';

import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-raspadinha',
  templateUrl: './raspadinha.page.html',
  styleUrls: ['./raspadinha.page.scss'],
})
export class RaspadinhaPage implements OnInit {

  public disabled = false;
  private countAds = 0

  constructor(
    private admobFreeService: AdmobFreeService,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    private ga: GoogleAnalytics
  ) { }

  ngOnInit() {
    this.createNewScratchCard();
    this.ga.trackView('Raspadinha')
    .then(() => {})
    .catch(e => console.log(e));
  }

  trackEvent(item) {
    this.ga.trackEvent('Category', 'Tapped Action', 'Item Tapped is '+item, 0);
  }

ionViewDidEnter(){
  const User = new Parse.User();
  const query = new Parse.Query(User);


  var iduser: String;
    iduser = Parse.User.current().id;


    query.get(iduser).then(async (user) => {

      var pontos = user.attributes.pontos
      var rp = user.attributes.RP

      document.getElementById("qtdPontos").innerHTML = 'Chances: ' + pontos;
      document.getElementById("qtdRp").innerHTML = ': ' + rp;


    })

}

  showInterstitial() {
    this.admobFreeService.InterstitialAd();
  }

  async efetuarTrocaBau() {

    const aguarde = await this.loadingCtrl.create({
      spinner: "dots",
      message: "Aguarde..."
    });

    const alert = await this.alertController.create({
      header: 'Trocar RP?',
      message: 'Você quer trocar 2000 RP por baú misterioso?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Trocar',
          handler: async () => {

            await aguarde.present();

            const User = new Parse.User();
            const query = new Parse.Query(User);

            const winners = Parse.Object.extend('winners');
            const vencedor = new winners();

            var iduser: String;
            iduser = Parse.User.current().id;


            query.get(iduser).then((user) => {

              var rp = user.attributes.RP


              user.set('RP', rp = (rp - 2000))

              user.save().then((response) => {

              }).catch((error) => {

              });

              vencedor.set('nome', user.attributes.invocador);
              vencedor.set('premio', 'Bau misterioso (2000 RP)');
              vencedor.set('jogo', 'LOL');
              vencedor.set('iduser', iduser);
              vencedor.set('thumnail', 'medalha.png');
              vencedor.set('pago', 'Processando');
              vencedor.set('color', 'warning')

              vencedor.save().then(
                (result) => {
                  aguarde.dismiss()
                  return this.trocaEfetuada();
                },
                (error) => {

                }
              );


            })

          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }



  async trocaEfetuada() {
    const alert = await this.alertController.create({
      header: 'Troca confirmada!',
      message: 'Troca efetuada com sucesso. Confira o status da solicitação na aba vencedores.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {

            const User = new Parse.User();
            const query = new Parse.Query(User);

            var iduser: String;
            iduser = Parse.User.current().id;


            query.get(iduser).then((user) => {

              var rp = user.attributes.RP

              document.getElementById("qtdRp").innerHTML = ': ' + rp;

            })

          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }

  async semSaldo() {
    const alert = await this.alertController.create({
      header: 'Você não possui RP!',
      message: 'Você não possui pontos para realizar esta troca.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {

          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }


  createNewScratchCard() {


    const User = new Parse.User();
    const query = new Parse.Query(User);

    const winners = Parse.Object.extend('winners');
    const vencedor = new winners();

    var iduser: String;
    iduser = Parse.User.current().id;


    query.get(iduser).then(async (user) => {

      var pontos = user.attributes.pontos
      var rp = user.attributes.RP


      if (user.attributes.RP == undefined) {
        rp = 0
      }

      if (user.attributes.pontos == undefined) {
        pontos = 0
      } else {
        pontos = user.attributes.pontos;
        rp = user.attributes.RP;
      }
      document.getElementById("qtdPontos").innerHTML = 'Chances: ' + pontos;
      document.getElementById("qtdRp").innerHTML = ': ' + rp;



      this.disabled = true
      let rand = Math.floor(Math.random() * 50000)
      let premio = ''


      if (pontos == 0) {
        premio = './assets/images/ops.png'
      } else {

        if (rand < 2) {
          premio = './assets/images/bau_misterioso.png'

          vencedor.set('nome', user.attributes.invocador);
          vencedor.set('premio', 'Báu Misterioso (raspadinha)');
          vencedor.set('jogo', 'LOL');
          vencedor.set('iduser', iduser);
          vencedor.set('thumnail', 'medalha.png');
          vencedor.set('pago', 'Processando');
          vencedor.set('color', 'warning')

        }
        
        else if (rand == 1542) {
          premio = './assets/images/skin975.png'

          vencedor.set('nome', user.attributes.invocador);
          vencedor.set('premio', 'Skin 975 (raspadinha)');
          vencedor.set('jogo', 'LOL');
          vencedor.set('iduser', iduser);
          vencedor.set('thumnail', 'medalha.png');
          vencedor.set('pago', 'Processando');
          vencedor.set('color', 'warning')

        }


        else if (rand > 88 && rand < 90) {
          premio = './assets/images/bau_misterioso.png'

          vencedor.set('nome', user.attributes.invocador);
          vencedor.set('premio', 'Bau misterioso (raspadinha)');
          vencedor.set('jogo', 'LOL');
          vencedor.set('iduser', iduser);
          vencedor.set('thumnail', 'medalha.png');
          vencedor.set('pago', 'Processando');
          vencedor.set('color', 'warning')


        }
        else if (rand > 90 && rand < 95) {

          premio = './assets/images/+2.png'

          user.set('pontos', pontos = (pontos + 2));

          user.save().then((response) => {

          }).catch((error) => {

          });
        }
        else if (rand > 95 && rand < 98) {

          premio = './assets/images/+3.png'

          user.set('pontos', pontos = (pontos + 3));

          user.save().then((response) => {

          }).catch((error) => {

          });
        }
        else if (rand > 98 && rand < 105) {

          premio = './assets/images/+4.png'

          user.set('pontos', pontos = (pontos + 4));

          user.save().then((response) => {

          }).catch((error) => {

          });
        }
        else if (rand > 105 && rand < 125) {

          premio = './assets/images/+5.png'

          user.set('pontos', pontos = (pontos + 5));

          user.save().then((response) => {

          }).catch((error) => {

          });

        }
        else if (rand > 125 && rand < 500) {

          premio = './assets/images/+1.png'

          user.set('pontos', pontos = (pontos + 1));

          user.save().then((response) => {

          }).catch((error) => {

          });
        }
        else if (rand > 500) {

          premio = './assets/images/tentenovamente.png'
        }
      }
      const scContainer = document.getElementById('js--sc--container')
      const sc = new ScratchCard('#js--sc--container', {
        scratchType: SCRATCH_TYPE.CIRCLE,
        containerWidth: 300,//scContainer.offsetWidth,
        containerHeight: 300,
        imageForwardSrc: './assets/images/raspadinha.png',
        imageBackgroundSrc: premio,
        //htmlBackground: premio,
        clearZoneRadius: 40,
        nPoints: rand,
        pointSize: 4,
        callback: () => {
          this.disabled = false
          this.countAds = this.countAds + 1

          var pontos = user.attributes.pontos
          var rp = user.attributes.RP

          if (pontos > 0) {

            user.set('pontos', pontos = (pontos - 1));
            user.set('RP', rp = (rp + 1))

            user.save().then((response) => {

            }).catch((error) => {

            });

            if (vencedor.attributes.jogo != undefined) {
              vencedor.save().then(
                async (result) => {

                  const venceuBau = await this.alertController.create({
                    header: 'Parabéns',
                    message: 'Você recebeu um prêmio na raspadinha, confira a aba vencedores o status do seu prêmio.',
                    buttons: [
                      {
                        text: 'Ok',
                        handler: () => {

                        }
                      }
                    ]
                  });

                  venceuBau.present()

                },
                (error) => {

                }
              );

            }
          }

        }
      })

      // Init
      sc.init();
    });
  }

  trocaPremioBau() {

    const User = new Parse.User();
    const query = new Parse.Query(User);

    var iduser: String;
    iduser = Parse.User.current().id;


    query.get(iduser).then((user) => {

      var rp = user.attributes.RP

      if (rp < 2000) {

        this.semSaldo()

      } else {

        this.efetuarTrocaBau()

      }

    })

  }

  resetaCard() {
    //console.log(this.countAds)
    const scContainer = document.getElementById('js--sc--container')
    scContainer.innerHTML = ''

    const User = new Parse.User();
    const query = new Parse.Query(User);

    var iduser: String;
    iduser = Parse.User.current().id;

    query.get(iduser).then((user) => {

      var pontos = user.attributes.pontos
      var rp = user.attributes.RP

      if (pontos == 0) {
        document.getElementById("qtdPontos").innerHTML = 'Chances: ' + pontos;
        document.getElementById("qtdRp").innerHTML = ': ' + rp;
        this.createNewScratchCard()
      } else {
        this.createNewScratchCard()
      }

    });

    if (this.countAds == 3) {
    //  console.log('PUUMM, ANUNCIO NA CARA!!!')
      this.showInterstitial();
      this.countAds = 0
    }


  }
}
