import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const NutritionSchema = new Schema({
  foodItems: {
    type: Array,
    default: []
  }
});

const Nutrition = mongoose.model('Users', NutritionSchema);

export default Nutrition;
