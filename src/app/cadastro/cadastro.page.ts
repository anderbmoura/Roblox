import { Component, OnInit } from '@angular/core';
import { Platform, ToastController, NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { LoadingModelComponent } from '../components/loading-model/loading-model.component';

//firebase import
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import 'firebase/database';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public signupForm: FormGroup;
  result: string;

  constructor(public platform: Platform, public toastCtrl: ToastController, private navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    private load: LoadingModelComponent) {
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      robloxName: new FormControl(null, [Validators.required])
    })

   

  }

  //{apelido: this.apelido},


  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  signUp() {


    this.load.loadPresent()

    firebase.auth().createUserWithEmailAndPassword(this.signupForm.get("email").value, this.signupForm.get("password").value).then(async (userCredential) => {
   

      const aguarde = await this.loadingCtrl.create({
        spinner: "dots",
        message: "criando sua conta..."
      });

      await aguarde.present();

      firebase.database().ref('/users/'+userCredential.user.uid).set({
        robloxName: this.signupForm.get("robloxName").value,
        uid: userCredential.user.uid
      })

      const toast = await this.toastCtrl.create({
        message: 'Conta criada com sucesso, verifique seu e-mail para ativar sua conta.',
        duration: 4000
      });

      toast.present();
      await aguarde.dismiss();
      this.navCtrl.navigateForward('/login')


    }).catch((error) => {
      this.load.loadHide()
      console.log(error)
    })
    
   }

}
