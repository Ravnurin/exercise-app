export const getCustomExerciseFriendlyName = (customExercise: string) => customExercise === ''
  ? customExercise
  : customExercise.split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');