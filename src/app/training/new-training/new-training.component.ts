import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui-service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  
  exercises: Exercise[];
  availableExercisesSubscription: Subscription;
  isLoading: boolean = false;
  isLoadingSubscription : Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
    ) { }

  ngOnInit() {
    this.isLoadingSubscription = this.uiService.isLoadingChanged.subscribe( isLoading =>{
      this.isLoading = isLoading;
    });
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
    this.isLoadingSubscription.unsubscribe();
    this.availableExercisesSubscription.unsubscribe();
  }
}
