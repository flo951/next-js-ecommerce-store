import { NextApiRequest, NextApiResponse } from 'next';
import {
  createSession,
  createUser,
  getUserByUsername,
  User,
} from '../../util/database';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookie';

type RegisterRequestBody = {
  username: string;
  password: string;
};

type RegisterNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: RegisterRequestBody;
};

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: User };
export default async function registerHandler(
  request: RegisterNextApiRequest,
  response: NextApiResponse<RegisterResponseBody>,
) {
  if (request.method === 'POST') {
    if (
      typeof request.body.username !== 'string' ||
      !request.body.username ||
      typeof request.body.password !== 'string' ||
      !request.body.password
    ) {
      // 400 bad request
      response.status(400).json({
        errors: [{ message: 'Username or Password token not provided' }],
      });
      return;
    }
    if (await getUserByUsername(request.body.username)) {
      response.status(409).json({
        errors: [
          {
            message: 'Username already taken',
          },
        ],
      });
      return;
    }
    const passwordHash = await bcrypt.hash(request.body.password, 12);

    const newUser = await createUser(request.body.username, passwordHash);

    const token = crypto.randomBytes(64).toString('base64');
    const session = await createSession(token, newUser.id);

    const serializedCookie = await createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    response
      .status(201)
      .setHeader('Set-Cookie', serializedCookie)
      .json({ user: newUser });
    return;
  }
}
