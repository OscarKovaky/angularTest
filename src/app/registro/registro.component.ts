import { Component } from '@angular/core';
import { RegistroService} from '../registro.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  public Body: any = {
    Tenant: null,
    UserName: '',
    Password: '',
    Name: '',
    FatherLastName: '',
    MotherLastName: '',
    Email: '',
    PhoneNumber: '',
    Metadata: null,
    Roles: [{ Id: 2, Name: 'Usuario Tradicional' }]
  };
  public errorMessage: string = '';
  public token: string = '';

  constructor(private userRegistrationService: RegistroService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // Obtén el token al inicializar el componente
    this.token = this.authService.getToken();
    console.log(this.token)
  }

  get isFormInvalid(): boolean {
    return !this.Body.UserName || !this.Body.Password || !this.Body.Name || !this.Body.FatherLastName || !this.Body.MotherLastName || !this.Body.Email || !this.Body.PhoneNumber;
  }

  onSubmit() {

    // Restablecer el mensaje de error si no hay errores
    this.errorMessage = '';

    console.log(this.token)
    if (this.token) {
      this.userRegistrationService.registerUser(this.token, this.Body).subscribe(
        (response) => {
          if (response.IsOK) {
            this.router.navigate(['/resultados']);
          } else {
            this.errorMessage = 'Verifica tu información: ' + response.Messages;
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
