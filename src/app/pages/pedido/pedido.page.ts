import { Component } from '@angular/core';
import {
  AlertController, IonBadge, IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonIcon,
  IonTitle, IonToolbar, ToastController
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline, cartOutline, removeOutline, trashOutline } from 'ionicons/icons';
import { ItemPedido } from '../../models/pedido.model';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: 'pedido.page.html',
  styleUrl: 'pedido.page.css',
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonButton, IonIcon, IonBadge]
})
export class PedidoPage {
  constructor(
    public pedido: PedidoService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    addIcons({ addOutline, removeOutline, trashOutline, cartOutline });
  }

  subtotal(i: ItemPedido): number {
    return i.producto.precio * i.cantidad;
  }

  async eliminar(i: ItemPedido): Promise<void> {
    this.pedido.eliminar(i.producto.id);
    await this.mostrarToast(`${i.producto.nombre} eliminado del pedido`);
  }

  async confirmarVaciar(): Promise<void> {
    const alerta = await this.alertCtrl.create({
      header: 'Vaciar pedido',
      message: '¿Seguro que quieres quitar todos los productos?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Vaciar',
          role: 'destructive',
          handler: () => {
            this.pedido.vaciar();
            this.mostrarToast('Pedido vaciado');
          }
        }
      ]
    });
    await alerta.present();
  }

  private async mostrarToast(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({ message, duration: 1500, position: 'top', color: 'secondary' });
    await toast.present();
  }
}
