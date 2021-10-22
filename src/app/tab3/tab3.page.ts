import { DuvidasPage } from './../duvidas/duvidas.page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ToastController, LoadingController, ModalController, AlertController, ActionSheetController } from '@ionic/angular';

//firebase SDK import

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import 'firebase/database';

//import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
 export class Tab3Page implements OnInit {

//   data: any;

usuario: any


  constructor(public navCtrl: NavController, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, public modalController: ModalController,
    public alertController: AlertController,
  //  private ga: GoogleAnalytics,
    public actionSheetController: ActionSheetController) {


  }

  ngOnInit() {

    this.nomeUser();
    // this.desenhaIcone();
    // this.ga.trackView('List Page')
    //   .then(() => { })
    //   .catch(e => console.log(e));
  }

  
//   trackEvent(item) {
//   //  this.ga.trackEvent('Category', 'Tapped Action', 'Item Tapped is ' + item, 0);
//   }


//   ionViewWillEnter() {
//     this.nomeUser();
//   }

//   // desenhaIcone(){


//   //     const node = document.querySelector('.iconetrade')
//   //     node.classList.add('animated', 'fadeIn')

//   //     function handleAnimationEnd() {
//   //         node.classList.remove('animated', 'fadeIn')
//   //         node.removeEventListener('animationend', handleAnimationEnd)
//   //     }

//   //     node.addEventListener('animationend', handleAnimationEnd)


//   //   const User = new Parse.User();
//   //   const query = new Parse.Query(User);

//   //   query.get(Parse.User.current().id).then((user) => {

//   //     if(user.attributes.tradelink == '' || user.attributes.tradelink == undefined){
//   //       var $iconetrade = document.querySelector('.iconetrade'),
//   //       HTMLNovo = '<ion-icon size="large" name="close-circle-outline" slot="end" color="danger"></ion-icon>';
//   //       $iconetrade.innerHTML = HTMLNovo;
//   //     } else {
//   //       var $iconetrade = document.querySelector('.iconetrade'),
//   //       HTMLNovo = '<ion-icon size="large" name="checkmark-circle-outline" slot="end" color="success"></ion-icon>';
//   //       $iconetrade.innerHTML = HTMLNovo;
//   //       console.log(user.attributes.tradelink)
//   //     }
//   //   });
//   // }

//   async addTradeLink() {

//     const User = new Parse.User();
//     const query = new Parse.Query(User);

//     const alerta = await this.alertController.create({
//       header: 'Adicione seu trade link',
//       backdropDismiss: false,
//       inputs: [
//         {
//           name: 'tradelink',
//           type: 'text',
//           placeholder: 'por favor cole aqui seu trade link'
//         }
//       ],
//       buttons: [
//         {
//           text: 'Cancelar',
//           role: 'cancel',
//           cssClass: 'secondary',
//           handler: () => {
//             console.log('Confirm Cancel');
//           }
//         }, {
//           text: 'Ok',
//           handler: (tradeData) => {

//             query.get(Parse.User.current().id).then((user) => {

//               user.set('tradelink', tradeData.tradelink);
//               user.save().then(async (response) => {

//                 const toast = await this.toastCtrl.create({
//                   message: 'Trade link adicionado com sucesso!',
//                   duration: 2000
//                 });
//                 toast.present();

//                 //this.desenhaIcone();

//               }).catch((error) => {

//               });
//             });
//           }
//         }
//       ]
//     });

//     const actionSheet = await this.actionSheetController.create({
//       header: 'TRADE LINK',
//       buttons: [{
//         text: 'Adicionar link',
//         icon: 'add',
//         handler: () => {
//           alerta.present();
//         }
//       }, {
//         text: 'Remover link',
//         role: 'destructive',
//         icon: 'trash',
//         handler: async () => {

//           const User = new Parse.User();
//           const query = new Parse.Query(User);

//           query.get(Parse.User.current().id).then((user) => {

//             user.set('tradelink', '');
//             user.save().then(async (response) => {

//               const toast = await this.toastCtrl.create({
//                 message: 'Trade link removido com sucesso!',
//                 duration: 2000
//               });
//               toast.present();

//               //this.desenhaIcone();

//             }).catch((error) => {

//             });
//           });
//         }
//       },
//       {
//         text: 'Cancelar',
//         icon: 'close',
//         role: 'cancel',
//         handler: () => {
//           console.log('Cancel clicked');
//         }
//       }]
//     });
//     await actionSheet.present();
//   }




  async presentModal() {
    const modal = await this.modalController.create({
      component: DuvidasPage
    });
    return await modal.present();
  }



  logOut() {
    firebase.auth().signOut().then(res => {
      console.log(res)
      this.navCtrl.navigateForward('/login')
    }).catch((error) => {
      console.log(error)
    });
  }

  nomeUser() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.analytics().logEvent('seleção sorteio');

        var ref = firebase.database().ref('/users/'+user.uid)

    
        ref.once('value').then(async snapshot =>{

          console.log(snapshot.val())
          this.usuario = snapshot.val().robloxName
            
        })
      }
    })
  
    }

//   async avatarSend() {

//     const aguarde = await this.loadingCtrl.create({
//       spinner: "dots"
//     });

//     var fileUploadControl = document.getElementById('avatarImg');
//     var file = (<HTMLInputElement>fileUploadControl).files[0];

//     aguarde.present();

//     const User = new Parse.User();
//     const query = new Parse.Query(User);

//     // Finds the user by its ID
//     query.get(Parse.User.current().id).then((user) => {

//       // Updates the data we want
//       user.set('thumbnail', new Parse.File("avatar.png", file));

//       // Saves the user with the updated data
//       user.save().then((response) => {
//         (<HTMLInputElement>document.getElementById("avatarImgg")).src = user.attributes.thumbnail._url;
//         aguarde.dismiss();
//       }).catch((error) => {
//         aguarde.dismiss();
//       });
//     });
//   }

//   numerosdaSorte() {
//     this.navCtrl.navigateForward('/numerosdasorte')
//   }

  jaGanheiPage() {
    this.navCtrl.navigateForward('/jaganhei')
  }

//   trocaPontos() {
//     this.navCtrl.navigateForward('/trocapontos')
//   }

//   historico() {
//     this.navCtrl.navigateForward('/historico')
//   }

//   raspadinha() {
//     this.navCtrl.navigateForward('/raspadinha')
//   }

//   vencedores() {
//     this.navCtrl.navigateForward('/dota2')
//   }


//   async presentAlert() {
//     const alert = await this.alertController.create({
//       header: 'Invocador inexistente!',
//       message: '<strong>Por favor, verifique o nome digitado</strong>!!!',
//       buttons: [
//         {
//           text: 'Ok',
//           handler: () => {
//             return this.updateInvocator()
//           }
//         }
//       ],
//       backdropDismiss: false
//     });

//     await alert.present();
//   }

//   async champSave() {
//     const alert = await this.alertController.create({
//       header: 'Invocador atualizado!',
//       message: '<strong>Obrigado por atualizar seus dados.</strong>',
//       buttons: [
//         {
//           text: 'Ok',
//           handler: () => {

//           }
//         }
//       ],
//       backdropDismiss: false
//     });

//     await alert.present();
//   }

  async updateUserRoblox() {

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alterar nome',
        inputs: [
          {
            name: 'robloxName',
            type: 'text',
            placeholder: 'Digite seu novo @'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: (value) => {
              console.log(value.robloxName);


              firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                  firebase.analytics().logEvent('seleção sorteio');
          
                  firebase.database().ref('/users/'+user.uid).set({
                    robloxName: value.robloxName,
                    uid: user.uid
                  }).then(() => {
                    this.nomeUser()
                  })
          
                }
              })
            }
          }
        ]
      });
  
      await alert.present();
    



    
  }

//   async updateWinners(invocadorNome) {

//     const winners = Parse.Object.extend('winners');
//     const vencedor = new Parse.Query(winners);

//     var iduser: String;
//     iduser = Parse.User.current().id;

//     vencedor.equalTo("iduser", iduser);
//     vencedor.find().then(async (results) => {

//       for (let i = 0; i < results.length; i++) {

//       await vencedor.get(results[i].id).then((winner) => {
//           winner.set('nome', invocadorNome)
//           winner.save().then((response) => {

//             console.log(response)


//           }, (error) => {
//             console.log(error)
//           });

//         }).catch((error) => {

//           console.log(error)

//         });

//       }

//     }, (error) => {

//     });

//   }

  
//   async updateParticipate(invocadorNome) {

//     const participate = Parse.Object.extend('participate');
//     const participante = new Parse.Query(participate);

//     var iduser: String;
//     iduser = Parse.User.current().id;

//     participante.equalTo("iduser", iduser);
//     participante.find().then(async (results) => {

//       for (let i = 0; i < results.length; i++) {

//       await participante.get(results[i].id).then((winner) => {
//           winner.set('nome', invocadorNome)
//           winner.save().then((response) => {

//             console.log(response)


//           }, (error) => {
//             console.log(error)
//           });

//         }).catch((error) => {

//           console.log(error)

//         });

//       }

//     }, (error) => {

//     });

//   }


}


