import { NextApiRequest, NextApiResponse } from 'next'

import DatabaseService from '../../services/database'
import AuthService from '../../services/auth'
import User from '../../models/User'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} is not allowed.`)
  }

  await DatabaseService.connect()

  const { name, email, password, isSignUp } = req.body
  const user = await User.findOne({ email })

  if (isSignUp) {
    if (user) {
      return res.status(400).end(`An account already exists for email ${email}.`)
    }

    const newUser = new User({
      name,
      email,
      passwordId: await AuthService.createUser(password),
    })

    await newUser.save()

    return res.status(201).json({
      name,
    })
  }

  if (!user) {
    return res.status(400).end(`No account exists for email ${email}.`)
  }

  const isValidPassword = await AuthService.validatePassword(user.passwordId, password)

  if (!isValidPassword) {
    return res.status(400).end('Invalid Password.')
  }

  const token = await AuthService.sign({
    id: user._id,
  })
  if (!token) {
    return res.status(500).end('Internal server error.')
  }
  return res.status(200).end(token)
}
