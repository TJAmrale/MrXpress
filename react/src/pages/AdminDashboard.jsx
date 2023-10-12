import NavBar from '../components/NavBar';
import NavBarAdmin from '../components/NavBarAdmin';
import Footer from '../components/Footer';
import { useUserContext } from '../contexts/UserProvider';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';



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
        <div className="admin-tabs">
          <ul>
            <li>
              <Link to="/app/admin/users">Manage Users</Link>
            </li>
            <li>
              <Link to="/app/admin/jobs">Manage Jobs</Link>
            </li>
            <li>
              <Link to="/app/admin/stock">Manage Stock</Link>
            </li>
            <li>
              <Link to="/app/admin/device">Manage Device</Link>
            </li>
          </ul>
        </div>
      )}
      



        <Footer />
      </div>
    )
  }
 



export default AdminDashboard