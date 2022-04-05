import {Component, Inject, OnInit} from '@angular/core';
import {BookService} from "../book.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Book} from "../book";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book!:Book

  constructor(private bookService: BookService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<BookDetailComponent>) { }

  ngOnInit(): void {
    this.book = this.data;
  }

  handleDel(id: number) {
    if(confirm("Bạn chắc chắn muốn xoá quyển sách này không")) {
      this.bookService.deleteBook(id).subscribe(
        () => this.dialogRef.close()
      )
    }
  }
}
