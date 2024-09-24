import { Component, NgModule } from "@angular/core";
import { WorkoutService } from "./WorkoutService";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, FormArray } from "@angular/forms";
import { NgFor } from '@angular/common';
import { WorkoutStatsComponent } from "../workout-stats/workout-statscomponent";

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, NgFor, WorkoutStatsComponent],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})
export class WorkoutListComponent {
  constructor(private workoutService: WorkoutService) {
    this.getWorkouts();
  }

  allWorkouts: any[] = [];
  filteredWorkouts: any[] = [];
  isEditing: boolean = false;

  workoutForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    duration: new FormControl(''),
    type: new FormControl(''),
    days: new FormControl('')
  });

  days = [
    { name: 'Sunday' },
    { name: 'Monday' },
    { name: 'Tuesday'},
    { name: 'Wednesday' },
    { name: 'Thursday' },
    { name: 'Friday', },
    { name: 'Saturday' }
  ];

  selectedDay: string | null = null;

  getWorkouts() {
    this.workoutService.getWorkouts().then(workouts => {
      this.allWorkouts = workouts;
      this.filteredWorkouts = [...this.allWorkouts];
    });
  }

  filterByDay(day: string | null) {
    this.selectedDay = day;
    console.log(this.allWorkouts);
    if (day === null) {
      this.filteredWorkouts = [...this.allWorkouts];
    } else {
      this.filteredWorkouts = this.allWorkouts.filter(workout => 
        workout.day.dayOfWeek === day);
    }
  }

  onSave(event: { name: string; description: string; }) {

  }

  onEdit(workout: any) {
    this.isEditing = true;
    console.log(workout,"workout data");
    this.workoutForm.patchValue({
      id: workout.id,
      title: workout.title,
      description: workout.description,
      duration: workout.duration,
      type: workout.type,
      days: workout.days
    });
  }

  onSubmit(workoutId: string = '') {
    console.log(this.workoutForm.value.id, "workoutid");
    if (this.isEditing) {
      this.workoutService.updateWorkout(this.workoutForm.value.id, this.workoutForm.value).then(() => {
        this.getWorkouts();
        this.resetForm();
      });
    } else {
      this.workoutService.createWorkout(this.workoutForm.value).then(() => {
        this.getWorkouts();
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.isEditing = false;
    this.workoutForm.reset();
  }

  onChange(event: any, workoutDayId: any) {
    console.log(workoutDayId);
    this.workoutService.markAsDone(workoutDayId, event.target.checked).then(res => {
      // Update the local state instead of refetching all workouts
      const updatedWorkouts = this.allWorkouts.map(workout => {
        if (workout.day.id === workoutDayId) {
          return {
            ...workout,
            day: {
              ...workout.day,
              isDone: event.target.checked
            }
          };
        }
        return workout;
      });
      this.allWorkouts = updatedWorkouts;
      // Re-apply the current filter
      this.filterByDay(this.selectedDay);
    });
  }

  onDelete(workoutId: string) {
    if (confirm('Are you sure you want to delete this workout?')) {
      this.workoutService.deleteWorkout(workoutId).then(() => {
        this.getWorkouts();
      });
    }
  }

  getWorkoutType(type: number): string {
    switch (type) {
      case 0:
        return 'Cardio';
      case 1:
        return 'Strength';
      case 2:
        return 'Flexibility';
      case 3:
        return 'Balance';
      case 4:
        return 'Other';
      default:
        return 'Unknown';
    }
  }

  getDaysString(days: number[]): string {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days.map(day => dayNames[day]).join(', ');
  }
}
