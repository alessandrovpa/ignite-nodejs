import { compareSync } from 'bcrypt';

import User from './User';

describe('User Model', () => {
  let user: User;
  it('should be able to create a new user object with as little information as possible', () => {
    user = new User({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password',
      driverLicence: '123ABC',
    });

    const passwordVerify = compareSync('password', user.password);

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('createdAt');
    expect(user).toHaveProperty('updatedAt');
    expect(user.isAdmin).toBe(false);
    expect(passwordVerify).toBe(true);
  });

  it('should be able to create a new user object with full information', () => {
    const newUser = new User({
      name: user.name,
      email: user.email,
      password: user.password,
      driverLicence: user.driverLicence,
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isAdmin: user.isAdmin,
    });

    const passwordVerify = compareSync('password', newUser.password);

    expect(newUser).toMatchObject(user);
    expect(passwordVerify).toBe(true);
  });

  it('should be able to toggle user admin field', () => {
    user.toggleAdmin();
    expect(user.isAdmin).toBe(true);
    user.toggleAdmin();
    expect(user.isAdmin).toBe(false);
  });
});
