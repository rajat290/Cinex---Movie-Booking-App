// Test script to understand show ID validation
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const testShowIds = [
  '1234567890abcdef12345678', // Valid 24-char hex (MongoDB ObjectId)
  'invalid-id',               // Invalid format
  '123',                      // Too short
  '1234567890abcdef123456789', // Too long (25 chars)
  '1234567890abcdef1234567g', // Invalid character 'g'
  '65a1b2c3d4e5f6a1b2c3d4e5'  // Another valid format
];

console.log('Testing show ID validation:');
console.log('Regex pattern:', objectIdRegex.toString());
console.log('');

testShowIds.forEach((id, index) => {
  const isValid = objectIdRegex.test(id);
  console.log(`Test ${index + 1}: '${id}' -> ${isValid ? 'VALID' : 'INVALID'}`);
});

console.log('');
console.log('A valid MongoDB ObjectId should be a 24-character hexadecimal string.');
console.log('Examples: 507f1f77bcf86cd799439011, 65a1b2c3d4e5f6a1b2c3d4e5');
