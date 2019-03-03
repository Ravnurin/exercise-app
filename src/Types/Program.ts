export interface ExerciseSet {
  weight: number | string;
  reps: number | string;
}

export interface UpperBodySchema {
  flatBench: ExerciseSet[];
  row: ExerciseSet[];
  inclineDbBench: ExerciseSet[];
  pulldown: ExerciseSet[];
  lateralRaise: ExerciseSet[];
  rearDelt: ExerciseSet[];
  triceps: ExerciseSet[];
  biceps: ExerciseSet[];
}

export interface LowerBodySchema {
  squat: ExerciseSet[];
  rdlOrLegCurl: ExerciseSet[];
  legPress: ExerciseSet[];
  legCurl: ExerciseSet[];
  calfRaise: ExerciseSet[];
  seatedCalfRaise: ExerciseSet[];
  abs: ExerciseSet[];
  lowBack: ExerciseSet[];
}

export interface ProgramSchemaLayout {
  date: Date;
  upperBody: UpperBodySchema;
  lowerBody: LowerBodySchema;
}

export enum FriendlyNames {
  'flatBench' = 'Flat Bench',
  'row' = 'Row',
  'inclineDbBench' = 'Incline Dumbbell Bench',
  'pulldown' = 'Pulldown',
  'lateralRaise' = 'Lateral Raise',
  'rearDelt' = 'Rear Delt',
  'triceps' = 'Triceps',
  'biceps' = 'Biceps',
  'squat' = 'Squat',
  'rdlOrLegCurl' = 'Romanian Deadlift or Leg Curl',
  'legPress' = 'Leg Press',
  'legCurl' = '2nd Leg Curl',
  'calfRaise' = 'Calf Raise',
  'seatedCalfRaise' = 'Seated Calf Raise',
  'abs' = 'Abs',
  'lowBack' = 'Low Back'
};