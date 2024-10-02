import { Component, OnInit } from '@angular/core';
import { FilmeService } from '../../services/filme.service';
import { ListagemFilme } from '../../models/listagem-filme.model';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss'
})
export class ListagemFilmesComponent implements OnInit {
  constructor(private filmeService: FilmeService) { }

  ngOnInit(): void {
    this.filmeService.selecionarFilmesPopulares().subscribe((f) => {
      const resultados = f.results as any[];
      const filmesMapeados = resultados.map(this.mapearListagemFilme);
      console.log(filmesMapeados);
    });
  }

  private mapearListagemFilme(obj: any): ListagemFilme {
    return {
      id: obj.id,
      titulo: obj.title,
      lancamento: obj.release_date,
      urlImagem: obj.poster_path,
      porcentagemNota: obj.vote_average,
    }
  }
}
