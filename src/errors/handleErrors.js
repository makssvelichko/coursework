export const handleErrors = (error) => {
  if (error.response) {
    console.log("Error response:", error.response.data);
    alert(error.response.data.message || "An error occurred");
  } else if (error.request) {
    console.log("Error request:", error.request);
  } else {
    console.log("Error message:", error.message);
    alert("An error occurred. Please try again.");
  }
};
