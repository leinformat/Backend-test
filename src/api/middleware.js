import { config } from '../../config/config.js';

// Middleware to validate the token
export const validateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  const expectedToken = config.apiToken;

  console.log(token);
  console.log(req.headers);

  // Check if the token matches the expected token
  if (token === `Bearer ${expectedToken}`) {
    return next();
  }

  // Respond with an error if the token is not present
  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  // Respond with an error if the token is invalid
  return res.status(401).json({ message: "Unauthorized" });
};