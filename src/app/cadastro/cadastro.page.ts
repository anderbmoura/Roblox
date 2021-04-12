import { Component, OnInit } from '@angular/core';
import Parse from 'parse';
import { Platform, ToastController, NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  formlogin: FormGroup;
  form: FormGroup;
  result: string;
  username: string;
  password: string;
  email: string;
  codigo: string;

  constructor(public platform: Platform, public toastCtrl: ToastController, private navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder) {


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


  }

  //{apelido: this.apelido},


  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }


  cadastroCodigo() {

    if (this.codigo == undefined || this.codigo == '') {
      //não faz nada
    } else {

      //ZERA TODAS AS PARTICIPAÇÕES DO USUÁRIOS PARA QUE POSSA PARTICIPAR DE NOVO.
      const participate = Parse.Object.extend('participate');
      const query = new Parse.Query(participate);
      query.equalTo('iduser', this.codigo);
      // here you put the objectId that you want to update

      query.find().then(async (results) => {

        for (const i in results) {
          const item = results[i];

          console.log(item.id);

          const entry = await query.get(item.id);
          entry.set('participando', 0);
          await entry.save();
        }
      });

    }
  }

  signUp() {

    Parse.User.signUp(this.username, this.password, { email: this.email }).then(async (resp) => {
      this.cadastroCodigo();

      const aguarde = await this.loadingCtrl.create({
        spinner: "dots",
        message: "criando sua conta..."
      });

      await aguarde.present();

      // Clears up the form
      this.username = '';
      this.password = '';
      this.email = '';
      this.codigo = '';

      const toast = await this.toastCtrl.create({
        message: 'Conta criada com sucesso, verifique seu e-mail para ativar sua conta.',
        duration: 4000
      });

      toast.present();
      await aguarde.dismiss();
      this.navCtrl.navigateForward('/login')


    }, async err => {

      let error = 'Login ou e-mail já cadastrados'

      const aguarde = await this.loadingCtrl.create({
        spinner: "dots",
        message: "aguarde..."
      });

      await aguarde.present();

      const toast = await this.toastCtrl.create({
        message: error,
        duration: 2000
      });
      toast.present();
      await aguarde.dismiss();
    });
  }

}
