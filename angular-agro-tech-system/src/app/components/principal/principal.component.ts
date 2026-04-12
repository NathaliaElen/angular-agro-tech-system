import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent {
  userName: string = '';
  showAboutModal: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    const user = this.authService.getUser();
    this.userName = user?.nome || 'Usuário';
  }

  onSair(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  showAbout(): void {
    this.showAboutModal = true;
  }

  closeAbout(): void {
    this.showAboutModal = false;
  }
}
