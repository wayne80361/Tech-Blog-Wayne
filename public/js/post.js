// Create a new post form
const createButton = document.querySelector("#create-btn");

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();

  // Check if both title and content have any value
  if (title && content) {
    // Send a POST request
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
};

// Function to delete a post
// const delButton = document.querySelectorAll(".del-btn").forEach();

document.querySelectorAll(".del-btn").forEach((button) => {
  button.addEventListener("click", async function () {
    const postId = this.getAttribute("data-id");
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("The post has been deleted successfully");
        // Remove the closest item with class post container
        this.closest(".post-container").remove();
        document.location.replace("/dashboard");
      } else {
        console.error("Error deleting post:", response.status);
      }
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  });
});

createButton.addEventListener("click", () => newFormHandler);
