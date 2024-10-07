import { Component, Input } from '@angular/core';
import { ListagemFilme } from '../../models/listagem-filme.model';
import { IconeAvaliacaoUsuariosComponent } from '../icone-avaliacao-usuarios/icone-avaliacao-usuarios.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-filme',
  standalone: true,
  imports: [RouterLink, IconeAvaliacaoUsuariosComponent],
  templateUrl: './card-filme.component.html',
  styleUrl: './card-filme.component.scss',
})
export class CardFilmeComponent {
  @Input({ required: true }) filme!: ListagemFilme;
}