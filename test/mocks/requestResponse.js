const mockRequest = () => {
  const req = {
    body: {},
    context: {
      debug: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
    },
    get: jest.fn(),
    headers: jest.fn(),
    params: jest.fn(),
    path: jest.fn(),
    query: jest.fn(),
  };
  return Object.assign({}, req);
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = () => {
  const next = jest.fn();
  return next;
};
module.exports = { mockRequest, mockResponse, mockNext };
