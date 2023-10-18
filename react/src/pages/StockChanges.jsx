import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import Loading from "../components/Loading";
import NavBarAdmin from "../components/NavBarAdmin";
import Footer from "../components/Footer";

const StockChanges = () => {
  const [changes, setChanges] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getChanges();
  }, []);

  // Fetch all changes from API
  const getChanges = () => {
    setLoading(true); // Start loading animation
    axiosClient
      .get("/stock-audits")
      .then(({ data }) => {
        setLoading(false); // Stop loading animation
        setChanges(data.data); // Update the changes state
      })
      .catch(() => {
        setLoading(false); // Stop loading animation on error
      });
  };

  return (
    <>
      <NavBarAdmin />
      <section id="stock-changes">
        <div className="heading">
          <h2>Stock Changes</h2>
        </div>
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Stock Audit ID</th>
                <th>Stock ID</th>
                <th>User ID</th>
                <th>Changes</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    <Loading />
                  </td>
                </tr>
              ) : (
                changes.map((change) => (
                  <tr key={change.stock_audit_id}>
                    <td>{change.stock_audit_id}</td>
                    <td>{change.stock_id}</td>
                    <td>{change.user_id}</td>
                    <td>{JSON.stringify(change.changes)}</td>
                    <td>{change.created_at}</td>
                    <td>{change.updated_at}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default StockChanges;
