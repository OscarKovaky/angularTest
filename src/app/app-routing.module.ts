import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa los componentes correspondientes
import { LoginComponent } from './login/login.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio-sesion', pathMatch: 'full' }, // Redirige a la página de inicio de sesión por defecto
  { path: 'inicio-sesion', component: LoginComponent },
  { path: 'resultados', component: ResultadosComponent },
  { path: 'registro', component: RegistroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
