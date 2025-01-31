import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  imports: [FormsModule],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.css'
})
export class SearchFilterComponent {
  searchText: string = '';
  selectedWorkoutType: string = '';

  @Output() search = new EventEmitter<string>();
  @Output() filter = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchText);
  }

  onFilterChange() {
    this.filter.emit(this.selectedWorkoutType);
  }
}
