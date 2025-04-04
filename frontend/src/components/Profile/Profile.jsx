import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useCrisis } from "../../CrisisContext";
import placeholderAvatar from "../../assets/bg2.jpeg";

const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const { crisisLocations, removeCrisisLocation } = useCrisis();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const allReports = crisisLocations.map((report, index) => ({
      id: report.id || index,
      type: report.type,
      location: `${report.lat}, ${report.lng}`,
      date: report.date || new Date().toLocaleDateString(),
      description: report.description || "No description provided",
    }));

    setReports(allReports);
  }, [crisisLocations]);

  const handleDelete = (id) => {
    removeCrisisLocation(id);
    setReports((prev) => prev.filter((report) => report.id !== id));
    alert("Report deleted!");
  };

  return (
    <div className="w-screen mx-auto bg-white p-6 rounded-xl shadow-md">
      {/* User Info */}
      <div className="flex items-center gap-4">
        <img
          src={user?.photoURL || placeholderAvatar}
          alt="User"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{user?.displayName || "Guest"}</h2>
          <p className="text-gray-600">{user?.email || "Not Signed In"}</p>
        </div>
      </div>

      {/* Reports List */}
      <div className="w-[80vw] mx-auto mt-6">
        <h3 className="text-lg font-semibold mb-4">Your Reports</h3>
        <div className="space-y-4">
          {reports.length > 0 ? (
            reports.map((report) => (
              <div
                key={report.id}
                className="p-4 bg-gray-100 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="text-xl p-0.5">🆘 {report.type}</p>
                  <p className="text-lg text-gray-600 p-0.5">📍 {report.location}</p>
                  <p className="text-lg text-gray-500 p-0.5">📝 {report.description}</p>
                  <p className="text-lg text-gray-600 p-0.5">📅 {report.date}</p>
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
