import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [LoginGuard]
  },
  
  {
     path: '', loadChildren: () => import('./pages/redirector/redirector.module').then(m => m.RedirectorPageModule) 
  },

  {
    path: 'home-menu',
    loadChildren: () => import('./pages/home-menu/home-menu.module').then( m => m.HomeMenuPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ajustes',
    loadChildren: () => import('./pages/ajustes/ajustes.module').then( m => m.AjustesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'insumos-picking',
    loadChildren: () => import('./pages/insumos-picking/insumos-picking.module').then( m => m.InsumosPickingPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'insumos-entrada',
    loadChildren: () => import('./pages/insumos-entrada/insumos-entrada.module').then( m => m.InsumosEntradaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'insumos-distribuir',
    loadChildren: () => import('./pages/insumos-distribuir/insumos-distribuir.module').then( m => m.InsumosDistribuirPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'insumos-historial',
    loadChildren: () => import('./pages/insumos-historial/insumos-historial.module').then( m => m.InsumosHistorialPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'insumos-evidencias',
    loadChildren: () => import('./pages/insumos-evidencias/insumos-evidencias.module').then( m => m.InsumosEvidenciasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'insumos-inventario',
    loadChildren: () => import('./pages/insumos-inventario/insumos-inventario.module').then( m => m.InsumosInventarioPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'detalle-distribucion/:tienda/:semana/:anio',
    loadChildren: () => import('./pages/detalle-distribucion/detalle-distribucion.module').then(m => m.DetalleDistribucionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'redirector',
    loadChildren: () => import('./pages/redirector/redirector.module').then( m => m.RedirectorPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
