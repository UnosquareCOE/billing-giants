import { Request, Response } from "express";

interface mockRequestArgs {
  body?: any;
  params?: any;
  query?: any;
  headers?: any;
  token?: string;
  locals?: any;
}

const mockRequest = (args?: mockRequestArgs) => {
  return {
    ...args,
  } as unknown as Request;
};

const mockResponse = (userId?: number) => {
  const res = {} as Response;
  res.sendStatus = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export { mockRequest, mockResponse };