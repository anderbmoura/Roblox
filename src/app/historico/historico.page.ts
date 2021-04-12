import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import * as _ from 'lodash';
import { Parse } from 'parse';

import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
    selector: 'app-historico',
    templateUrl: './historico.page.html',
    styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

    public partidasList: any = [];

    public partidaS: any = [];

    public teste = [];

    public dadosGerais = []

    constructor(public httpClient: HttpClient, private ga: GoogleAnalytics) { }

    ngOnInit() {

        this.partidasLOL();

        this.ga.trackView('List Page')
        .then(() => {})
        .catch(e => console.log(e));
      }
    
      trackEvent(item) {
        this.ga.trackEvent('Category', 'Tapped Action', 'Item Tapped is '+item, 0);
      }




    async partidasLOL() {

        const User = new Parse.User();
        const query = new Parse.Query(User);

        let iduser: String;
        iduser = Parse.User.current().id;

        const user = await query.get(iduser);
        const accountId = user.attributes.accountID;

        const partidaT = [];

        const { data: resC } = await axios.get('https://enable-cors.awesomeapi.com.br/api?u=http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion.json');

        const formed = Object.values(resC.data).reduce((prev, curr) => Object.assign(prev, { [(<any>curr).key]: curr }), {})

        const { data: partidas } = await axios.get('https://enable-cors.awesomeapi.com.br/api?u=https://br1.api.riotgames.com/lol/match/v4/matchlists/by-account/' + user.attributes.accountID + '?api_key=RGAPI-9b06beb2-d9b0-4692-aa2c-1f154f282131');

        for (var i = 0; i < 10; i++) {
            partidaT.push({
                champion: partidas.matches[i].champion,
                gameId: partidas.matches[i].gameId
            })
        }

        // buscando dados de cada partida que o player jogou KDA
        for (const id of partidaT) {
            const { data: infoPartida } = await axios.get(`https://enable-cors.awesomeapi.com.br/api?u=https://br1.api.riotgames.com/lol/match/v4/matches/${id.gameId}?api_key=RGAPI-9b06beb2-d9b0-4692-aa2c-1f154f282131`);

            const partInfo = infoPartida.participantIdentities[_.findIndex(infoPartida.participantIdentities, { player: { accountId } })];
            const participanteInfo = infoPartida.participants[_.findIndex(infoPartida.participants, { participantId: partInfo.participantId })];

            this.partidaS.push({
                matou: participanteInfo.stats.kills,
                morreu: participanteInfo.stats.deaths,
                ajudou: participanteInfo.stats.assists,
                name: formed[id.champion].name,
                png: formed[id.champion].image.full
            });
        }


    }

}
