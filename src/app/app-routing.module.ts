import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'add-product', loadChildren: './add-product/add-product.module#AddProductPageModule' },
  { path: 'post-details/:id', loadChildren: './post-details/post-details.module#PostDetailsPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'profilo-details/:id', loadChildren: './profilo-details/profilo-details.module#ProfiloDetailsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
