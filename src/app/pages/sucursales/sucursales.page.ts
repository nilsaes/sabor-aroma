import { Component, OnInit, signal } from '@angular/core';
import {
  IonAccordion, IonAccordionGroup, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel,
  IonSkeletonText, IonSpinner, IonTitle, IonToolbar
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { alertCircleOutline, callOutline, locationOutline, refreshOutline, timeOutline } from 'ionicons/icons';
import { Sucursal } from '../../models/sucursal.model';
import { SucursalesService } from '../../services/sucursales.service';

@Component({
  selector: 'app-sucursales',
  templateUrl: 'sucursales.page.html',
  styleUrl: 'sucursales.page.css',
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonAccordionGroup, IonAccordion, IonItem, IonLabel,
    IonIcon, IonButton, IonSpinner, IonSkeletonText
  ]
})
export class SucursalesPage implements OnInit {
  sucursales = signal<Sucursal[]>([]);
  cargando = signal(true);
  error = signal('');

  constructor(private service: SucursalesService) {
    addIcons({ locationOutline, timeOutline, callOutline, alertCircleOutline, refreshOutline });
  }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.error.set('');
    this.service.obtenerSucursales().subscribe({
      next: data => { this.sucursales.set(data); this.cargando.set(false); },
      error: (e: Error) => { this.error.set(e.message); this.cargando.set(false); }
    });
  }
}