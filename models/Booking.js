import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
  {
    experience: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience', required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    dateISO: { type: String, required: true },
    slotTime: { type: String, required: true },
    numGuests: { type: Number, required: true, min: 1 },
    promoCode: { type: String },
    finalPrice: { type: Number, required: true }
  },
  { timestamps: true }
);

BookingSchema.index({ experience: 1, dateISO: 1, slotTime: 1 }, { unique: true });

export default mongoose.model('Booking', BookingSchema);


