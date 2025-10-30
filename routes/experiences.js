import { Router } from 'express';
import Experience from '../models/Experience.js';
import Booking from '../models/Booking.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const items = await Experience.find().select('title price location imageUrl');
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.status(404).json({ message: 'Experience not found' });

    const bookings = await Booking.find({ experience: exp._id }).select('dateISO slotTime');
    const bookedSet = new Set(bookings.map((b) => `${b.dateISO}::${b.slotTime}`));

    const availability = exp.dates.map((date) => ({
      date,
      slots: exp.slots.map((s) => ({
        time: s.time,
        capacity: s.capacity,
        isBooked: bookedSet.has(`${date}::${s.time}`)
      }))
    }));

    res.json({
      _id: exp._id,
      title: exp.title,
      description: exp.description,
      price: exp.price,
      location: exp.location,
      imageUrl: exp.imageUrl,
      availability
    });
  } catch (err) {
    next(err);
  }
});

export default router;


