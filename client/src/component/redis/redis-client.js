import { createClient } from "redis";

export const redis = createClient({
  url: "redis://localhost:6379", // Update this URL to your Redis server URL if different
});
