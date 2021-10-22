import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
ModalController

@Component({
  selector: 'app-duvidas',
  templateUrl: './duvidas.page.html',
  styleUrls: ['./duvidas.page.scss'],
})
export class DuvidasPage implements OnInit {

  public items: any = [];

  constructor(
    public modalController: ModalController
  ) { 

    this.items = [
      { expanded: false, title: "Sorteios", response: "O sorteio de 50 Robux é realizado diariamente com divulgação do vencedor as 22h do mesmo dia. Enquanto o sorteio mensal é realizado todo final do mês as 22h."},
      { expanded: false, title: "Recebimento do prêmio", response: "Após ser divulgado o vencedor o mesmo deverá entrar em contato no instagram @sorteiagames ou através do grupo no roblox chamado My roblox 4ever. Também é possível adicionar o usuário sorteiagames games no jogo e chama-lo no chat" },
      { expanded: false, title: "Grupo Roblox", response: "Para receber o prêmio é preciso estar em nosso grupo do roblox chamado My roblox 4ever" },
      { expanded: false, title: "Mudei meu @", response: "Se você alterou seu @ antes de receber o prêmio, o mesmo não será entregue." },
      { expanded: false, title: "Entre em contato", response: "@sorteiagames no instagram, @sorteiagames no Roblox ou contato.sorteiagames@gmail.com" }
      
    ];

  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  

}
