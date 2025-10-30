import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Experience from '../models/Experience.js';

const MONGO_URI = process.env.MONGO_URI;

function ymd(date) {
  return new Date(date).toISOString().slice(0, 10);
}

function nextNDates(n = 10) {
  const out = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  for (let i = 0; i < n; i++) {
    out.push(ymd(new Date(start.getTime() + i * 86400000)));
  }
  return out;
}

function slotsFor(type = 'default') {
  // 6-8 slots across the day in 24h format; capacities vary
  const base = {
    default: [
      { time: '07:00', capacity: 6 },
      { time: '09:00', capacity: 6 },
      { time: '11:00', capacity: 6 },
      { time: '13:00', capacity: 6 },
      { time: '15:00', capacity: 6 },
      { time: '17:00', capacity: 6 },
      { time: '19:00', capacity: 6 }
    ],
    water: [
      { time: '06:00', capacity: 8 },
      { time: '08:00', capacity: 8 },
      { time: '10:00', capacity: 8 },
      { time: '12:00', capacity: 8 },
      { time: '16:00', capacity: 8 },
      { time: '18:00', capacity: 8 }
    ],
    tour: [
      { time: '08:00', capacity: 10 },
      { time: '10:00', capacity: 10 },
      { time: '12:00', capacity: 10 },
      { time: '14:00', capacity: 10 },
      { time: '16:00', capacity: 10 },
      { time: '18:00', capacity: 10 }
    ]
  };
  return base[type] || base.default;
}

async function run() {
  if (!MONGO_URI) throw new Error('MONGO_URI not set');
  await mongoose.connect(MONGO_URI);

  await Experience.deleteMany({});

  const dates10 = nextNDates(10);

  const experiences = [
    {
      title: 'Sunset Kayaking',
      description: 'Enjoy a serene kayaking trip during golden hour.',
      price: 1200,
      location: 'Lakeview',
      dates: dates10,
      slots: slotsFor('water'),
      imageUrl: ''
    },
    {
      title: 'City Food Walk',
      description: 'Taste the best the city has to offer in 3 hours.',
      price: 800,
      location: 'Downtown',
      dates: dates10,
      slots: slotsFor('tour'),
      imageUrl: ''
    },
    {
      title: 'Mountain Trek',
      description: 'Guided trek with scenic viewpoints and safe trails.',
      price: 1500,
      location: 'Highlands',
      dates: dates10,
      slots: slotsFor('default'),
      imageUrl: ''
    },
    {
      title: 'Scuba Diving Intro',
      description: 'Beginner-friendly dive with certified instructor.',
      price: 2200,
      location: 'Coral Bay',
      dates: dates10,
      slots: slotsFor('water'),
      imageUrl: ''
    },
    {
      title: 'Historic City Tour',
      description: 'A curated walk through landmarks and museums.',
      price: 900,
      location: 'Old Town',
      dates: dates10,
      slots: slotsFor('tour'),
      imageUrl: ''
    },
    {
      title: 'River Rafting',
      description: 'Thrilling white-water rafting with pro guides.',
      price: 1800,
      location: 'Rapid Falls',
      dates: dates10,
      slots: slotsFor('water'),
      imageUrl: ''
    },
    {
      title: 'Tea Estate Walk',
      description: 'Leisurely stroll through lush tea gardens.',
      price: 700,
      location: 'Green Hills',
      dates: dates10,
      slots: slotsFor('tour'),
      imageUrl: ''
    },
    {
      title: 'Paragliding Tandem',
      description: 'Soar with an instructor over scenic valleys.',
      price: 3000,
      location: 'Sky Ridge',
      dates: dates10,
      slots: slotsFor('default'),
      imageUrl: ''
    },
    {
      title: 'Desert Safari',
      description: 'Sunset safari with dune bashing and camp dinner.',
      price: 2500,
      location: 'Sand Dunes',
      dates: dates10,
      slots: slotsFor('tour'),
      imageUrl: ''
    },
    {
      title: 'Cave Exploration',
      description: 'Guided spelunking through limestone caves.',
      price: 1400,
      location: 'Crystal Caverns',
      dates: dates10,
      slots: slotsFor('default'),
      imageUrl: ''
    },
    {
      title: 'Cycling by the Sea',
      description: 'Coastal ride with frequent photo stops.',
      price: 600,
      location: 'Blue Coast',
      dates: dates10,
      slots: slotsFor('default'),
      imageUrl: ''
    },
    {
      title: 'Bird Watching Trail',
      description: 'Early morning trail with an expert naturalist.',
      price: 500,
      location: 'Marshlands',
      dates: dates10,
      slots: slotsFor('default'),
      imageUrl: ''
    }
  ];

  await Experience.insertMany(experiences);
  console.log('Seeded experiences:', experiences.length);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});


