// Test script to verify the improved booking validation
const express = require('express');
const request = require('supertest');

// Mock the bookings route for testing
const app = express();
app.use(express.json());

// Mock the auth middleware
app.use((req, res, next) => {
  req.user = { _id: 'test-user-id' };
  next();
});

// Import and use the bookings router
const bookingsRouter = require('./moviebooker-backend/routes/bookings');
app.use('/api/bookings', bookingsRouter);

// Test cases for show ID validation
const testCases = [
  {
    name: 'Valid 24-char hex ID',
    showId: '1234567890abcdef12345678',
    expectedStatus: 404, // Should pass validation but fail on show not found
  },
  {
    name: 'Invalid string',
    showId: 'invalid-id',
    expectedStatus: 400,
  },
  {
    name: 'Too short',
    showId: '123',
    expectedStatus: 400,
  },
  {
    name: 'Too long',
    showId: '1234567890abcdef123456789',
    expectedStatus: 400,
  },
  {
    name: 'Invalid characters',
    showId: '1234567890abcdef1234567g',
    expectedStatus: 400,
  }
];

console.log('Testing booking validation with improved error messages:');
console.log('');

testCases.forEach(async (testCase, index) => {
  console.log(`Test ${index + 1}: ${testCase.name}`);
  console.log(`Show ID: '${testCase.showId}'`);
  
  try {
    const response = await request(app)
      .post('/api/bookings')
      .send({
        showId: testCase.showId,
        seats: [{ seatNumber: 'A1', seatType: 'regular' }]
      });
    
    console.log(`Status: ${response.status}`);
    
    if (response.status === 400) {
      console.log('Error Message:', response.body.message);
      console.log('Details:', JSON.stringify(response.body.details, null, 2));
    } else if (response.status === 404) {
      console.log('Show not found (validation passed)');
    }
    
    console.log('---');
  } catch (error) {
    console.log('Error:', error.message);
    console.log('---');
  }
});
