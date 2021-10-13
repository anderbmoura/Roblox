import { Component, OnInit } from '@angular/core';
import { Parse } from 'parse';
import { HttpClient } from '@angular/common/http';


//firebase SDK import

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import 'firebase/database';


//import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public vencedoresList: any = [];
  public vencedoresListCS: any = [];
  public vencedoresListDOTA: any = [];

  constructor(

    private http: HttpClient,
   // private ga: GoogleAnalytics

  ) {


  }

  ngOnInit() {
    this.vencedoresLOL();
    // this.ga.trackView('List Page')
    // .then(() => {})
    // .catch(e => console.log(e));
  }

  // trackEvent(item) {
  //   this.ga.trackEvent('Category', 'Tapped Action', 'Item Tapped is '+item, 0);
  // }
  async vencedoresLOL() {

    var montaVencedores = []

      firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.analytics().logEvent('seleção sorteio');

        var ref = firebase.database().ref('/winner')

    
        ref.once('value').then(async snapshot =>{
            snapshot.forEach(value => {
            montaVencedores.push(
                value.val()
           )
          })
          for(let vencedores of montaVencedores){
            console.log(vencedores)
            for(let i = 0; i < vencedores.length; i++){
            await  this.vencedoresList.push({
                  color:      vencedores[i].color,
                  robloxname: vencedores[i].robloxName,
                  status:     vencedores[i].status,
                  premio:     vencedores[i].premio
            })
          }
         }
        })
      }
    })


    console.log(this.vencedoresList)

  }

  doRefresh(event){
    console.log(event)

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  

  //   async vencedoresCS() {
    // color:      value.val().color,
    // robloxname: value.val().robloxname,
    // status:     value.val().status

  //     const winners = Parse.Object.extend('winners');
  //     const query = new Parse.Query(winners);
  //     query.equalTo("jogo", "CS");
  //     const result = await query.find();

  //     for (const item of result) {
  //       this.vencedoresListCS.push({
  //         nomeCS: item.attributes.nome,
  //         nomeJogoCS: item.attributes.jogo
  //       })

  //     }
  // ;
  //   }

  //   async vencedoresDOTA() {


  //     const winners = Parse.Object.extend('winners');
  //     const query = new Parse.Query(winners);
  //     query.equalTo("jogo", "DOTA");
  //     const result = await query.find();

  //     for (const item of result) {
  //       this.vencedoresListDOTA.push({
  //         nomeDOTA: item.attributes.nome,
  //         nomeJogoDOTA: item.attributes.jogo
  //       })
  //     }
  // ;
  //   }


}
