import { Component, OnInit, computed, signal } from '@angular/core';
import {
  IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent, IonHeader, IonIcon, IonImg, IonSearchbar, IonSegment, IonSegmentButton, IonLabel,
  IonSkeletonText, IonSpinner, IonTitle, IonToolbar, ToastController
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addCircleOutline, alertCircleOutline, fastFoodOutline, refreshOutline } from 'ionicons/icons';
import { Categoria, Producto } from '../../models/producto.model';
import { MenuService } from '../../services/menu.service';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrl: 'menu.page.css',
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonSegment, IonSegmentButton, IonLabel,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonButton, IonIcon,
    IonBadge, IonSpinner, IonSkeletonText
  ]
})
export class MenuPage implements OnInit {
  categorias = signal<Categoria[]>([]);
  productos = signal<Producto[]>([]);
  cargando = signal(true);
  error = signal('');
  categoriaActiva = signal('todos');
  busqueda = signal('');
  imagenesFallidas = signal<number[]>([]);
  esqueletos = [1, 2, 3];

  // Lista filtrada por categoría y por texto del buscador
  filtrados = computed(() => {
    const cat = this.categoriaActiva();
    const texto = this.busqueda().trim().toLowerCase();
    return this.productos().filter(p =>
      (cat === 'todos' || p.categoria === cat) &&
      (p.nombre.toLowerCase().includes(texto) || p.descripcion.toLowerCase().includes(texto))
    );
  });

  constructor(
    private menuService: MenuService,
    private pedido: PedidoService,
    private toastCtrl: ToastController
  ) {
    addIcons({ addCircleOutline, alertCircleOutline, fastFoodOutline, refreshOutline });
  }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.error.set('');
    this.menuService.obtenerMenu().subscribe({
      next: data => {
        this.categorias.set(data.categorias);
        this.productos.set(data.productos);
        this.cargando.set(false);
      },
      error: (e: Error) => {
        this.error.set(e.message);
        this.cargando.set(false);
      }
    });
  }

  alBuscar(ev: Event): void {
    const valor = (ev as CustomEvent).detail?.value ?? '';
    this.busqueda.set(valor);
  }

  alCambiarCategoria(ev: Event): void {
    this.categoriaActiva.set(String((ev as CustomEvent).detail.value));
  }

  nombreCategoria(id: string): string {
    return this.categorias().find(c => c.id === id)?.nombre ?? id;
  }

  falloImagen(id: number): void {
    this.imagenesFallidas.update(l => [...l, id]);
  }

  async agregar(p: Producto): Promise<void> {
    this.pedido.agregar(p);
    const toast = await this.toastCtrl.create({
      message: `${p.nombre} agregado al pedido`,
      duration: 1500,
      position: 'top',
      color: 'secondary'
    });
    await toast.present();
  }
}