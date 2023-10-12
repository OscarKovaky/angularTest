import { Component } from '@angular/core';
import { ResultadosService } from '../resultados.service'; // Importa tu servicio para obtener los usuarios
import { AuthService } from '../auth.service'; // Importa el servicio de autenticación
import { Router } from '@angular/router';
import { FilterPipe } from './utils/filter.pipe';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {
  public users: any[] = [];
  public searchText: string = ''; // Variable para almacenar el texto de búsqueda
  public errorMessage: string = '';

  constructor(private userService: ResultadosService,private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // Obtiene el token almacenado en el servicio de autenticación
    const token = this.authService.getToken();

    if (token) {
      //this.getUsers(token);
    } else {
      // Redirige al usuario de vuelta al inicio de sesión si no hay token
      this.router.navigate(['/inicio-sesion']);
    }
  }

  getUsers() {
    // Obtiene el token almacenado en el servicio de autenticación
    const token = this.authService.getToken();

    if (token) {
      this.userService.getUsers(this.searchText, token).subscribe(
        (response) => {
          this.users = response.Body;
        },
        (error) => {
          console.error(error);
          this.errorMessage = 'Error al obtener usuarios. Verifica tu conexión o inténtalo nuevamente.';
        }
      );
    } else {
      // Redirige al usuario de vuelta al inicio de sesión si no hay token
      this.router.navigate(['/inicio-sesion']);
    }
  }

  agregarUsuario() {
    this.router.navigate(['/registro']); // Redirige al componente de registro o donde agregues usuarios
  }
  
}
