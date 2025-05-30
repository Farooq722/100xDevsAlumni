import rateLimit from "express-rate-limit";

export const signupRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  limit: 100, //max 5 request per ip
  message: "Too many signup/login requests, please try again after 10 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

export const resetPasswordRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 4,
  message: "Too many password reset attempts, please try again after 5 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

export const otpRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 4,
  message: "Too many password reset attempts, please try again after 5 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});
