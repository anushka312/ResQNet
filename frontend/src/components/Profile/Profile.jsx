import { useState } from "react";

const Profile = () => {
  // Mock user data
  const user = {
    name: "Alice Sharma",
    email: "alice@example.com",
    profilePic: "/src/assets/bg2.jpeg", // Placeholder avatar
  };

  // Mock reports data
  const [reports, setReports] = useState([
    {
      id: 1,
      type: "🔥 Fire",
      location: "MG Road, Delhi",
      status: "Pending",
      date: "April 4, 2025",
    },
    {
      id: 2,
      type: "🚗 Accident",
      location: "NH-8, Gurgaon",
      status: "Resolved",
      date: "March 30, 2025",
    },
  ]);

  const handleDelete = (id) => {
    setReports(reports.filter(report => report.id !== id));
    alert("Report deleted!");
  };

  return (
    <div>
    <div className="w-screen mx-auto bg-white p-6 rounded-xl shadow-md">
      {/* User Info */}
      <div className="flex items-center gap-4">
        <img src={user.profilePic} alt="User" className="w-16 h-16 rounded-full" />
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Reports List */}
      <h3 className="mt-6 text-lg font-semibold">Your Reports</h3>
      <div className="space-y-4 mt-2">
        {reports.length > 0 ? (
          reports.map((report) => (
            <div key={report.id} className="p-4 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center">
              <div>
                <p className="font-medium">{report.type}</p>
                <p className="text-sm text-gray-500">{report.location}</p>
                <p className={`text-sm font-semibold ${report.status === "Resolved" ? "text-green-600" : "text-yellow-600"}`}>
                  {report.status}
                </p>
                <p className="text-xs text-gray-400">{report.date}</p>
              </div>
              <button
                onClick={() => handleDelete(report.id)}
                className="text-red-500 text-sm hover:underline"
              >
                ❌ Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reports found.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Profile;
