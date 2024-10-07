import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-botao-paginacao',
  standalone: true,
  imports: [],
  template: `
    <button
      (click)="onClick()"
      type="button"
      class="app-botao-gradiente btn btn-lg rounded-pill fw-semibold w-100"
    >
      Mais resultados
    </button>
  `,
})
export class BotaoPaginacaoComponent {
  @Output() paginacaoAcionada: EventEmitter<void>;

  constructor() {
    this.paginacaoAcionada = new EventEmitter();
  }

  public onClick() {
    this.paginacaoAcionada.emit();
  }
}
