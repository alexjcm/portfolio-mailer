import { createClient } from 'redis';
import logger from '../logger/logger';

logger.info(process.env.REDIS_URL , 'Connecting to Redis PORT:');
const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    // client attempts to reconnect up to 20 times with a delay of retries * 500 milliseconds between attempts.
    reconnectStrategy: function(retries) {
        if (retries > 20) {
          logger.error("Too many attempts to reconnect. Redis connection was terminated");
            return new Error("Too many retries.");
        } else {
            return retries * 500;
        }
    }
  }

});

const connectToRedis = async () => {
  try {
    await client.connect();
    // isOpen will return True here as the client's socket is open now.
    // isReady will return False here as the promise hasn't resolved yet.
    logger.info(`Redis client - isOpen: ${client.isOpen}, isReady: ${client.isReady}`);
  } catch (err) {
    logger.error(err, 'Error connect Redis');
  }
};

client.on('error', (err) => {
  logger.error(err, 'Redis Client Error');
});

connectToRedis();

export { client };
