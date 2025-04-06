import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth"; // ✅ imported signOut
import placeholderAvatar from "../../assets/bg2.jpeg";
import { useNavigate } from "react-router-dom"; // ✅ for redirect
import { getUserId } from "../../utils/anonId";

const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();
  const navigate = useNavigate(); // ✅ navigation hook
  const userId = user?.uid;

  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const q = query(
        collection(db, "crisis_reports"),
        where("user_id", "==", userId)
      );
      const snapshot = await getDocs(q);
      const userReports = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReports(userReports);
    };

    fetchReports();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "crisis_reports", id));
      setReports((prev) => prev.filter((r) => r.id !== id));
      alert("✅ Report deleted!");
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("❌ Failed to delete report.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/"); // redirect to home or login
    } catch (err) {
      console.error("Error signing out:", err);
      alert("❌ Could not sign out.");
    }
  };

  return (
    <div className="w-screen mx-auto bg-white p-6 rounded-xl shadow-md">
      {/* User Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={user?.photoURL || placeholderAvatar}
            alt="User"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold">{user?.displayName || "Guest"}</h2>
            <p className="text-gray-600">{user?.email || "Anonymous User"}</p>
          </div>
        </div>
        {user && (
          <button
            onClick={handleSignOut}
            className="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            🔒 Sign Out
          </button>
        )}
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
                  <p className="text-xl p-0.5">🆘 {report.crisis_type}</p>
                  <p className="text-lg text-gray-600 p-0.5">
                    📍 {report.location || `${report.lat}, ${report.lng}`}
                  </p>
                  <p className="text-lg text-gray-500 p-0.5">📝 {report.description}</p>
                  <p className="text-lg text-gray-600 p-0.5">
                    📅{" "}
                    {report.date
                      ? new Date(report.date?.seconds * 1000 || report.date).toLocaleDateString()
                      : "No Date"}
                  </p>
                  {report.image && (
                    <img
                      src={report.image}
                      alt="Report"
                      className="mt-2 w-40 h-auto rounded-md shadow-md"
                    />
                  )}
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
