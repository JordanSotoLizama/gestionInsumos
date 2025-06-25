import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home-menu',
    loadChildren: () => import('./pages/home-menu/home-menu.module').then( m => m.HomeMenuPageModule)
  },
  {
    path: 'ajustes',
    loadChildren: () => import('./pages/ajustes/ajustes.module').then( m => m.AjustesPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'insumos-picking',
    loadChildren: () => import('./pages/insumos-picking/insumos-picking.module').then( m => m.InsumosPickingPageModule)
  },
  {
    path: 'insumos-entrada',
    loadChildren: () => import('./pages/insumos-entrada/insumos-entrada.module').then( m => m.InsumosEntradaPageModule)
  },
  {
    path: 'insumos-distribuir',
    loadChildren: () => import('./pages/insumos-distribuir/insumos-distribuir.module').then( m => m.InsumosDistribuirPageModule)
  },
  {
    path: 'insumos-historial',
    loadChildren: () => import('./pages/insumos-historial/insumos-historial.module').then( m => m.InsumosHistorialPageModule)
  },
  {
    path: 'insumos-evidencias',
    loadChildren: () => import('./pages/insumos-evidencias/insumos-evidencias.module').then( m => m.InsumosEvidenciasPageModule)
  },
  {
    path: 'insumos-inventario',
    loadChildren: () => import('./pages/insumos-inventario/insumos-inventario.module').then( m => m.InsumosInventarioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
