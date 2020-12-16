# nextjs-sample-auth

This is a sample to authenticate with Next.js.

![image](https://user-images.githubusercontent.com/38312611/102357081-51faef00-3ff1-11eb-9275-db9c611fb44e.gif)

This sample has `/`, `/login` routes.  
If you are not authenticated, you will be redirected to `/login`.  
In contrast, if you are authenticated, you will be redirected to `/`.

The following tech stack is already installed.

- Main
  - Next.js
  - TypeScript
- Linter
  - ESLint
  - Prettier
- Styling
  - styled-component
- Data fetch
  - SWR
- Form
  - Formik
  - Yup
- Database
  - MongoDB
  - mongoose
  - typegoose

## Env

Create `.env.local` from `.env.sample`.

`MONGO_URL`: set your mongo db url. default is `mongodb://localhost:27017`  
`SECRET`: set secret for jwt. default is `secret`

## Dev

```bash
# run local mongodb
$ mongo
$ use test # This sample uses test DB
# run web app
$ yarn dev
```
