// Utility module for saving and retrieving quiz scores and user profile in localStorage

// Key under which all quiz scores are stored
const STORAGE_KEY = 'quizScores';

// Key under which user profile is stored
const USER_KEY = 'userProfile';

/**
 * Retrieve the entire scores object from localStorage.
 * @returns {Record<string, number[]>}
 */
function getAllScores() {
  const json = localStorage.getItem(STORAGE_KEY) || '{}';
  try {
    const parsed = JSON.parse(json);
    // Ensure each entry is an array
    Object.entries(parsed).forEach(([k, v]) => {
      if (!Array.isArray(v)) parsed[k] = [];
    });
    return parsed;
  } catch (e) {
    console.error('Failed to parse quiz scores from localStorage:', e);
    return {};
  }
}

/**
 * Save the entire scores object back to localStorage.
 * @param {Record<string, number[]>} scores
 */
function saveAllScores(scores) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch (e) {
    console.error('Failed to save quiz scores to localStorage:', e);
  }
}

/**
 * Record a new attempt for a specific quiz.
 * @param {string} quizId - Unique identifier for the quiz.
 * @param {number} score - Score achieved (0-10).
 */
export function setQuizScore(quizId, score) {
  const scores = getAllScores();
  if (!Array.isArray(scores[quizId])) {
    scores[quizId] = [];
  }
  scores[quizId].push(score);
  saveAllScores(scores);
}

/**
 * Get the stored score history for a specific quiz.
 * @param {string} quizId
 * @returns {number[]} Array of scores (may be empty).
 */
export function getQuizScoreHistory(quizId) {
  const scores = getAllScores();
  return Array.isArray(scores[quizId]) ? scores[quizId] : [];
}

/**
 * Get an array suitable for plotting latest scores:
 * [ { quizId, score }, ... ]
 * @returns {Array<{ quizId: string, score: number|null }>}
 */
export function getScoresForChart() {
  return Object.entries(getAllScores()).map(([quizId, history]) => {
    const arr = Array.isArray(history) ? history : [];
    // latest score, or null if never attempted
    const latest = arr.length ? arr[arr.length - 1] : null;
    return { quizId, score: latest };
  });
}

/**
 * Count how many times a quiz has achieved full marks (10).
 * @param {string} quizId
 * @returns {number} Number of attempts with score === 10
 */
export function getPassCount(quizId) {
  const history = getQuizScoreHistory(quizId);
  return history.filter(s => s === 10).length;
}

/**
 * Get pass counts for all quizzes:
 * { quizId: passCount, ... }
 * @returns {Record<string, number>}
 */
export function getAllPassCounts() {
  const all = getAllScores();
  return Object.fromEntries(
    Object.entries(all).map(([quizId, history]) => {
      const count = Array.isArray(history)
        ? history.filter(s => s === 10).length
        : 0;
      return [quizId, count];
    })
  );
}

/**
 * Remove the score history for a specific quiz.
 * @param {string} quizId
 */
export function clearQuizScore(quizId) {
  const scores = getAllScores();
  if (scores.hasOwnProperty(quizId)) {
    delete scores[quizId];
    saveAllScores(scores);
  }
}

/**
 * Clear all stored quiz scores/history.
 */
export function clearAllScores() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Retrieve the user profile object from localStorage.
 * @returns {Object}
 */
function getUserProfile() {
  const json = localStorage.getItem(USER_KEY) || '{}';
  try {
    return JSON.parse(json);
  } catch (e) {
    console.error('Failed to parse user profile from localStorage:', e);
    return {};
  }
}

/**
 * Save the user profile object to localStorage.
 * @param {Object} profile
 */
function saveUserProfile(profile) {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save user profile to localStorage:', e);
  }
}

/**
 * Get the stored user name.
 * @returns {string}
 */
export function getUserName() {
  return getUserProfile().name || 'Input name';
}

/**
 * Set the user name and save to localStorage.
 * @param {string} name
 */
export function setUserName(name) {
  const profile = getUserProfile();
  profile.name = name;
  saveUserProfile(profile);
}

/**
 * Get the stored user avatar URL or Base64 string.
 * @returns {string|null}
 */
export function getUserAvatar() {
  return getUserProfile().avatarUrl || null;
}

/**
 * Set the user avatar URL or Base64 string and save to localStorage.
 * @param {string} url
 */
export function setUserAvatar(url) {
  const profile = getUserProfile();
  profile.avatarUrl = url;
  saveUserProfile(profile);
}

// Export the quiz storage key (optional use)
export const QUIZ_STORAGE_KEY = STORAGE_KEY;
