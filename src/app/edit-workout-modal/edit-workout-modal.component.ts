// import { CommonModule } from '@angular/common';
// import { Component, EventEmitter, Output } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-edit-workout-modal',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './edit-workout-modal.component.html',
//   styleUrl: './edit-workout-modal.component.css'
// })
// export class EditWorkoutModalComponent {
//   isVisible = false;
//   workoutName = '';
//   workoutDescription = '';
//   workoutDate = '';
//   workoutDuration = '';
//   workoutType = '';
//   workoutDays = [];

//   @Output() save = new EventEmitter<{ name: string, description: string }>();

//   openModal() {
//     this.isVisible = true;
//   }

//   closeModal() {
//     this.isVisible = false;
//   }

//   onSubmit() {
//     this.save.emit({ name: this.workoutName, description: this.workoutDescription });
//     this.closeModal();
//   }
// }
