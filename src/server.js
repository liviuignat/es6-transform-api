import http from 'http';
import app from './app';

const server = new http.Server(app);
const port = process.env.PORT || 4000;

server.listen(port, (err) => {
  if (err) {
    console.error(err);
  }

  console.info(`----\n==> ✅ es6 converter is running`);
  console.info(`==> 💻  Open http://localhost:${port} in a browser to view the app.`);
});
