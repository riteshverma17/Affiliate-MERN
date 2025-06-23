import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div>
      welcome to dashboard
      <Link to="/logout">Logout</Link>
    </div>
  )
}

export default Dashboard
