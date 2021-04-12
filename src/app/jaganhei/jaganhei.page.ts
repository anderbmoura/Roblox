import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import Parse from 'parse';

@Component({
  selector: 'app-jaganhei',
  templateUrl: './jaganhei.page.html',
  styleUrls: ['./jaganhei.page.scss'],
})
export class JaganheiPage implements OnInit {

  public vencedoresInd: any = [];

  constructor() { }

  ngOnInit() {


    this.vencedorPage();

  }

  async jaGanhei() {

    var idd: String;
    idd = Parse.User.current().id;


    const winners = Parse.Object.extend('winners');
    const query = new Parse.Query(winners);
    query.equalTo("iduser", idd);
    query.descending("createdAt");
    const result = await query.find();
    query.find().then((results) => {

      console.log(results[0]);
      console.log("Sua utlima vitoria foi no jogo " + results[0].attributes.jogo + " no dia " + results[0].createdAt.getDate() + "/" + results[0].createdAt.getMonth() + "/" + results[0].createdAt.getFullYear());

    }, (error) => {

    });



  }

  async vencedorPage() {

    var iduser: String;
    iduser = Parse.User.current().id;



    const winners = Parse.Object.extend('winners');
    const query = new Parse.Query(winners);
    query.equalTo("iduser", iduser);
    query.descending("createdAt");
    const result = await query.find();

    for (const item of result) {
      this.vencedoresInd.push({
        nome: item.attributes.nome,
        jogo: item.attributes.jogo,
        dataDia: item.createdAt.getDate(),
        dataMes: (item.createdAt.getMonth()) + 1,
        dataAno: item.createdAt.getFullYear(),
        imagem: item.attributes.thumnail

      })
    }
    ;
  }


}
