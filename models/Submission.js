import mongoose, {Schema} from 'mongoose';

const schemaOptions = {
  toJSON: {
    virtuals: true
  }
};

const submissionSchema = new Schema({
  name: String,
  url: String,
  image: String,
  submitterId: String,
  submitterName: String,
  likes: [String],
  numLikes: Number,
  createdAt: Date
}, schemaOptions);

submissionSchema.pre('save', function(next){
  let drink = this;
  if(drink.isModified("likes")){
    drink.numLikes = drink.likes.length;
  }
  next();
});
const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;
