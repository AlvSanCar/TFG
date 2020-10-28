import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registrar',
    loadChildren: () => import('./registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path:'modificar/:matriculaID',
    loadChildren: () => import('./cuenta/modif-matricula/modif-matricula.module').then(m=>m.ModifMatriculaPageModule)
  },
  {
    path:'nuevaMat/:usrID',
    loadChildren: () => import('./cuenta/nueva-matricula/nueva-matricula.module').then(m=>m.NuevaMatriculaPageModule)
  },

  {
    path: 'cuenta',
    children:[
      {
        path:":usuario",
        loadChildren: () => import('./cuenta/cuenta.module').then( m => m.CuentaPageModule)
      },
      {
        path:"matricula/:matriculaID",
        loadChildren: () => import('./cuenta/matricula/matricula.module').then(m =>m.MatriculaPageModule)
      },
      

    ]
  },
  {
    path:"perfil/:usrID",
    loadChildren: () => import('./cuenta/perfil/perfil.module').then(m =>m.PerfilPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
