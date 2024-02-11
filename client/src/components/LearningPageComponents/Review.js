import React, { useState }  from "react";
import { FaStar } from "react-icons/fa"; // Import star icon

const Reviews = ({ reviews }) => {
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);

  const handleReviewChange = (event) => {
    setNewReview(event.target.value);
  };

  const handleRatingChange = (rating) => {
    setNewRating(rating);
  };

  const handleSubmitReview = () => {
    // Implement your logic to submit the new review here
    console.log("New Review:", newReview);
    console.log("Rating:", newRating);
    // Clear the input fields or update state as needed
    setNewReview("");
    setNewRating(0);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id} className="mb-2">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-semibold">
                {review.userInitials} {/* User's initials */}
              </div>
              <div className="ml-4">
                <p className="text-base font-semibold">{review.userName}</p>
                <div className="flex items-center text-yellow-400">
                  {/* Display star rating */}
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <FaStar key={index} />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-2">{review.comment}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Add a Review</h4>
        <div className="mb-4">
          <label htmlFor="newReview" className="block text-sm font-medium text-gray-700">
            Review:
          </label>
          <textarea
            id="newReview"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows="3"
            value={newReview}
            onChange={handleReviewChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newRating" className="block text-sm font-medium text-gray-700">
            Rating:
          </label>
          <div className="flex items-center space-x-2">
            {/* Display star rating input */}
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                className={`cursor-pointer ${
                  index + 1 <= newRating ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => handleRatingChange(index + 1)}
              />
            ))}
          </div>
        </div>
        <button
          onClick={handleSubmitReview}
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:ring-indigo-400"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default Reviews;