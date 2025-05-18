<template>
  <div class="tableau-container">
    <!-- Loading state -->
    <div v-if="loading" class="status-overlay">
      <div class="loading-content">
        <p>Loading visualization...</p>
        <div class="loading-spinner"></div>
      </div>
    </div>

    <!-- Error state -->
    <div v-if="error" class="status-overlay error">
      <div class="error-content">
        <p>{{ error }}</p>
        <button @click="initialize" class="retry-button">
          <span class="retry-icon">↻</span> Try Again
        </button>
        <p v-if="!showFallback" class="fallback-notice">
          Switching to alternative viewer...
        </p>
      </div>
    </div>

    <!-- Primary Tableau container -->
    <div 
      v-show="!showFallback" 
      ref="tableauContainer" 
      class="viz-frame"
      :style="{ height: frameHeight }"
    ></div>

    <!-- Fallback iframe -->
    <iframe
      v-show="showFallback"
      ref="fallbackFrame"
      :src="fallbackUrl"
      class="fallback-frame"
      :style="{ height: frameHeight }"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'TableauViz',
  props: {
    vizUrl: {
      type: String,
      default: 'Totalseverityofattacksperuserrole/Totalseverityofattacksperuserrole'
    },
    height: {
      type: [String, Number],
      default: '600px'
    }
  },
  data() {
    return {
      loading: true,
      error: null,
      viz: null,
      showFallback: false,
      fallbackUrl: `https://public.tableau.com/views/${this.vizUrl}?:embed=true&:showVizHome=no`,
      apiLoadAttempts: 0,
      maxApiAttempts: 2
    };
  },
  computed: {
    frameHeight() {
      return typeof this.height === 'number' ? `${this.height}px` : this.height;
    }
  },
  mounted() {
    this.initialize();
  },
  beforeUnmount() {
    this.cleanup();
  },
  methods: {
    async initialize() {
      this.loading = true;
      this.error = null;
      
      try {
        await this.loadWithApi();
      } catch (err) {
        console.error('Primary load failed:', err);
        await this.handleLoadFailure(err);
      }
    },

    async loadWithApi() {
      // Reset state
      this.showFallback = false;
      this.cleanup();

      // Step 1: Load API script
      await this.loadTableauApi();
      
      // Step 2: Verify API
      if (!this.verifyTableauApi()) {
        throw new Error('Tableau API loaded but Viz constructor not found');
      }
      
      // Step 3: Create visualization
      await this.createTableauViz();
      
      this.loading = false;
    },

    loadTableauApi() {
      return new Promise((resolve, reject) => {
        // Cleanup previous script if exists
        this.removeTableauScript();

        const script = document.createElement('script');
        script.id = 'tableau-api-script';
        script.src = 'https://public.tableau.com/javascripts/api/tableau-2.8.0.min.js';
        
        script.onload = () => {
          this.apiLoadAttempts++;
          resolve();
        };
        
        script.onerror = () => {
          reject(new Error('Failed to load Tableau API script'));
        };
        
        document.head.appendChild(script);
      });
    },

    verifyTableauApi() {
      return typeof window.tableau?.Viz === 'function';
    },

    createTableauViz() {
      return new Promise((resolve, reject) => {
        const container = this.$refs.tableauContainer;
        if (!container) {
          reject(new Error('Container element not found'));
          return;
        }

        const url = `https://public.tableau.com/views/${this.vizUrl}?:embed=true&:showVizHome=no`;
        
        const options = {
          hideTabs: true,
          hideToolbar: true,
          width: '100%',
          height: this.frameHeight,
          onFirstInteractive: () => {
            this.$emit('loaded');
            resolve();
          }
        };

        try {
          this.viz = new window.tableau.Viz(container, url, options);
        } catch (err) {
          reject(err);
        }
      });
    },

    async handleLoadFailure(err) {
      this.error = this.getErrorMessage(err);
      
      if (this.apiLoadAttempts < this.maxApiAttempts) {
        // Retry with fresh API load
        await new Promise(resolve => setTimeout(resolve, 1000));
        await this.initialize();
      } else {
        // Fallback to iframe
        this.activateFallback();
      }
    },

    activateFallback() {
      this.showFallback = true;
      this.loading = false;
      this.$emit('fallback-activated');
    },

    getErrorMessage(err) {
      if (err.message.includes('Viz constructor')) {
        return 'Tableau viewer initialization failed. Using alternative viewer...';
      }
      return 'Failed to load visualization. Please check your connection.';
    },

    removeTableauScript() {
      const script = document.getElementById('tableau-api-script');
      if (script) {
        document.head.removeChild(script);
      }
    },

    cleanup() {
      // Dispose Tableau viz
      if (this.viz) {
        try {
          this.viz.dispose();
        } catch (err) {
          console.warn('Error disposing Tableau viz:', err);
        }
        this.viz = null;
      }
      
      // Cleanup global objects
      if (window.tableau) {
        delete window.tableau;
      }
    }
  }
};
</script>

<style scoped>
.tableau-container {
  position: relative;
  width: 100%;
  min-height: 300px;
}

.viz-frame, .fallback-frame {
  width: 100%;
  border: none;
}

.status-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  z-index: 10;
}

.status-overlay.error {
  background: rgba(255, 255, 255, 0.95);
}

.loading-content, .error-content {
  text-align: center;
  max-width: 80%;
}

.loading-spinner {
  margin: 20px auto;
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-button {
  margin-top: 15px;
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
}

.retry-button:hover {
  background: #45a049;
}

.retry-icon {
  margin-right: 8px;
  font-size: 1rem;
}

.fallback-notice {
  margin-top: 10px;
  font-size: 0.8rem;
  color: #666;
}
</style>