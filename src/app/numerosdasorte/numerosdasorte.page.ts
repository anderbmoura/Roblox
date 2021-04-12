import { Component, OnInit } from '@angular/core';
import Parse from 'parse';

@Component({
  selector: 'app-numerosdasorte',
  templateUrl: './numerosdasorte.page.html',
  styleUrls: ['./numerosdasorte.page.scss'],
})
export class NumerosdasortePage implements OnInit {

  public numSorte: any = [];

  constructor() { }

  ngOnInit() {
    this.numerosSorte();
  }


  
  async numerosSorte() {

    var idd: String;
    idd = Parse.User.current().id;

    
    const participate = Parse.Object.extend('participate');
    const query = new Parse.Query(participate);
    query.equalTo("iduser", idd);
    const result = await query.find();

    for (const item of result) {
      this.numSorte.push({
        bilheteSorte: item.attributes.bilheteSorte
      })
    }

    // if(typeof document !== 'undefined'){
    //   console.log("sem numero da sorte");
    // }
    
    
;
  }

}
