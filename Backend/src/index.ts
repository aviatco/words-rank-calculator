import dotenv from 'dotenv';
import { App } from './app';

dotenv.config({
  path: '.env'
});


const server = new App();


((port = process.env.APP_PORT || 5000) => {
  server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();