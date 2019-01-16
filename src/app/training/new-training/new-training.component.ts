import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  
  exercises: Exercise[];
  availableExercisesSubscription: Subscription;
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.availableExercisesSubscription = this.trainingService.avaialbeExercisesChanged
                                              .subscribe(availableExercises =>{
                                                this.exercises = availableExercises;
                                              });
    this.trainingService.fetchAvailableExercises();
    
  }

  onTrainingStart(form: NgForm){
    this.trainingService.startRunningExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.availableExercisesSubscription.unsubscribe();
  }
}
