# Show ID Format Guide

## Problem
When making a POST request to `http://localhost:5000/api/bookings`, you're getting the error:
```
{
    "message": "Invalid Show ID format. Please provide a valid show ID."
}
```

## Solution
The system expects show IDs in **MongoDB ObjectId format**, which is a 24-character hexadecimal string.

### Valid Show ID Format
- **Length**: Exactly 24 characters
- **Characters**: Only hexadecimal characters (0-9, a-f, A-F)
- **Examples**: 
  - `507f1f77bcf86cd799439011`
  - `65a1b2c3d4e5f6a1b2c3d4e5`
  - `1234567890abcdef12345678`

### How to Get Valid Show IDs

#### Option 1: Use Sample Data Endpoint
1. First, populate the database with sample data:
   ```bash
   curl -X POST http://localhost:5000/api/sample-data/movies
   curl -X POST http://localhost:5000/api/sample-data/theatres
   curl -X POST http://localhost:5000/api/sample-data/shows
   ```

2. Then, get available shows:
   ```bash
   curl http://localhost:5000/api/shows
   ```

3. Look for the `_id` field in the response, which will be a valid show ID.

#### Option 2: Check Existing Shows
If you already have shows in the database:
```bash
curl http://localhost:5000/api/shows
```

#### Option 3: Create Your Own Show
Use the shows API to create a new show and use the returned ID.

### Improved Error Handling
The error message has been enhanced to provide more details:
```json
{
  "message": "Invalid Show ID format. Please provide a valid 24-character hexadecimal MongoDB ObjectId.",
  "details": {
    "expectedFormat": "24-character hexadecimal string (0-9, a-f, A-F)",
    "example": "507f1f77bcf86cd799439011",
    "received": "your-invalid-id",
    "length": 10,
    "isValidHex": false
  }
}
```

### Common Issues
1. **Too short**: ID must be exactly 24 characters
2. **Too long**: ID must be exactly 24 characters  
3. **Invalid characters**: Only 0-9, a-f, A-F are allowed
4. **Wrong format**: Must be a MongoDB ObjectId, not a simple number or string

### Testing Your Show ID
You can test if a show ID is valid using this regex pattern:
```javascript
/^[0-9a-fA-F]{24}$/.test(yourShowId)
```

### Example Valid Booking Request
```json
{
  "showId": "507f1f77bcf86cd799439011",
  "seats": [
    {
      "seatNumber": "A1",
      "seatType": "regular"
    }
  ]
}
```

Remember to include proper authentication headers if required by your API.
