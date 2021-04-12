import { Component, OnInit } from '@angular/core';
import { Parse } from 'parse';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  progress = 0
  buffer = 0

  public cardLOL: any = [];
  public bairro: String;
  public progresso = 0
  public buffering = 0


   constructor(
    public alertController: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private http: Http,
    public httpClient: HttpClient,
    private ga: GoogleAnalytics,
    private iab: InAppBrowser
  ) {
    
    
      this.contaUsers()

  }



// async buscaTorneios(){
//   const axios = require('axios');

//   const searchApi = await axios.create({
//     baseURL: 'https://enable-cors.awesomeapi.com.br/api?u=https://gamersclub.gg/'
// })


// const functions = {
//   getOpenTournaments: async () => {
//       const response = await searchApi.get('lol/tournaments?tab=all&status=open');
//       return response.data;
//   },
//   getUpComingTournaments: async () => {
//       const response = await searchApi.get('lol/tournaments?tab=all&status=upcoming');
//       return response.data.tournaments;
//   },
//   getStaffPicks: async () => {
//       const response = await searchApi.get(`spotlight?type=discovery`);
//       return response.data;
//   }
// }


// console.log(functions.getUpComingTournaments())

// }

async contaUsers(){


  var numUsers = Parse.Object.extend("User");
  var query = new Parse.Query(numUsers);
  await query.count().then(count => {
      this.progresso = count
      this.progresso = ((this.progresso*100)/4000)/100
      this.buffering = ((this.progresso*100)/4000)/100
  });

  console.log(this.progresso)
  this.progress = this.progresso
  this.buffer = this.buffering

}



  ngOnInit() {

   

    this.numParticipantes();
    this.progressBarCheck();
    this.invocador();
    //this.buscaTorneios()
    // this.numParticipantescs();

    this.ga.trackView('List Page')
    .then(() => {})
    .catch(e => console.log(e));
  }

  trackEvent(item) {
    this.ga.trackEvent('Category', 'Tapped Action', 'Item Tapped is '+item, 0);
  }

  openWebpage(url: string) {

    // Opening a URL and returning an InAppBrowserObject
    const browser = this.iab.create(url, "_system", "location=yes");

   // Inject scripts, css and more with browser.X
  }

  

  ionViewDidLeave() {
    this.numParticipantes();
    //this.numParticipantescs();
  }

  numParticipantes() {

    var numpart = Parse.Object.extend("participate");
    var query = new Parse.Query(numpart);
    query.equalTo("game", 'LOL');
    query.count().then(count => {

     // document.getElementById("npart").innerHTML = Math.round((count / 2)) + ' PARTICIPANTES';

    });
  }

  progressBarCheck() {

  }


  // numParticipantescs(){

  //   var numpart = Parse.Object.extend("participate");
  //   var query = new Parse.Query(numpart);
  //   query.equalTo("game", 'CS');
  //   query.count().then(count => {

  //     document.getElementById("npartcs").innerHTML= Math.round((count/2))+' PARTICIPANTES';

  //   });
  // }

  goLeague() {
    this.navCtrl.navigateForward('/league')
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Invocador inexistente!',
      message: '<strong>Por favor, verifique o nome digitado</strong>!!!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            return this.invocador()
          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }

  async champSave() {
    const alert = await this.alertController.create({
      header: 'Invocador cadastrado!',
      message: '<strong>Obrigado por registrar seu invocador.</strong>',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            return this.invocador()
          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }

  async invocador() {
    const User = new Parse.User();
    const query = new Parse.Query(User);

    var iduser: String;
    iduser = Parse.User.current().id;

    query.get(iduser).then(async (user) => {

      if (user.attributes.invocador == undefined || user.attributes.invocador == '') {

        const alert = await this.alertController.create({
          header: 'Atualização nome de invocador',
          subHeader: 'Por favor, digite corretamente seu nome de invocador, procure digitar exatamente como esta no League of Legends, com espaços e etc.',
          inputs: [
            {
              name: 'invocador',
              type: 'text',
              placeholder: 'SEU INVOCADOR'
            }
          ],
          buttons: [ {
              text: 'Salvar',
              handler: (alertData) => {

                const User = new Parse.User();
                const query = new Parse.Query(User);

                this.http.get('https://enable-cors.awesomeapi.com.br/api?u=https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + alertData.invocador + '?api_key=RGAPI-9b06beb2-d9b0-4692-aa2c-1f154f282131').subscribe((res) => {

                  var dados = JSON.parse((<any>res)._body)

                  console.log(dados)

                  query.get(iduser).then((user) => {

                    user.set('invocador', alertData.invocador);
                    user.set('summonerLVL', dados.summonerLevel.toString());
                    user.set('EncryptedID', dados.id);
                    user.set('accountID', dados.accountId);
                    user.set('RP', 0);
                    user.set('pontos', 0)

                    user.save().then((response) => {

                      this.champSave();

                    }).catch((error) => {

                    });
                  });


                },
                  error => {
                    if (error.status == 404) {

                      this.presentAlert()

                    }
                  },


                )//fecha o subscribe


              }
            }
          ],
          backdropDismiss: false
        });

        await alert.present();

      }
    })
  };


 
}
//
 //console.log(champions.data[chave].name + ' Key: '+champions.data[chave].key+' '+champions.data[chave].image.full)