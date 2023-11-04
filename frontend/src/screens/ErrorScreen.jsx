import { useRouteError } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ErrorElement from '../components/routing/ErrorElement'

const ErrorScreen = () => {
  const error = useRouteError()

  return (
    <>
      <Header />
      <main>
        <ErrorElement error={error} />
      </main>
      <Footer />
    </>
  )
}
export default ErrorScreen
