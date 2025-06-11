<template>
    <div class="comment-section">
      <h2 class="comment-title">Community Discussion</h2>
      
      <!-- Comment form -->
      <div class="comment-form">
        <textarea 
          v-model="newComment" 
          placeholder="Share your thoughts about digital aggression..."
          class="comment-input"
        ></textarea>
        <button 
          @click="submitComment" 
          class="submit-btn"
          :disabled="!newComment.trim() || submitting"
        >
          {{ submitting ? 'Posting...' : 'Post Comment' }}
        </button>
      </div>
      
      <!-- Comments list -->
      <div v-if="loadingComments" class="loading-comments">
        Loading comments...
      </div>
      
      <div v-else-if="comments.length === 0" class="no-comments">
        No comments yet. Be the first to share your thoughts!
      </div>
      
      <div v-else class="comments-list">
        <div v-for="comment in comments" :key="comment.comment_id" class="comment-item">
          <div class="comment-header">
            <span class="comment-author">{{ comment.author || 'Anonymous' }}</span>
            <span class="comment-date">{{ formatDate(comment.created_at) }}</span>
          </div>
          <div class="comment-content">{{ comment.comment_content }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CommentSection',
    data() {
      return {
        newComment: '',
        comments: [],
        loadingComments: true,
        submitting: false,
        error: null
      };
    },
    mounted() {
      this.fetchComments();
    },
    methods: {
    /**
 * Asynchronously fetches comments from the backend API.
 *
 * Functionality:
 * - Sends a GET request to the backend endpoint to retrieve all comment data.
 * - Sets `loadingComments` to true during the request to indicate a loading state.
 * - On success, stores the fetched comments in the `comments` array.
 * - On failure, logs the error and sets a user-friendly error message.
 * - In all cases, resets `loadingComments` to false after the request completes.
 *
 * Usage:
 * - Typically called when the component is mounted or when the comments list needs to be refreshed.
 */

      async fetchComments() {
        try {
          this.loadingComments = true;
          const response = await axios.get(
            'https://fit5120mainprojecttp20backend.onrender.com/api/comments'
          );
          this.comments = response.data;
        } catch (err) {
          console.error('Failed to fetch comments:', err);
          this.error = 'Failed to load comments. Please try again later.';
        } finally {
          this.loadingComments = false;
        }
      },
      
      async submitComment() {
        if (!this.newComment.trim() || this.submitting) return;
        
        try {
          this.submitting = true;
          // Replace with your actual API endpoint
          const response = await axios.post(
            'https://fit5120mainprojecttp20backend.onrender.com/api/comments',
            {
              page: 'digital-aggression',
              content: this.newComment,
              // In actual applications, you may need to add user authentication
              author: 'Current User' // Replace with actual username
            }
          );
          
          this.comments.unshift(response.data); // Add the new comment to the top of the list
          this.newComment = ''; // Clear the input box
        } catch (err) {
          console.error('Failed to post comment:', err);
          this.error = 'Failed to post comment. Please try again.';
        } finally {
          this.submitting = false;
        }
      },
      
      formatDate(timestamp) {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    }
  };
  </script>
  
  <style scoped>
.comment-section {
  
/* Add the following line to make it 5vh above the parent document flow */
  margin-top: 5vh;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  width: 55vw;
  max-width: 800px;
  animation: fadeInUp 1s ease-out both;
}

  
  .comment-title {
    font-size: 24px;
    color: #2c3e50;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .comment-form {
    margin-bottom: 30px;
  }
  
  .comment-input {
    width: 100%;
    min-height: 100px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    margin-bottom: 10px;
    resize: vertical;
    transition: border-color 0.3s;
  }
  
  .comment-input:focus {
    border-color: #9b59b6;
    outline: none;
  }
  
  .submit-btn {
    background-color: #9b59b6;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .submit-btn:hover:not(:disabled) {
    background-color: #8e44ad;
  }
  
  .submit-btn:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  .loading-comments, .no-comments {
    text-align: center;
    padding: 20px;
    color: #7f8c8d;
  }
  
  .comments-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .comment-item {
    background-color: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 14px;
  }
  
  .comment-author {
    font-weight: bold;
    color: #2c3e50;
  }
  
  .comment-date {
    color: #7f8c8d;
  }
  
  .comment-content {
    line-height: 1.6;
    color: #34495e;
  }
  
  .error-message {
    color: #e74c3c;
    margin-top: 10px;
    font-size: 14px;
  }
  </style>