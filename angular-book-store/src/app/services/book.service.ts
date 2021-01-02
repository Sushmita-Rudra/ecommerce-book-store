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
  private getBooksList(searchUrl:string) :Observable<Book[]>{
    return this.httpClient.get<GetBooksResponse>(searchUrl).pipe(map(response => response._embedded.books))
  
  }
  getBooks(theCategoryId : number) : Observable<Book[]>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`
    return this.getBooksList(searchUrl);
  }

  getCategories() : Observable<BookCategory[]> {
    return this.httpClient.get<GetCategoriesResponse>(this.categoriesUrl).pipe(map(response => response._embedded.bookCategories))
  }

  searchBooksByKeyword(keyword: string): Observable<Book[]>{
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}`
    return this.getBooksList(searchUrl)
  }

  getBookInfo(bookId:number) :Observable<Book>{
    const bookInfoUrl = `${this.baseUrl}/${bookId}`;
    return this.httpClient.get<Book>(bookInfoUrl)
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
