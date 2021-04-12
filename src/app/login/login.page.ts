import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform, ToastController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import Parse from 'parse';

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

  constructor(private navCtrl: NavController, 
    public platform: Platform, public toastCtrl: ToastController, public alertCtrl: AlertController,
    public loadingCtrl : LoadingController) {

  let install = new Parse.Installation();
  install.set("deviceType", this.platform.platforms().toString());

  install.save(null, {
    success: (install) => {
      // Execute any logic that should take place after the object is saved.
      this.result = 'New object created with objectId: ' + install.id;
    },
    error: (install, error) => {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      this.result = ('Failed to create new object, with error code:' + error.message.toString());
    }
  });
     }

  ngOnInit() {

    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

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

    const campoVazio = await this.toastCtrl.create({
      message: 'Verifique o e-mail digitado.',
      duration: 2000
    });

   

      const alert = await this.alertCtrl.create({
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
            
            Parse.User.requestPasswordReset(passData.pass).then(async function() {

              await redefinirOK.present();
              await aguardeRecover.dismiss();

            }).catch(async function(error) {

              var erro: String = error.code

                aguardeRecover.dismiss();
                campoVazio.present();


              
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

    Parse.User.logIn(this.username, this.password).then(async (user) => {

      if(user.get('emailVerified')) {

        var verificaID: String;
        verificaID = Parse.User.current().id;
    
        const slides = Parse.Object.extend('slides');
        const query = new Parse.Query(slides);
        query.equalTo("iduser", verificaID);
        query.find().then((results) => {
    
          if(typeof document !== 'undefined'){
            aguarde.dismiss();
            this.navCtrl.navigateRoot('/slides');
          }

          if(results[0].attributes.iduser == Parse.User.current().id){
            aguarde.dismiss();    
            this.navCtrl.navigateRoot('/');
          }  
          
            console.log(results);
            }, (error) => {
              console.log("ERRO");
            });

        
      } else {
        await aguarde.dismiss();
        Parse.User.logOut().then((resp) => {
          console.log('Logged out successfully', resp);
        }, err => {
          console.log('Error logging out', err);
        });

        const alert = await this.alertCtrl.create({
          header: 'Atenção',
          message: 'Você precisa verificar seu e-mail.',
          buttons: ['Ok']
        });
        await alert.present();
      }
    }, async err => {
      aguarde.dismiss();
      console.log('Error logging in', err.code);

      const toast = await this.toastCtrl.create({
        message: 'Login/senha inválidos.',
        duration: 2000
      });
      toast.present();
      await aguarde.dismiss();
    });
  }

}
