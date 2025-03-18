import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Piece } from '../interfaces/Piece';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PieceService {

  constructor(private _HttpClient: HttpClient) { }
  getPieces(categoryId: string): Observable<Piece[]> {
    return this._HttpClient.get<Piece[]>(`${environment.baseUrl}/Piece/get-pieces/${categoryId}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('Token') } });
  }
  addPiece(piece: FormData): Observable<any> {
    return this._HttpClient.post<any>(`${environment.baseUrl}/Piece/add-pieces`, piece, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('Token') }
    });
  }
  deletePiece(Pieces: number[]): Observable<any> {
    return this._HttpClient.request<any>('DELETE', `${environment.baseUrl}/Piece/delete-pieces`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('Token') },
      body: { pieces: Pieces }
    });
  }

}
