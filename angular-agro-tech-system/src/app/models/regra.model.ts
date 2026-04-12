export interface Regra {
  id?: string;
  nome: string;
  descricao: string;
  tipoSensorId: string;
  limiteMin: number;
  limiteMax: number;
  prioridade: string;
  areaId: string;
  sensorId: string;
  status: string;
  criadoEm?: string;
  atualizadoEm?: string;
}
