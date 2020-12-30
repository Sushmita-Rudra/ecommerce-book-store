import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Book} from '../models/book';
import { BookCategory } from '../models/book-category';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  

  private baseUrl = "http://localhost:8080/api/v1/books";
  private categoriesUrl = "http://localhost:8080/api/v1/book-category";

  constructor(private httpClient:HttpClient) { 

  }
  getBooks(theCategoryId) : Observable<Book[]>{
  const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`
  return this.httpClient.get<GetBooksResponse>(searchUrl).pipe(map(response => response._embedded.books))
  }

  getCategories() : Observable<BookCategory[]> {
    return this.httpClient.get<GetCategoriesResponse>(this.categoriesUrl).pipe(map(response => response._embedded.bookCategories))
  }
}
interface GetBooksResponse{
  _embedded:{
    books:Book[];
  }
}

interface GetCategoriesResponse{
  _embedded:{
    bookCategories:BookCategory[]
  }
}
