import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

export class TrainingService {
    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toe', name: 'Touch-toe', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side-lunges', duration: 150, calories: 20 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];
    private runningExercise: Exercise;
    changeExercise = new Subject<Exercise>();

    getAvailableExercises() {
        return this.availableExercises.slice();
    }

    startRunningExercise(selectedExerciseId){
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedExerciseId);
        this.changeExercise.next({...this.runningExercise});
    }

    getRunningExercise() {
        return {...this.runningExercise};
    }
}