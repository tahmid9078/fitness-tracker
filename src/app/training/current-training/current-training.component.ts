import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer: any;
  constructor(public dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.onStartOrResume();
  }

  onStartOrResume() {
    const steps = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.timer = setInterval(()=>{
      this.progress += 1;
      if(this.progress >= 100){
        clearInterval(this.timer);
      }
    },steps);
  }

  onStop(){
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(
      result =>{
      if(result){
        this.trainingExit.emit();
      }
      else{
        this.onStartOrResume();
      }
    });
  }
}
