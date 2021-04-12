import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroPageModule' },
  { path: 'modal', loadChildren: './modal/modal.module#ModalPageModule' },
  { path: 'slides', loadChildren: './slides/slides.module#SlidesPageModule' },
  { path: 'league', loadChildren: './league/league.module#LeaguePageModule' },
  { path: 'counterstrike', loadChildren: './counterstrike/counterstrike.module#CounterstrikePageModule' },
  { path: 'duvidas', loadChildren: './duvidas/duvidas.module#DuvidasPageModule' },
  { path: 'numerosdasorte', loadChildren: './numerosdasorte/numerosdasorte.module#NumerosdasortePageModule' },
  { path: 'jaganhei', loadChildren: './jaganhei/jaganhei.module#JaganheiPageModule' },
  { path: 'dota2', loadChildren: './dota2/dota2.module#Dota2PageModule' },
  { path: 'trocapontos', loadChildren: './trocapontos/trocapontos.module#TrocapontosPageModule' },
  { path: 'historico', loadChildren: './historico/historico.module#HistoricoPageModule' },
  { path: 'roleta', loadChildren: './roleta/roleta.module#RoletaPageModule' },
  { path: 'raspadinha', loadChildren: './raspadinha/raspadinha.module#RaspadinhaPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
