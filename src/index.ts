import { appDataSource } from './database';
import { app } from './server';

appDataSource
  .initialize()
  .then(() => {
    console.log('Databases started!');
  })
  .catch((err) => {
    console.log('Database error:', err);
  });

app.listen(3333, () => {
  console.log('Server started!');
});
