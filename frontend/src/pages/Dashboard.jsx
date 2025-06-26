import { Link } from 'react-router-dom'

function Dashboard() {
  return (

    <>

     <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MyApp</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
          <ul className="navbar-nav ms-auto">
            
            <li className="nav-item">
              <Link className="nav-link" to="/logout">Logout</Link>
            </li>
           
          </ul>
        </div>
      
    </nav>

    Welcome to dashboard

    </>
   
      
     
  )
}

export default Dashboard
