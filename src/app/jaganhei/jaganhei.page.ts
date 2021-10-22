import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import Parse from 'parse';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import 'firebase/database';

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


  async vencedorPage() {

    const user = firebase.auth().currentUser;

    if (user) {

      var username = firebase.database().ref('/winner/'+user.uid)
      username.once('value', async (snapshot) =>{

        console.log(user.uid)

        
        snapshot.forEach(value => {
          console.log(value.val())
          this.vencedoresInd.push(
              value.val()
         )
        })

        console.log(this.vencedoresInd)

        for(let vencedores of this.vencedoresInd){
          console.log(vencedores)
          for(let i = 0; i < vencedores.length; i++){
          await  this.vencedoresInd.push({
                color:      vencedores[i].color,
                robloxname: vencedores[i].robloxName,
                status:     vencedores[i].status,
                premio:     vencedores[i].premio,
                data:       vencedores[i].data
          })
        }
       }

      }
    )}
    }
  }



