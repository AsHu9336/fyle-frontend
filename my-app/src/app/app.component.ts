import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User, Workout } from './app.model';
import { WorkoutService } from './app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , FormsModule,CommonModule],
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

  calculateTotal(user: { workoutData: Workout[] }): number {
    return user.workoutData.reduce((total: number, workout: Workout) => total + workout.minutes, 0);
  }

  // New method to get workout types as a comma-separated string
  getWorkoutTypes(user: { workoutData: Workout[] }): string {
    return user.workoutData.map(workout => workout.type).join(', ');
  }
}
