import { Component } from '@angular/core';
import { FilmeService } from '../../services/filme.service';
import { ResultadoBuscaFilme } from '../../models/resultado-busca-filme.model';
import { ListagemFilme } from '../../models/listagem-filme.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss'
})

export class BuscaComponent {
  public resultadoBusca?: ResultadoBuscaFilme;

  constructor(private filmeService: FilmeService) { }

  public buscar(query: string): void {
    if(query.length < 1)
      return;

    this.filmeService.buscarFilmes(query).subscribe(res => {
      this.resultadoBusca = this.mapearResultadoBusca(res);
    });
  }

  private mapearResultadoBusca(obj: any): ResultadoBuscaFilme {
    return {
      pagina: obj.page,
      quantidadePaginas: obj.total_pages,
      quantidadeResultados: obj.total_results,
      filmes: obj.results.map(this.mapearListagemFilme),
    }
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
