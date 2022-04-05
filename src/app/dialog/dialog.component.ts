import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../book.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  formBook: FormGroup | any;
  actionType = "Thêm sách mới";

  constructor(@Inject(MAT_DIALOG_DATA) public editData: any,
              private dialogRef: MatDialogRef<DialogComponent>,
              private _fb: FormBuilder,
              private bookService: BookService) {
  }

  ngOnInit(): void {
    this.initializeForm();
    if (this.editData) {
      this.actionType = "Cập nhật sách"
      this.formBook.patchValue(this.editData)
    }
  }

  initializeForm() {
    this.formBook = this._fb.group({
      id: [''],
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['']
    })
  }


  onSubmit(type: string) {
    const book = {
      ...this.formBook.value
    }
    if (type != "Thêm sách mới") {
      this.bookService.editBook(book).subscribe(() => {
        this.formBook.reset()
        this.dialogRef.close()
      })
    } else {
      this.bookService.saveBook(book).subscribe(() => {
          this.formBook.reset()
          this.dialogRef.close()
        }
      )
    }
  }
}
