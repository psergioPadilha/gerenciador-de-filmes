import { Component, Input } from '@angular/core';
import { FilmeFavorito } from '../../models/filme-favorito.model';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-filmes-favoritos',
  standalone: true,
  imports: [NgForOf, RouterLink],
  templateUrl: './filmes-favoritos.component.html',
})

export class FilmesFavoritosComponent {
  @Input({ required: true }) filmes!: FilmeFavorito[];
}
