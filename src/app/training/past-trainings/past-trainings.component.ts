import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] =['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  finishedExerciseChangedSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
      this.finishedExerciseChangedSubscription = this.trainingService
            .finishedExercisesChanged
            .subscribe(finishedExercises => {
              this.dataSource.data = finishedExercises;
            });
      this.trainingService.fetchFinishedExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    if(this.finishedExerciseChangedSubscription){
      this.finishedExerciseChangedSubscription.unsubscribe();
    }
  }
}
