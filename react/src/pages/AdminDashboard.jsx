import NavBar from '../components/NavBar';
import NavBarAdmin from '../components/NavBarAdmin';
import Footer from '../components/Footer';
import { useUserContext } from '../contexts/UserProvider';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Admin.css';





function AdminDashboard() {
    const { accessLevel } = useUserContext();

    useEffect(() =>{
      if (accessLevel === '1'){
        // fetch admin specific information
        



      }

    }, [accessLevel]);
    


    return (
      <div id="index-page">
        {accessLevel === undefined && <NavBar />}
        {accessLevel === '1' && <NavBarAdmin />}
        
        {/* Admin Specific Tabs */}
      {accessLevel === '1' && (
        <div className="admin-tabs container mt-5">
          <div className='row'>
          <div className="col-md-4 mb-3">
              <Link to="/app/admin/users" className="btn btn-danger btn-block admin-button">Manage Users</Link>
          </div>
          <div className="col-md-4 mb-3">
              <Link to="/app/admin/jobs" className="btn btn-danger btn-block admin-button">Manage Jobs</Link>
          </div>
          <div className="col-md-4 mb-3">
              <Link to="/app/admin/stock" className="btn btn-danger btn-block admin-button">Manage Stock</Link>
          </div>
          <div className="col-md-4 mb-3">
              <Link to="/app/admin/device" className="btn btn-danger btn-block admin-button">Manage Device</Link>
          </div>
          <div className="col-md-4 mb-3">
              <Link to="/app/admin/item" className="btn btn-danger btn-block admin-button">Manage Item</Link>
          </div>
          <div className="col-md-4 mb-3">
              <Link to="/app/admin/brand" className="btn btn-danger btn-block admin-button">Manage Brand</Link>
          </div>
          <div className="col-md-4 mb-3">
              <Link to="/app/admin/series" className="btn btn-danger btn-block admin-button">Manage Series</Link>
          </div>
          <div className="col-md-4 mb-3">
              <Link to="/app/admin/stock_changes" className="btn btn-danger btn-block admin-button">Stock Changes</Link>
          </div>
          
        </div>
        </div>
      )}
      



        <Footer />
      </div>
    )
  }
 



export default AdminDashboard