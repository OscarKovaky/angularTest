import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Importa tu servicio de autenticación
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm: FormGroup; // Define un FormGroup para el formulario
  public errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    // Inicializa el formulario con las validaciones
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]), // Valida que el campo no esté vacío y tenga al menos 3 caracteres.
      password: new FormControl('', [Validators.required, Validators.minLength(6)]), // Valida que el campo no esté vacío y tenga al menos 6 caracteres.
    });
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      // El formulario es inválido, muestra un mensaje de error
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    // El formulario es válido, procede con la autenticación
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      (response) => {
        if (response.IsOK && response.Body !== null) {
          // Autenticación exitosa
          this.authService.setToken(response.Body.Token); // Almacena el token en tu servicio de autenticación
          this.router.navigate(['/resultados']); // Redirige al módulo de resultados
        } else {
          // Muestra un mensaje de error
          console.log(response.Messages)
          this.errorMessage = response.Messages;
        }
      },
      (error) => {
        console.error(error); // Manejo de errores de la solicitud HTTP
      }
    );
  }
}
