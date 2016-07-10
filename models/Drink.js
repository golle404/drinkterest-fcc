import mongoose, {Schema} from 'mongoose';

const schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

const drinkSchema = new Schema({
  name: String,
  url: String,
  image: String,
  submitterId: String,
  submitterName: String,
  likes: [String]
}, schemaOptions);

const Drink = mongoose.model('Drink', drinkSchema);

export default Drink;
