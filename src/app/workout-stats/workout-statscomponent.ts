import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutStatsService } from './WorkoutStatsService';
@Component({
  selector: 'app-workout-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workout-stats.component.html',
  styleUrl: './workout-stats.component.css'
})
export class WorkoutStatsComponent implements OnInit {
  stats: any = null;

  constructor(private workoutStatsService: WorkoutStatsService) {
    console.log('WorkoutStatsComponent constructor called');
  }

  ngOnInit() {
    this.getWorkoutStats();
  }

  getWorkoutStats() {
    this.workoutStatsService.getWorkoutStats().then(stats => {
      this.stats = stats;
      console.log('Fetched stats:', this.stats); 
    }).catch(error => {
      console.error('Error fetching workout stats:', error);
    });
  }
}
