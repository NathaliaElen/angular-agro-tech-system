export interface Alerta {
  id?: string;
  regraId: string;
  leituraSensorId: string;
  prioridade: string;
  titulo: string;
  mensagem: string;
  criadoEm?: string;
  resolvidoEm?: string;
  resolvidoUsuarioId?: string;
}
