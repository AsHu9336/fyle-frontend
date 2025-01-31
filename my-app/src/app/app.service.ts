import { Injectable } from '@angular/core';
import { Workout, User } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private storageKey = 'users';

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

//   addWorkout(workout: Workout): void {
//     console.log('Adding workout:', workout);
    
//     const workouts = this.getWorkouts();
//     console.log('workouts:', workouts);
//     // workouts.push({ ...workout, id: Date.now() });
//     localStorage.setItem(this.storageKey, JSON.stringify(workouts));
//   }
  addWorkout(userName: string, workout: Workout): void {
    let users = this.getUsers();
    let user = users.find(u => u.userName === userName);

    if (user) {
      user.workoutData.push(workout);
    } else {
      users.push({ id: Date.now(), userName, workoutData: [workout] });
    }

    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }
}
