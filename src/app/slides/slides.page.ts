import { Component, OnInit } from '@angular/core';
import { Parse } from 'parse';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

 

  constructor(private navCtrl: NavController) { 

  }

  ngOnInit() {


  }


  verificaSlide(){

    var idd: String;
    idd = Parse.User.current().id;

    const slides = Parse.Object.extend('slides');
    const myNewObject = new slides();
    
    myNewObject.set('iduser', idd);
    
    myNewObject.save().then(
      (result) => {

      },
      (error) => {

      }
    );

    this.navCtrl.navigateRoot('/')


  }



}
