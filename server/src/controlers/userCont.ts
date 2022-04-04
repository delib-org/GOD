import { userValidate } from '../models/userValidation';

export function login(req: any, res: any): void {
  try {
    const { username, password } = req.body;

    const valid = userValidate({ username, password });
    if (!valid) {
      console.log(userValidate.errors);
      throw new Error('Validation Error');
    }

    res.send({ username, password });
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

export function getUser(req: any, res: any): void {
  try {
    const user = req.user;

    res.send({ user });
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

export function secret(req: any, res: any): void {
  try {
    res.send({ secret: true });
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err.message);
  }
}
