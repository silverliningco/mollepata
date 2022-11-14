import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output('search') searchEmitter = new EventEmitter<any>();

  search = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    // check all the changes
    this.search.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe( value => this.searchEmitter.emit(value));

  }

  

}
