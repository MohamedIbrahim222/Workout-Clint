import { Injectable } from '@angular/core';
import { api } from '../Api';

@Injectable({
  providedIn: 'root',
})
class WorkoutStatsService {
 
    async getWorkoutStats(): Promise<any> {
        const data = await api.get('http://localhost:5079/api/workout/stats');
        console.log('Fetched stats:', data.data); 
        return data.data;
    }


  
}

export { WorkoutStatsService };