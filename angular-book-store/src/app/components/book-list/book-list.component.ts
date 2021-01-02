import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import {Book} from '../../models/book';

@Component({
  selector: 'app-book-list',
 // templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
 books:Book[];
 currentCategoryId: number; 
  searchMode: boolean;
  

  constructor(private _bookService:BookService,
    private _activateRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this._activateRoute.paramMap.subscribe( () => {
      this.listBooks();
    })
   
  }



  listBooks() {
    this.searchMode = this._activateRoute.snapshot.paramMap.has("keyword");
    if (this.searchMode) {
      //Go to search books
      this.handleSearchListOfBooks();
    } else {
      //Go to just list of books
      this.handleListOfBooks();
    }
  
  }

  handleListOfBooks() {
  const hasCategoryId:boolean =  this._activateRoute.snapshot.paramMap.has("id");
   if(hasCategoryId){
        this.currentCategoryId = +this._activateRoute.snapshot.paramMap.get("id");
   }else{
     this.currentCategoryId = 1;
   }

   return this._bookService.getBooks(this.currentCategoryId).subscribe(data => this.books = data
   )
  }

  handleSearchListOfBooks() {

    const keyword:string = this._activateRoute.snapshot.paramMap.get("keyword");
    return this._bookService.searchBooksByKeyword(keyword).subscribe(data => this.books = data);
    
  }

}
