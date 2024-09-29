const auth = jest.fn().mockReturnValue({
  signInWithEmailAndPassword: jest.fn((email, password) => {
    if (email === 'test@example.com' && password === 'password123')
    {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('Invalid login credentials'));
    }
  }),
});

export default { auth };
