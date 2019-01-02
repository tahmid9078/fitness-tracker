import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  
  @Output() trainingStarted = new EventEmitter();

  exercises: String []= ["crunches", "situps", "butpees"];
  
  constructor() { }

  ngOnInit() {
  }

  onTrainingStart(){
    this.trainingStarted.emit();
  }
}
