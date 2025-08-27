// Test script to verify the improved validation logic only
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const testCases = [
  {
    name: 'Valid 24-char hex ID',
    showId: '1234567890abcdef12345678',
    expectedValid: true
  },
  {
    name: 'Invalid string',
    showId: 'invalid-id',
    expectedValid: false
  },
  {
    name: 'Too short',
    showId: '123',
    expectedValid: false
  },
  {
    name: 'Too long',
    showId: '1234567890abcdef123456789',
    expectedValid: false
  },
  {
    name: 'Invalid characters',
    showId: '1234567890abcdef1234567g',
    expectedValid: false
  },
  {
    name: 'Another valid format',
    showId: '65a1b2c3d4e5f6a1b2c3d4e5',
    expectedValid: true
  }
];

console.log('Testing show ID validation logic:');
console.log('Regex pattern:', objectIdRegex.toString());
console.log('');

testCases.forEach((testCase, index) => {
  const isValid = objectIdRegex.test(testCase.showId);
  const status = isValid === testCase.expectedValid ? '✓ PASS' : '✗ FAIL';
  
  console.log(`Test ${index + 1}: ${testCase.name}`);
  console.log(`Show ID: '${testCase.showId}'`);
  console.log(`Expected: ${testCase.expectedValid ? 'VALID' : 'INVALID'}`);
  console.log(`Actual: ${isValid ? 'VALID' : 'INVALID'}`);
  console.log(`Status: ${status}`);
  
  if (!isValid && !testCase.expectedValid) {
    // Simulate the improved error response
    const errorResponse = {
      message: 'Invalid Show ID format. Please provide a valid 24-character hexadecimal MongoDB ObjectId.',
      details: {
        expectedFormat: '24-character hexadecimal string (0-9, a-f, A-F)',
        example: '507f1f77bcf86cd799439011',
        received: testCase.showId,
        length: testCase.showId.length,
        isValidHex: /^[0-9a-fA-F]+$/.test(testCase.showId)
      }
    };
    console.log('Error Response:', JSON.stringify(errorResponse, null, 2));
  }
  
  console.log('---');
});

console.log('Summary:');
console.log('The validation requires a 24-character hexadecimal string (MongoDB ObjectId format)');
console.log('Examples of valid IDs: 507f1f77bcf86cd799439011, 65a1b2c3d4e5f6a1b2c3d4e5');
console.log('The improved error message now provides detailed information about what went wrong.');
