import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div>
      <h2>Oops...Page is not found </h2>
      <p>
        <Link to="/">Home Page</Link>.
      </p>
    </div>
  )
}

export default NotFoundPage
