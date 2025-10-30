import { Router } from 'express';
import Joi from 'joi';

const router = Router();

const PROMOS = {
  SAVE10: { type: 'percent', value: 10 },
  FLAT100: { type: 'flat', value: 100 }
};

const schema = Joi.object({
  code: Joi.string().uppercase().required(),
  baseAmount: Joi.number().min(0).required()
});

router.post('/validate', (req, res) => {
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const rule = PROMOS[value.code];
  if (!rule) return res.status(404).json({ message: 'Invalid promo code' });

  let discount = 0;
  if (rule.type === 'percent') discount = (value.baseAmount * rule.value) / 100;
  if (rule.type === 'flat') discount = rule.value;
  const finalAmount = Math.max(0, value.baseAmount - discount);

  return res.json({ valid: true, code: value.code, discount, finalAmount });
});

export default router;


