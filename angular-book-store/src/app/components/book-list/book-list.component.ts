import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import {Book} from '../../models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
 books:Book[];

  constructor(private _bookService:BookService) { }

  ngOnInit(): void {
    this.listBooks();
  }

  listBooks(){
   return this._bookService.getBooks().subscribe(data => this.books = data
   )
  }

}
