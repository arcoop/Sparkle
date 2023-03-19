import { createConsumer } from "@rails/actioncable"
export default createConsumer()

let wsUrl;
if (process.env.NODE_ENV !== "production") 
  wsUrl = "ws://localhost:5000/cable";
else
  wsUrl = "/cable";