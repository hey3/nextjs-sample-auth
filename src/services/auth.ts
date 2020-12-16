import jwt from 'jsonwebtoken'

type SignPayload = {
  id: string
}

type VerifyPayload = {
  id: string
  iat: number
  exp: number
}

const AuthService = {
  async createUser(pwd: string): Promise<string> {
    return await fetch('https://paassword.now.sh/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pwd }),
    })
      .then(res => res.json())
      .then(json => json.id)
  },
  async validatePassword(passwordId: string, pwd: string): Promise<boolean> {
    return await fetch(`https://paassword.now.sh/api/get/${passwordId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pwd }),
    })
      .then(res => res.json())
      .then(json => json.valid)
  },
  async sign(payload: SignPayload): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, process.env.SECRET || 'secret', { expiresIn: '1d' }, (err, token) => {
        if (err) {
          return reject(err)
        }
        return resolve(token)
      })
    })
  },

  async verify(token: string): Promise<VerifyPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET || 'secret', (err, payload) => {
        if (err) {
          return reject(err)
        }
        return resolve(payload as VerifyPayload)
      })
    })
  },
}

export default AuthService
