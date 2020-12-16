import { NextApiRequest, NextApiResponse } from 'next'

import DatabaseService from '../../services/database'
import AuthService from '../../services/auth'
import User from '../../models/User'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== 'GET') {
    return res.status(405).end(`Method ${req.method} is not allowed.`)
  }

  await DatabaseService.connect()

  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).end('UnAuthorized.')
  }

  try {
    const { id } = await AuthService.verify(authorization)

    const user = await User.findOne({ _id: id })

    if (!user) {
      return res.status(404).end(`User is not found.`)
    }

    const userObject = user.toObject()
    const responseBody = {
      name: userObject.name,
    }

    return res.json(responseBody)
  } catch {
    return res.status(401).end('UnAuthorized.')
  }
}
