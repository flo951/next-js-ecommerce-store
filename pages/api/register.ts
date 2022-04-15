import { NextApiRequest, NextApiResponse } from 'next';
import { createUser, getUserByUsername } from '../../util/database';
import bcrypt from 'bcrypt';

export default async function registerHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
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

    console.log(newUser);

    response.status(201).json({ user: newUser });
    return;
  }
}
