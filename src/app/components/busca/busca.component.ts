import { Component } from '@angular/core';
import { FilmeService } from '../../services/filme.service';
import { ResultadoBuscaFilme } from '../../models/resultado-busca-filme.model';
import { ListagemFilme } from '../../models/listagem-filme.model';
import { formatDate, NgClass, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BarraBuscaComponent } from "../barra-busca/barra-busca.component";
import { ToastrService } from 'ngx-toastr';
import { CardFilmeComponent } from '../../shared/card-filme/card-filme.component';
import { IconeAvaliacaoUsuariosComponent } from '../../shared/icone-avaliacao-usuarios/icone-avaliacao-usuarios.component';
import { BotaoPaginacaoComponent } from "../../shared/botao-paginacao/botao-paginacao.component";


@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [NgIf, NgForOf, NgClass, RouterLink, BarraBuscaComponent, CardFilmeComponent, IconeAvaliacaoUsuariosComponent, BotaoPaginacaoComponent],
  templateUrl: './busca.component.html'
})

export class BuscaComponent {
  public resultadoBusca?: ResultadoBuscaFilme;
  public ultimaPesquisa?: string;
  public paginaAtual: number;
  public ultimaPaginaAlcancada: boolean;
  public carregandoListagem: boolean;

  constructor( route: ActivatedRoute, private filmeService: FilmeService, private toastrService: ToastrService) {
    this.carregandoListagem = false;
    this.ultimaPaginaAlcancada = false;
    this.paginaAtual = 1;

    route.queryParams.subscribe((params) => {
      this.ultimaPesquisa = params['query'];

      if (!this.ultimaPesquisa) {
        this.toastrService.error(
          'Não foi possível obter o valor da pesquisa!',
          'Erro de busca'
        );

        return;
      }

      this.buscar(this.ultimaPesquisa);
    });
  }

  public buscar(query: string): void {
    if (query.length < 1) return;

    this.ultimaPesquisa = query;

    this.ultimaPaginaAlcancada = false;

    this.carregandoListagem = true;

    this.filmeService.buscarFilmes(query, this.paginaAtual).subscribe((res) => {
      const novoResultado = this.mapearResultadoBusca(res);

      this.resultadoBusca = novoResultado;

      this.carregandoListagem = false;
    });
  }

  public obterProximaPagina() {
    if (!this.ultimaPesquisa) {
      this.toastrService.error('Não foi possível obter o último valor da pesquisa', 'Erro de paginação');

      return;
    }

    this.carregandoListagem = true;

    this.filmeService
      .buscarFilmes(this.ultimaPesquisa!, ++this.paginaAtual)
      .subscribe((res) => {
        const novoResultado = this.mapearResultadoBusca(res);

        this.resultadoBusca!.filmes.push(...novoResultado.filmes);

        this.carregandoListagem = false;
      });

    this.ultimaPaginaAlcancada =
      this.paginaAtual == this.resultadoBusca?.quantidadePaginas;
  }

  public mapearCorDaNota(porcentagemNota: string): string {
    const numeroNota = Number(porcentagemNota);

    if ((numeroNota >= 0) && (numeroNota <= 30))
      return 'app-borda-nota-mais-baixa';
    else if ((numeroNota > 30) && (numeroNota <= 50))
      return 'app-borda-nota-baixa';
    else if ((numeroNota > 50) && (numeroNota <= 75))
      return 'app-borda-nota-media';
    else
      return 'app-borda-nota-alta';
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
      lancamento: obj.release_date? formatDate(obj.release_date, 'mediumDate', 'pt-BR'): 'Data não disponível',
      urlImagem: 'https://image.tmdb.org/t/p/w300/' + obj.poster_path,
      porcentagemNota: (obj.vote_average * 10)
    }
  }
}
