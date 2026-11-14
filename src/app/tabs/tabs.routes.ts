import type { Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'menu', title: 'Menú',
        loadComponent: () => import('../pages/menu/menu.page').then((m) => m.MenuPage),
      },
      {
        path: 'pedido', title: 'Mi pedido',
        loadComponent: () => import('../pages/pedido/pedido.page').then((m) => m.PedidoPage),
      },
      {
        path: 'sucursales', title: 'Sucursales',
        loadComponent: () => import('../pages/sucursales/sucursales.page').then((m) => m.SucursalesPage),
      },
 
      {
        path: '',
        redirectTo: '/tabs/menu',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/menu',
    pathMatch: 'full',
  },
];
