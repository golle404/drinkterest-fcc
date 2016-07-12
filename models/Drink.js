import mongoose, {Schema} from 'mongoose';

const schemaOptions = {
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
  likes: [String],
  createdAt: Date,
  numLikes: Number
}, schemaOptions);

drinkSchema.pre('save', function(next){
  var drink = this;
  if(drink.isModified("likes")){
    drink.numLikes = drink.likes.length;
  }
  next();
})
const Drink = mongoose.model('Drink', drinkSchema);

export default Drink;
