export interface Workout {
    type: string;
    minutes: number;
}

export interface User {
    id: number;
    userName: string;
    workoutData: Workout[];
}

  