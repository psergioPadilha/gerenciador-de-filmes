import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  private readonly chave = 'topMovies:filmes';
  private favoritos: number[];

  constructor() {
    this.favoritos = this.obterFavoritos();
  }

  public salvarFavorito(id: number): boolean {
    if(this.favoritoJaExiste(id))
      return false;

    this.favoritos.push(id);

    this.salvarFavoritos();

    return true;
  }

  public removerFavorito(id: number): boolean {
    if(!this.favoritoJaExiste(id))
      return false;

    this.favoritos = this.favoritos.filter(f => f != id);

    this.salvarFavoritos();

    return true;
  }

  public favoritoJaExiste(id: number) {
    return this.favoritos.includes(id);
  }

  private salvarFavoritos() {
    const jsonString = JSON.stringify(this.favoritos);

    localStorage.setItem(this.chave, jsonString);
  }

  private obterFavoritos(): number[] {
    const jsonString = localStorage.getItem(this.chave);

    if(!jsonString)
      return [];

    const favoritos = JSON.parse(jsonString) as number[];

    return favoritos;
  }

}
