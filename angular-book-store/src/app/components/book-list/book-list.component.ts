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
 currentCategoryId:number; 

  constructor(private _bookService:BookService,
    private _activateRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this._activateRoute.paramMap.subscribe( () => {
      this.listBooks();
    })
   
  }

  listBooks(){
   const hasCategoryId:boolean =  this._activateRoute.snapshot.paramMap.has("id");
   if(hasCategoryId){
        this.currentCategoryId = +this._activateRoute.snapshot.paramMap.get("id");
   }else{
     this.currentCategoryId = 1;
   }

   return this._bookService.getBooks(this.currentCategoryId).subscribe(data => this.books = data
   )
  }

}
