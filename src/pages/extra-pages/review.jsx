import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Reviews
  const fetchReviews = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/reviews");
      setReviews(data.data);
    } catch (err) {
      setError("Failed to fetch reviews");
      toast.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  // Delete Review
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/v1/reviews/${id}`);
      setReviews(reviews.filter((review) => review._id !== id));
      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-3xl font-bold text-center mb-6">Admin - Manage Reviews</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading reviews...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-600">No reviews found.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-lg rounded-lg p-5 border border-gray-200 relative hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800">{review.username}</h3>
              <p className="text-gray-600 mt-1">{review.reviewText}</p>
              <p className="text-yellow-500 font-bold mt-2">{review.rating} ⭐</p>
              <button
                onClick={() => handleDelete(review._id)}
                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition-colors duration-300"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReviews;