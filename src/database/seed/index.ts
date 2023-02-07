import { createAdmin } from './admin';

createAdmin()
  .catch((err) => console.log(err))
  .then(() => {
    console.log('User admin created!');
  });
