import * as Hapi from 'hapi';

import { createServer } from './server';

async function closeServer(server: Hapi.Server, signal: string): Promise<void> {
    console.log(`Received signal: ${signal}, exiting`);
    await server.stop();
  }
  
  async function startServer(): Promise<void> {
    console.log('Starting server..');
    try {
      const server = await createServer();
      // Handle signals gracefully. Heroku will send SIGTERM before idle.
      process.on('SIGTERM', () => closeServer(server, 'SIGTERM'));
      process.on('SIGINT', () => closeServer(server, 'SIGINT(Ctrl-C)'));
      await server.start();
      console.log(`Server listening: ${server.info.uri}`);
    } catch (err) {
        console.log(`Failed to start server: ${err} `);
      throw err;
    }
  }
  
  // execute if being run directly
  if (require.main === module) {
    startServer();
  }
  
  export {
    startServer
  };