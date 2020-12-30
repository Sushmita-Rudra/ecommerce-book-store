import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Book} from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  

  private baseUrl = "http://localhost:8080/api/v1/books";

  constructor(private httpClient:HttpClient) { 

  }
  getBooks(theCategoryId) : Observable<Book[]>{
  const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`
  return this.httpClient.get<GetBooksResponse>(searchUrl).pipe(map(response => response._embedded.books))
  }
}
interface GetBooksResponse{
  _embedded:{
    books:Book[];
  }
}
