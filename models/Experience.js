import mongoose from 'mongoose';

const SlotSchema = new mongoose.Schema(
  {
    time: { type: String, required: true },
    capacity: { type: Number, required: true, default: 1 }
  },
  { _id: false }
);

const ExperienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    dates: [{ type: String, required: true }],
    slots: [SlotSchema],
    imageUrl: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Experience', ExperienceSchema);


