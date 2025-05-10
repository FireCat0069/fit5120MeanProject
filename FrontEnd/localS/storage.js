// storage.js
// Utility module for saving and retrieving quiz scores in localStorage

// Key under which all quiz scores are stored
const STORAGE_KEY = 'quizScores';

/**
 * Retrieve the entire scores object from localStorage.
 * @returns {Record<string, number>} An object mapping quiz IDs to scores.
 */
function getAllScores() {
  const json = localStorage.getItem(STORAGE_KEY) || '{}';
  try {
    return JSON.parse(json);
  } catch (e) {
    console.error('Failed to parse quiz scores from localStorage:', e);
    return {};
  }
}

/**
 * Save the entire scores object back to localStorage.
 * @param {Record<string, number>} scores - Object mapping quiz IDs to scores.
 */
function saveAllScores(scores) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}

/**
 * Get the stored score for a specific quiz.
 * @param {string} quizId - Unique identifier for the quiz (e.g., 'DFP', 'CTO', etc.).
 * @returns {number|null} The stored score, or null if not yet recorded.
 */
export function getQuizScore(quizId) {
  const scores = getAllScores();
  return scores.hasOwnProperty(quizId) ? scores[quizId] : null;
}

/**
 * Record or update the score for a specific quiz.
 * @param {string} quizId - Unique identifier for the quiz.
 * @param {number} score - Score achieved (e.g., 0-10).
 */
export function setQuizScore(quizId, score) {
  const scores = getAllScores();
  scores[quizId] = score;
  saveAllScores(scores);
}

/**
 * Remove the score record for a specific quiz.
 * @param {string} quizId - Unique identifier for the quiz.
 */
export function clearQuizScore(quizId) {
  const scores = getAllScores();
  if (scores.hasOwnProperty(quizId)) {
    delete scores[quizId];
    saveAllScores(scores);
  }
}

/**
 * Clear all stored quiz scores.
 */
export function clearAllScores() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Get an array suitable for plotting: [ { quizId, score }, ... ]
 * Ensures you can iterate and render charts.
 * @returns {Array<{ quizId: string, score: number }>}
 */
export function getScoresForChart() {
  return Object.entries(getAllScores()).map(([quizId, score]) => ({ quizId, score }));
}

// Optionally, export key constants if needed elsewhere
export const QUIZ_STORAGE_KEY = STORAGE_KEY;
