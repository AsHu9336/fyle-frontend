import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User, Workout } from './app.model';
import { WorkoutService } from './app.service';
import { CommonModule } from '@angular/common';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule, SearchFilterComponent, PaginationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-app';

  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number | null = null;
  users: User[] = [];
  total: number = 0;
  filteredUsers: User[] = [];
  paginatedUsers: User[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;


  constructor(private workoutService: WorkoutService) {
    this.users = this.workoutService.getUsers();
    this.filteredUsers = this.users;
    this.updatePagination();
  }

  addWorkout() {
    if (this.userName && this.workoutType && this.workoutMinutes !== null) {
      this.workoutService.addWorkout(this.userName, {
        type: this.workoutType,
        minutes: this.workoutMinutes,
      });
      this.users = this.workoutService.getUsers();
      console.log('users:', this.users);
      this.clearForm();
    }
  }

  clearForm() {
    this.userName = '';
    this.workoutType = '';
    this.workoutMinutes = null;
  }

  calculateTotal(user: { workoutData: Workout[] }): number {
    return user.workoutData.reduce(
      (total: number, workout: Workout) => total + workout.minutes,
      0
    );
  }

  // New method to get workout types as a comma-separated string
  getWorkoutTypes(user: { workoutData: Workout[] }): string {
    return user.workoutData.map((workout) => workout.type).join(', ');
  }

  onSearch(searchText: string) {
    this.filteredUsers = this.users.filter((user) =>
      user.userName.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log('filteredUsers:', this.filteredUsers);
    this.currentPage = 1;
    this.updatePagination();
  }

  onFilterChange(workoutType: string) {
    console.log('workoutType:', workoutType);
    this.filteredUsers = workoutType
      ? this.users.filter((user) =>
          user.workoutData.some((workout) => workout.type === workoutType)
        )
      : this.users;

    console.log('filteredUsers:', this.filteredUsers);
    this.currentPage = 1;
    this.updatePagination();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  
}
