import React, { useState } from "react";

const AddComment = ({ bookAsin, onAdd }) => {
  const [formData, setFormData] = useState({
    comment: "",
    rate: "1",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODgyMWNjNGZlMzZkMDAwMTU5NzU4MTEiLCJpYXQiOjE3NTMzNTc1MDksImV4cCI6MTc1NDU2NzEwOX0.1zMaw87HUxfDfHX5WurW5VEksQk7q8n3_9d0OLx0md4",
          },
          body: JSON.stringify({
            comment: formData.comment,
            rate: formData.rate,
            elementId: bookAsin,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
      setFormData({
        comment: "",
        rate: "1",
      });
      onAdd();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={formData.comment}
          onChange={handleChange}
          required
          rows={3}
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <label htmlFor="rate">Rating:</label>
        <select
          id="rate"
          value={formData.rate}
          onChange={handleChange}
          required
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <button type="submit" disabled={loading} style={{ marginTop: "10px" }}>
        {loading ? "Adding..." : "Add Comment"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default AddComment;
