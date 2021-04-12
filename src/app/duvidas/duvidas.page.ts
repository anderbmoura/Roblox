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
      { expanded: false, title: "Sorteios", response: "O sorteio será realizado através do próprio sistema integrado do aplicativo, ao clicar no botão participar, o seu nome será encaminhado para o banco de dados. Acontecerá 1 sorteio por semana, cada participante poderá participar uma vez por dia do sorteios disponíveis. O ganhador será notificado via app por sistema de push. O ganhador deverá entrar em contato conosco no instagram @skins_leagueoflegends em até 24h, após esse período na ausência de contato, o prêmio será cancelado."},
      { expanded: false, title: "Recebimento do prêmio", response: "Após ser divulgado o vencedor o mesmo deverá entrar em contato no instagram @skins_leagueoflegends no prazo de 24 horas, caso o mesmo não realize o contato o prêmio será cancelado." },
      { expanded: false, title: "Baú aleatório", response: "Adicionaremos o ganhador em nossa conta pessoal no jogo e enviaremos o prêmio em forma de presente ou voucher" },
      { expanded: false, title: "Sorteios por semana", response: "No começo do skins iremos sortear apenas 650 RP por semana, conforme o app for crescendo e tenhamos mais usuários certamente aumentaremos o número de sorteios semanais para que fique melhor para todos." },
      { expanded: false, title: "Entre em contato", response: "@skins_leagueoflegends no instagram" }
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
