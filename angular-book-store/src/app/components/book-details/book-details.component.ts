import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  bookId: number;
  bookDetails: Book;

  constructor(private _activateRoute : ActivatedRoute, private _bookService:BookService) { }

  ngOnInit(): void {
    this._activateRoute.paramMap.subscribe(() => {
      this.bookInfo();
    })
  }

  bookInfo() {
    this.bookId = +this._activateRoute.snapshot.paramMap.get("id");
    return this._bookService.getBookInfo(this.bookId).subscribe(data => this.bookDetails = data)
  }


}
