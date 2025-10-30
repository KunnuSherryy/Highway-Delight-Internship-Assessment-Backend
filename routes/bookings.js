import { Router } from 'express';
import Joi from 'joi';
import Booking from '../models/Booking.js';
import Experience from '../models/Experience.js';

const router = Router();

const bookingSchema = Joi.object({
  experienceId: Joi.string().required(),
  customerName: Joi.string().min(2).required(),
  customerEmail: Joi.string().email().required(),
  // accept YYYY-MM-DD date-only strings
  dateISO: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
  slotTime: Joi.string().required(),
  numGuests: Joi.number().integer().min(1).required(),
  promoCode: Joi.string().allow('', null)
});

router.post('/', async (req, res, next) => {
  try {
    const { value, error } = bookingSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const exp = await Experience.findById(value.experienceId);
    if (!exp) return res.status(404).json({ message: 'Experience not found' });

    // Normalize incoming date to YYYY-MM-DD and compare
    const dateOnly = (() => {
      try { return new Date(value.dateISO).toISOString().slice(0, 10); }
      catch { return value.dateISO; }
    })();

    if (!exp.dates.includes(dateOnly)) {
      return res.status(400).json({ message: 'Invalid date for this experience' });
    }
    const slot = exp.slots.find((s) => s.time === value.slotTime);
    if (!slot) return res.status(400).json({ message: 'Invalid slot for this experience' });

    const finalPrice = exp.price * value.numGuests;

    const booking = new Booking({
      experience: exp._id,
      customerName: value.customerName,
      customerEmail: value.customerEmail,
      dateISO: value.dateISO,
      slotTime: value.slotTime,
      numGuests: value.numGuests,
      promoCode: value.promoCode || undefined,
      finalPrice
    });

    await booking.save();
    res.status(201).json({ id: booking._id, message: 'Booking confirmed' });
  } catch (err) {
    next(err);
  }
});

export default router;


