import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class TrainingService {
    private availableExercises: Exercise[] = [];
    private exercises: Exercise[] = [];
    private runningExercise: Exercise;
    changeExercise = new Subject<Exercise>();
    avaialbeExercisesChanged = new Subject<Exercise[]>();

    constructor(private db: AngularFirestore){}

    fetchAvailableExercises() {
        this.db.collection("availableExercises")
                .snapshotChanges()
                .pipe(map(docArray => {
                    return docArray.map( doc =>{
                        const data = doc.payload.doc.data();
                        const id = doc.payload.doc.id;
                        return { id, ...data } as unknown as Exercise
                    })
                })).subscribe( (exercises: Exercise[]) => {
                    this.availableExercises = exercises;
                    this.avaialbeExercisesChanged.next([...this.availableExercises]);
                });
                
    }

    startRunningExercise(selectedExerciseId){
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedExerciseId);
        this.changeExercise.next({...this.runningExercise});
    }

    getRunningExercise() {
        return {...this.runningExercise};
    }

    completeExercise() {
        this.exercises.push(
            {...this.runningExercise,
            date: new Date(),
            state: "completed"

        });
        console.log(this.runningExercise);
        this.runningExercise = null;
        this.changeExercise.next(null);
    }

    cancelExercise(progress: number) {
        this.exercises.push({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress/100),
            calories: this.runningExercise.calories * (progress/100),
            date: new Date(),
            state: "cancelled"

        });
        console.log(this.exercises[0]);
        this.runningExercise = null;
        this.changeExercise.next(null);
        
    }

    getExercises() {
        return this.exercises.slice();
    }
}