jest.mock('mongoose', () => {
  return {
    ...jest.requireActual('mongoose'),
    connection: {
      on: jest.fn()
    },
    connect: jest.fn(),
  };
});

const mongoose = require('mongoose');

mongoose.connection.on.mockImplementation(() => {
    return true;
});
mongoose.connect.mockImplementation(() => {
    return true;
});