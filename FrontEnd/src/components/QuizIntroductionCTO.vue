<template>
    <div class="quiz-container">
      <div class="quiz-page">
            <!-- Left navigation sidebar -->
            <div class="first-section">
            <div class="navbar-brand">DigiWise</div>
            <nav class="nav-links">
              <router-link to="/" class="nav-item">Dashboard</router-link>
              <router-link to="/quiz-bank-i1&i2" class="nav-item">Quiz Bank</router-link>
            </nav>
            </div>
            <!-- Right content area -->
            <div class="main-section">
    
            <div class="navbar-search"> 
                <input type="text" placeholder="Search Quiz" class="search-input"> 
                <button class="search-button">Search</button> 
            </div>
    
            <!-- Breadcrumb navigation -->
            <div class="breadcrumb">
                <span>Dashboard</span> / 
                <span>Schedule Quizzes</span> / 
                <span>Critical Thinking Online</span>
            </div>
    
            <div class="quiz-section">
                    <!-- Left quiz section -->
                    <div class="quiz-section-1">
                        <!-- Quiz title -->
                        <h1 class="quiz-title">Critical Thinking Online</h1>
                        
                        <div class="video-container">
                            <video controls width="100%">  <!-- Show video controls -->
                            <source src="@/assets/digital_citizenship.mp4" type="video/mp4">  <!-- Video path -->
                            Your browser does not support the video tag.
                            </video>
                        </div>
                        <!-- Quiz description -->
                        <div class="quiz-description">
                                <h2>Thinking Clearly in the Digital Space</h2>
                                <p>
                                Critical thinking online means analyzing information carefully, questioning sources, and avoiding misinformation. It helps users make informed decisions and engage responsibly in the digital world.
                                </p>
                                <p>
                                The quiz consists of questions. To be successful with the quizzes, it's important to conversant with the topic by paying attention to the short video.
                                </p>
                                <p>
                                To start, click the "Start" button. When finished, click the "Submit" button.
                                </p>
                        </div>
                    </div>
            
                    <!-- Right quiz section -->
                    <div class="quiz-section-2">
                        <!-- Quiz metadata -->
                        <div class="quiz-meta">
                            <div>
                                <strong>Date:</strong>
                                <span>28/07/2021</span>
                            </div>
                            <div>
                                <strong>Time Limit:</strong>
                                <span>15 Mins</span>
                            </div>
                            <div>
                                <strong>Attempts:</strong>
                                <span>Twice</span>
                            </div>
                            <div>
                                <strong>Pass Points:</strong>
                                <span>80 Points</span>
                            </div>
                        </div>
            
                        <!-- Start Quiz button -->
                        <router-link 
                          :to="{ path: '/Quiz-Content', query: { section: 'Critical Thinking Online' } }"
                          class="start-quiz-btn"
                        >
                          Start Quiz
                        </router-link>
                    </div>
                </div>
            </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  /* Fixed full-screen container */
  .quiz-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
  }
  
  /* Main quiz section styling */
  .quiz-section {
  display: flex;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  
  /* Responsive sizing */
  width: 90vw;          /* 90% of viewport width */
  max-width: 1400px;    /* Maximum width for desktop */
  height: 80vh;         /* 80% of viewport height */
  max-height: 650px;    /* Maximum height for desktop */
  
  /* Scroll handling */
  overflow: auto;
  
  /* Center alignment */
  margin: 0 auto;
  }
  
  /* Page layout */
  .quiz-page {
    height: 100%;
    display: flex;
  }
  
  /* Left sidebar styling */
  .first-section {
    width: 20%;
    min-width: 250px; /* Minimum width (desktop) */
    max-width: 300px; /* Maximum width (prevent stretching) */
    background-color: #f5f5f5;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 1.5rem;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    overflow: auto; /* Enable scrolling */
  }
  
  
  
  /* Brand logo styling */
  .navbar-brand {
    font-size: 1.5rem;
    font-weight: bold;
    color: #c65209;
    margin-right: auto;
    margin-left: 1rem;
    margin-top: 1.2rem;
    margin-bottom: 3.5rem; 
  }
  
  /* Navigation links styling */
  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 1rem; /* Reduced gap for smaller screens */
    width: 100%;
    padding: 0;
  }
  
  /* Navigation item styling */
  .nav-item {
    text-decoration: none;
    color: #1D1D1D;
    font-size: 1rem; /* Smaller font size */
    padding: 0.5rem 1rem; /* Reduced padding */
    border-radius: 5px;
    transition: all 0.3s ease;
    white-space: nowrap;
    width: 100%;
    box-sizing: border-box;
  }
  
  
  /* Navigation hover effect */
  .nav-item:hover {
    background-color: #ea3f06;
    color: white;
  }
  
  /* Main content area */
  .main-section {
    flex: 1;
    padding: 2rem;
    height: 100vh;
    background-color: #f5f5f5;
  }
  
  /* Search bar container */
  .navbar-search { 
    display: flex; 
    align-items: center; /* Vertically center search box */ 
    gap: 3rem; 
    max-width: none; /* Remove width restriction */
  } 
  
  /* Search input field */
  .search-input { 
    padding: 0.5rem 1rem; /* Horizontal padding */ 
    border: 1px solid #ddd; 
    border-radius: 5px; 
    width: 100%; 
    font-size: 1rem; 
  } 
  
  /* Search button */
  .search-button { 
    padding: 0.5rem 3rem;
    background-color: #ea3f06;
    color: white; 
    border: none; 
    border-radius: 5px; 
    cursor: pointer; 
    font-size: 1rem; 
    white-space: nowrap; /* Prevent text wrapping */ 
  } 
  
  /* Search button hover state */
  .search-button:hover { 
    background-color: #a84307;
  }
  
  /* Breadcrumb navigation */
  .breadcrumb {
    font-size: 0.9rem;
    color: #6d6b6b;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  
  /* Breadcrumb items */
  .breadcrumb span {
    color: #6d6b6b; 
    cursor: pointer;
  }
  
  /* Left quiz content section */
  .quiz-section-1 {
    flex: 2;                /* Take 2 parts of available space */
    padding-right: 7rem;  
    min-width: 0;
  }
  
  /* Right quiz content section */
  .quiz-section-2 {
    flex: 1;
  }
  
  /* Quiz title styling */
  .quiz-title {
    font-size: 1.3rem;
    color: #c65209;
    margin-bottom: 1.5rem;
  }
  
  /* Video container */
  .video-container {
    width: 100%;
    max-height: 300px; /* Maximum video height */
    margin-bottom: 1.5rem;
    overflow: hidden; /* Prevent content overflow */
    border-radius: 8px; /* Optional: rounded corners */
  }
  
  /* Video element styling */
  video {
    width: 100%;
    height: auto;
    object-fit: cover; /* Maintain aspect ratio while filling container */
    max-height: inherit; /* Inherit parent height restriction */
  }
  
  /* Quiz metadata grid */
  .quiz-meta {
    display: grid;
    grid-template-columns: max-content 1fr; /* Left labels auto-width, right content fills */
    gap: 1.5rem 3rem; /* Row gap 1.5rem, column gap 3rem */
    background-color: white;
    margin-bottom: 2rem;
    margin-top: 4rem;
    align-items: center; 
  }
  
  /* Metadata div container */
  .quiz-meta div {
    display: contents; /* Remove div layout impact */
  }
  
  /* Metadata label styling */
  .quiz-meta strong {
    white-space: nowrap;
    margin-right: 3rem; /* Fixed spacing between label and value */
    color: #0e0404d8; /* Optional: label text color */
  }
  
  /* Metadata value styling */
  .quiz-meta span {
    color: #727171; /* Value text color */
  }
  
  /* Start Quiz button */
  .start-quiz-btn {
    background-color: #c65209;
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 2rem;
    transition: background-color 0.3s;
  }
  
  /* Start button hover state */
  .start-quiz-btn:hover {
    background-color: #a84307; /* Darker on hover */
  }
  
  /* Quiz description container */
  .quiz-description {
    line-height: 1.6;
  }
  
  /* Quiz description heading */
  .quiz-description h2 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  /* Quiz description paragraphs */
  .quiz-description p {
    margin-bottom: 1rem;
    color: #333;
  }
  </style>