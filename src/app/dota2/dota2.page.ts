import { Component, OnInit } from '@angular/core';
import { Parse } from 'parse';
import { HttpClient } from '@angular/common/http';

import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-dota2',
  templateUrl: './dota2.page.html',
  styleUrls: ['./dota2.page.scss'],
})
export class Dota2Page implements OnInit {

  public vencedoresList: any = [];
  public vencedoresListCS: any = [];
  public vencedoresListDOTA: any = [];

  constructor(

    private http: HttpClient,
    private ga: GoogleAnalytics

  ) {


  }

  ngOnInit() {
    this.vencedoresLOL();
    this.ga.trackView('List Page')
    .then(() => {})
    .catch(e => console.log(e));
  }

  trackEvent(item) {
    this.ga.trackEvent('Category', 'Tapped Action', 'Item Tapped is '+item, 0);
  }
  async vencedoresLOL() {

    const winners = Parse.Object.extend('winners');
    const query = new Parse.Query(winners);
    query.equalTo("jogo", "LOL");
    const result = await query.find();

    for (const item of result) {

      this.vencedoresList.push({

        nomeLOL: item.attributes.nome,
        venceuEm: item.createdAt,
        status: item.attributes.pago,
        color: item.attributes.color,
        premio: item.attributes.premio
      })
    }
    ;
  }

  //   async vencedoresCS() {


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
