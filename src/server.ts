import { Plugin, Server } from 'hapi';

async function createServer(): Promise<Server> {
    const server = new Server(
        {
            host: '127.0.0.1',
            port: 8000,
            routes: {
                cors: true
            }
        }
    );
    return server.register(require('inert'))
        .then(() => {
            server.route({
                method: 'GET',
                path: '/{param*}',
                handler: {
                    directory: {
                        path: './public',
                        index: ['index.html']
                    }
                }
            });
            return server;
        });
}

export {
    createServer
};