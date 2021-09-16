import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading-model',
  templateUrl: './loading-model.component.html',
  styleUrls: ['./loading-model.component.scss'],
})
export class LoadingModelComponent {

  constructor(public loadingController: LoadingController) { }

  async loadPresent() {
    const loading = await this.loadingController.create({
      message: '<ion-img src="../../../assets/loading/loading.gif" alt="Carregando..."></ion-img>',
      cssClass: 'scale-down-center',
      translucent: true,
      showBackdrop: false,
      spinner: null,
    }).then((res) => {
      res.present();
    });
    
  }


loadHide() {

  this.loadingController.dismiss()
  
}



}
