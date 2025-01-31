import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User, Workout } from './app.model';
import { WorkoutService } from './app.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
 
  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number | null = null;
  users: User[] = [];

  constructor(private workoutService: WorkoutService) {
    this.users = this.workoutService.getUsers();
   
  }

  addWorkout() {
    if (this.userName && this.workoutType && this.workoutMinutes !== null) {
      this.workoutService.addWorkout(this.userName, {
        type: this.workoutType,
        minutes: this.workoutMinutes
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
}
