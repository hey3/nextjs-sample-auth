import { GetServerSideProps } from 'next'
import useSWR from 'swr'
import Cookies from 'js-cookie'

import { withAuth } from '../helpers/withAuth'
import HomeTemplate from '../templates/HomeTemplate'

const Home = (): JSX.Element => {
  const { data } = useSWR('/api/user', () =>
    fetch('/api/user', {
      headers: {
        authorization: Cookies.get('_wsp') ?? '',
      },
    }).then(res => {
      if (!res.ok) {
        return res.text()
      }
      return res.json()
    })
  )
  return <HomeTemplate user={data} />
}

export default Home

export const getServerSideProps: GetServerSideProps = withAuth()
