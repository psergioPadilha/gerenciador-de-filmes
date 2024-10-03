import { Component, OnInit } from '@angular/core';
import { FilmeService } from '../../services/filme.service';
import { ListagemFilme } from '../../models/listagem-filme.model';
import { formatDate, NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [NgForOf, NgClass],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss'
})
export class ListagemFilmesComponent implements OnInit {
  public filmes: ListagemFilme[];

  constructor(private filmeService: FilmeService) {
    this.filmes = [];
  }

  ngOnInit(): void {
    this.buscarFilmesPopulares();
  }

  public buscarFilmesPopulares() {
    this.filmeService.selecionarFilmesPopulares().subscribe((f) => {
      const resultados = f.results as any[];
      const filmesMapeados = resultados.map(this.mapearListagemFilme);

      // spread syntax = sintaxe de spread - os três pontos inseri um a um os elemntos no array
      this.filmes.push(...filmesMapeados);
    });
  }

  public mapearCorDaNota(porcentagemNota: string): string {
    const numeroNota = Number(porcentagemNota);

    if ((numeroNota > 0) && (numeroNota <= 30))
      return 'app-borda-nota-mais-baixa';
    else if ((numeroNota > 30) && (numeroNota <= 50))
      return 'app-borda-nota-baixa';
    else if ((numeroNota > 50) && (numeroNota <= 75))
      return 'app-borda-nota-media';
    else
      return 'app-borda-nota-alta';
  }

  private mapearListagemFilme(obj: any): ListagemFilme {
    return {
      id: obj.id,
      titulo: obj.title,
      lancamento: formatDate(obj.release_date, 'mediumDate', 'pt-BR'),
      urlImagem: 'https://image.tmdb.org/t/p/w300/' + obj.poster_path,
      porcentagemNota: (obj.vote_average * 10).toFixed(0),
    }
  }
}
