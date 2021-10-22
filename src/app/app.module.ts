import { DuvidasPageModule } from './duvidas/duvidas.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AdMobFree } from '@ionic-native/admob-free/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdmobFreeService } from '../service/admobfree.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CacheModule } from 'ionic-cache';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { LoadingModelComponent } from './components/loading-model/loading-model.component';

import { FCM } from '@ionic-native/fcm/ngx';
import { IonicStorageModule } from '@ionic/storage';




@NgModule({
  
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, FormsModule, IonicStorageModule.forRoot(), 
     DuvidasPageModule, HttpModule, HttpClientModule, CacheModule.forRoot(), ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    AdMobFree,
    FCM,
    LoadingModelComponent,
    AdmobFreeService,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    OneSignal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
