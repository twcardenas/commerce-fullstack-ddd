
import http from "http";
import path from "path";
import bodyParser from "body-parser";
import express from "express";
import Redis from 'ioredis';

const redis = new Redis();
const pub = new Redis();
redis.subscribe("newOrder", (err:any, count:any) => {
  // Now we are subscribed to both the 'news' and 'music' channels.
  // `count` represents the number of channels we are currently subscribed to.
  console.log({count})

});

redis.on("message", (channel:any, message:any) => {
  // Receive message Hello world! from channel news
  // Receive message Hello again! from channel music
  console.log("Receive message %s from channel %s", message, channel);
  setTimeout(() => {
    console.log("Processing order")
    let data = JSON.parse(message)
    let updatedOrder = {
      ...data,
      data: [{
        ...data.data[0],
        fulfillment: "successful"
      }]
    }
    pub.publish("orderComplete", JSON.stringify(updatedOrder));
  }, 6000)
});

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const httpServer = http.createServer(app);

const PORT = 4001;
httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`)
})
