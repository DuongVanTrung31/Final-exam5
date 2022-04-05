import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "./book";
import {environment} from "../environments/environment";

const API = `${environment.apiUrl}books/`

@Injectable({
  providedIn: 'root'
})

export class BookService {

  constructor(private http: HttpClient) {
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(API)
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(API + id)
  }

  saveBook(book: Book): Observable<any> {
    return this.http.post(API, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(API + id);
  }

  editBook(book: Book): Observable<any> {
    return this.http.put(API + book.id,book);
  }
}
