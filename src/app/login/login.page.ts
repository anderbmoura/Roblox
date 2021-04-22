import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform, ToastController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


//import SDK firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import 'firebase/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup;

  result: string;
  username: string;
  password: string; 
  email: string;
  isSigningup: boolean;

  constructor(
    private navCtrl: NavController, 
    public platform: Platform, public toastCtrl: ToastController, public alertCtrl: AlertController,
    public loadingCtrl : LoadingController
    ) {
     }


  ngOnInit() {

    firebase.analytics().logEvent('Tela Login');
    
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    // firebase.auth().onAuthStateChanged(function(user) {

    //   if (user) {

    //     this.navCtrl.navigateRoot('/');  

    //   } else {

    //     console.log("Não esta logado")

    //   }
    // });

  }

  cadastro(){

    this.navCtrl.navigateForward('/cadastro')

  }

  async recoverPass(){



    const aguardeRecover = await this.loadingCtrl.create({
      spinner: "dots"
    });

    const redefinirOK = await this.alertCtrl.create({
      header: 'E-mail enviado.',
      message: 'Agora é só verificar sua caixa de entrada.',
      buttons: ['Ok']
    });

    const invalidMail = await this.alertCtrl.create({
      header: 'Verifique o e-mail.',
      message: 'E-mail não encontrado ou inexistente. Por favor, verifique e tente novamente.',
      buttons: ['Ok']
    });

    const campoVazio = await this.toastCtrl.create({
      message: 'Verifique o e-mail digitado.',
      duration: 2000
    });

   

      const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Recuperação de senha',
      subHeader: 'Digite seu endereço de e-mail para recuperar sua senha.',
      inputs: [
        {
          name: 'pass',
          type: 'text',
          placeholder: 'endereço de email'
        }
      ],
      buttons : [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok' ,
          handler : async (passData) => {

            await aguardeRecover.present();


            
    firebase.auth().sendPasswordResetEmail(passData.pass).then(async function() {

      await redefinirOK.present();
      await aguardeRecover.dismiss();
      
    }).catch(async function(error) {

      var erro: String = error.code

      if(error.message = "The email address is badly formatted."){
        await invalidMail.present()
      }

        aguardeRecover.dismiss();
      
    });
            
          }
        }
      ]
    });
    await alert.present();

  
  }

  async signIn() {


    const aguarde = await this.loadingCtrl.create({
      spinner: "dots",
      message: "Entrando..."
    });

    await aguarde.present();

 
    firebase.auth().signInWithEmailAndPassword(this.authForm.get('email').value, this.authForm.get('password').value)
  .then((userCredential) => {

    aguarde.dismiss();   
    this.navCtrl.navigateRoot('/');
   
  })
  .catch(async (error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    aguarde.dismiss();
    console.log('Error logging in', errorCode);

    const toast = await this.toastCtrl.create({
      message: 'Login/senha inválidos.',
      duration: 2000
    });
    toast.present();
    await aguarde.dismiss();

  });
}
  
}
