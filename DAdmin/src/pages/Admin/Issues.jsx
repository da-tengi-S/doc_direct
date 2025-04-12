import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';

const Issues = () => {
  const { aToken, getIssues, backendUrl, issues, setIssues } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        const response = await getIssues(aToken);
        if (response && response.success && Array.isArray(response.data)) {
          setIssues(response.data);
        } else {
          setError(response.message || 'Failed to load issues.');
        }
      } catch (err) {
        console.error('Error fetching issues:', err);
        setError('Failed to load issues.');
      } finally {
        setLoading(false);
      }
    };
  
    if (aToken) {
      fetchIssues();
    }
  }, [aToken]);
  

  if (loading) return <div>Loading issues...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Submitted Issues</h2>
      <div>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Issue</th>
              <th className="py-2 px-4 border-b">Message</th>
              <th className="py-2 px-4 border-b">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {!Array.isArray(issues) ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Issues data is not available.
                </td>
              </tr>
            ) : issues.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No issues submitted yet.
                </td>
              </tr>
            ) : (
              issues.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">{item.email}</td>
                  <td className="py-2 px-4 border-b">{item.issue}</td>
                  <td className="py-2 px-4 border-b">{item.message}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Issues;
