export interface Exercise {
    id: String;
    name: String;
    duration: number;
    calories: number;
    date?: Date;
    state?: 'completed' | 'cancelled' | null;
}