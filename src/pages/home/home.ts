import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TarefasProvider } from '../../providers/tarefas/tarefas';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tarefas = [];

  constructor(public navCtrl: NavController,
    public provedor: TarefasProvider,
    public alertCtrl: AlertController,
    private socialSharing: SocialSharing
  ) {
  }

  listar() {
    this.provedor.listar().then(
      data => {
        console.log(data);
        this.tarefas = data;
      }
    )
  }

  ionViewDidLoad() {
    this.listar();
  }

  finalizar(id) {
    this.provedor.remover(id).then(
      () => {
        this.listar();
      }
    );
  }

  adicionar() {
    const popup = this.alertCtrl.create({
      title: 'Tarefa',
      message: "Qual tarefa você precisa realizar?",
      inputs: [
        {
          name: 'descricao',
          placeholder: 'Tarefa'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Gravar',
          handler: data => {
            this.provedor.adicionar(data.descricao).then(
              () => {
                this.listar();
              }
            );
          }
        }
      ]
    });
    popup.present();
  }

  compartilhar(texto) {
    this.socialSharing.share(texto);
  }
}
