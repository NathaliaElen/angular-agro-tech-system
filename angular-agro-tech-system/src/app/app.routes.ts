import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { CadastroTipoSensorComponent } from './components/cadastro/tipo-sensor/cadastro-tipo-sensor.component';
import { CadastroSensorComponent } from './components/cadastro/sensor/cadastro-sensor.component';
import { CadastroRegraComponent } from './components/cadastro/regra/cadastro-regra.component';
import { CadastroLeituraComponent } from './components/cadastro/leitura/cadastro-leitura.component';
import { CadastroAlertaComponent } from './components/cadastro/alerta/cadastro-alerta.component';
import { CadastroUsuarioComponent } from './components/cadastro/usuario/cadastro-usuario.component';
import { CadastroAreaComponent } from './components/cadastro/area/cadastro-area.component';
import { ConsultaTipoSensorComponent } from './components/consulta/tipo-sensor/consulta-tipo-sensor.component';
import { ConsultaSensorComponent } from './components/consulta/sensor/consulta-sensor.component';
import { ConsultaRegraComponent } from './components/consulta/regra/consulta-regra.component';
import { ConsultaLeituraComponent } from './components/consulta/leitura/consulta-leitura.component';
import { ConsultaAlertaComponent } from './components/consulta/alerta/consulta-alerta.component';
import { ConsultaUsuarioComponent } from './components/consulta/usuario/consulta-usuario.component';
import { ConsultaAreaComponent } from './components/consulta/area/consulta-area.component';
import { CadastroPerfilComponent } from './components/cadastro/perfil/cadastro-perfil.component';
import { ConsultaPerfilComponent } from './components/consulta/perfil/consulta-perfil.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
  {
    path: 'principal',
    component: PrincipalComponent,
    canActivate: [authGuard],
    children: [
      { path: 'cadastro-tipo-sensor', component: CadastroTipoSensorComponent },
      { path: 'cadastro-sensor', component: CadastroSensorComponent },
      { path: 'cadastro-regra', component: CadastroRegraComponent },
      { path: 'cadastro-leitura', component: CadastroLeituraComponent },
      { path: 'cadastro-alerta', component: CadastroAlertaComponent },
      { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
      { path: 'cadastro-area', component: CadastroAreaComponent },
      { path: 'cadastro-perfil', component: CadastroPerfilComponent },
      { path: 'consulta-tipo-sensor', component: ConsultaTipoSensorComponent },
      { path: 'consulta-sensor', component: ConsultaSensorComponent },
      { path: 'consulta-regra', component: ConsultaRegraComponent },
      { path: 'consulta-leitura', component: ConsultaLeituraComponent },
      { path: 'consulta-alerta', component: ConsultaAlertaComponent },
      { path: 'consulta-usuario', component: ConsultaUsuarioComponent },
      { path: 'consulta-area', component: ConsultaAreaComponent },
      { path: 'consulta-perfil', component: ConsultaPerfilComponent },
    ],
  },
  {
    path: 'cadastro-tipo-sensor',
    component: CadastroTipoSensorComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cadastro-sensor',
    component: CadastroSensorComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cadastro-regra',
    component: CadastroRegraComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cadastro-leitura',
    component: CadastroLeituraComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cadastro-alerta',
    component: CadastroAlertaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cadastro-area',
    component: CadastroAreaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'consulta-tipo-sensor',
    component: ConsultaTipoSensorComponent,
    canActivate: [authGuard],
  },
  {
    path: 'consulta-sensor',
    component: ConsultaSensorComponent,
    canActivate: [authGuard],
  },
  {
    path: 'consulta-regra',
    component: ConsultaRegraComponent,
    canActivate: [authGuard],
  },
  {
    path: 'consulta-leitura',
    component: ConsultaLeituraComponent,
    canActivate: [authGuard],
  },
  {
    path: 'consulta-alerta',
    component: ConsultaAlertaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'consulta-usuario',
    component: ConsultaUsuarioComponent,
    canActivate: [authGuard],
  },
  {
    path: 'consulta-area',
    component: ConsultaAreaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cadastro-perfil',
    component: CadastroPerfilComponent,
    canActivate: [authGuard],
  },
  {
    path: 'consulta-perfil',
    component: ConsultaPerfilComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/login' },
];
