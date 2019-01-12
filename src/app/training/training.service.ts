import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

export class TrainingService {
    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toe', name: 'Touch-toe', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side-lunges', duration: 150, calories: 20 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];
    private exercises: Exercise[] = [];
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