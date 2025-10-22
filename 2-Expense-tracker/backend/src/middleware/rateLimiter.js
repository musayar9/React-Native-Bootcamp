import ratelimiter from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("ip", ip);
    // const { success } = await ratelimiter.limit("my-rate-limit");
    const { success } = await ratelimiter.limit(ip);

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, Please try again later" });
    }
    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
