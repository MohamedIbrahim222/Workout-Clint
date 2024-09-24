import { Injectable } from '@angular/core';
import { api } from '../Api';

@Injectable({
  providedIn: 'root',
})
class WorkoutService {
    async getWorkouts(): Promise<any> {
        const data = await api.get('http://localhost:5079/api/workout');
        return data.data;
    }

    async createWorkout(workout: any): Promise<any> {
        await api.post('http://localhost:5079/api/workout', workout);
    }

    async updateWorkout(workoutId: string, workout: any): Promise<any> {
        await api.put(`http://localhost:5079/api/workout/${workoutId}`, workout);
    }

    async markAsDone(workoutDayId: string, isDone: boolean): Promise<any> {
        await api.patch(`http://localhost:5079/api/Workout/day/${workoutDayId}`, { isDone });
    }

    async deleteWorkout(workoutId: string): Promise<any> {
        await api.delete(`http://localhost:5079/api/workout/${workoutId}`);
    }
}

export { WorkoutService };