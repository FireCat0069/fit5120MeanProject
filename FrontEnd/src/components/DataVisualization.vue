<template>
  <div class="data-viz-container">
    <!-- Loading state -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-content">
        <div class="spinner"></div>
        <p>Loading visualization data...</p>
      </div>
    </div>
    
    <!-- Error state -->
    <div v-else-if="error" class="error-overlay">
      <div class="error-content">
        <div class="error-icon">⚠️</div>
        <h3>Error Loading Data</h3>
        <p>{{ error }}</p>
        <button @click="fetchData" class="retry-button">
          Retry
        </button>
      </div>
    </div>
    
    <!-- Main content -->
    <div v-else class="viz-content">
      <div class="main-viz-area">
        <!-- ECharts container -->
        <div 
          v-show="!currentViz.isTableau" 
          ref="chart" 
          class="echarts-container"
        ></div>
        
        <!-- Tableau Attack Severity container -->
        <TableauViz
          v-if="currentViz.isTableau && currentIndex === 2"
          ref="tableauViz"
          class="tableau-container"
          @loaded="handleTableauLoaded"
          @error="handleTableauError"
        />
        
        <!-- Tableau Industry Distribution container -->
        <TableauIndustry
          v-if="currentViz.isTableau && currentIndex === 3"
          ref="tableauIndustry"
          class="tableau-container"
          @loaded="handleTableauLoaded"
          @error="handleTableauError"
        />
      </div>
      
      <!-- Info panel -->
      <div class="info-panel">
        <div class="info-header">
          <h3>{{ currentViz.title }}</h3>
          <div class="viz-indicator">
            <span class="current-page">{{ currentIndex + 1 }}</span>
            <span class="total-pages">/ {{ visualizations.length }}</span>
          </div>
        </div>
        
        <div class="info-content">
          <!-- Cyber Attack Data Info -->
          <div v-if="currentIndex === 0">
            <div class="info-section">
              Cyberattack statistics show all users face threats like phishing and zero-day exploits. Digital citizenship is crucial because it:<br><br>
        1) Security Awareness prevents data breaches; <br>
        2) Critical Thinking helps identify scams;<br>
        3) Responsible Behavior reduces attack surfaces.<br><br>
        It teaches vital cybersecurity practices: strong passwords, regular updates, and scam recognition. These skills turn ordinary users into proactive defenders, building a safer digital world against growing online threats.
            </div>
            
          </div>
          
          <!-- Student Focus Data Info -->
          <div v-else-if="currentIndex === 1">
            <div class="metrics-grid">
              <div class="metric-card">
                <div class="metric-value">6.82</div>
                <div class="metric-label">Peak Focus Score</div>
                <div class="metric-condition">(0-3h screen time, 8+h sleep)</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">5.31</div>
                <div class="metric-label">Lowest Focus Score</div>
                <div class="metric-condition">(9+h screen time)</div>
              </div>
            </div>
            <div class="info-section">
              <h4>Patterns Observed</h4>
              <p> By instilling digital citizenship early, we empower students to balance technology with well-being, transforming passive scrolling into productive engagement for academic success.</p>
            </div>
          </div>
          
          <!-- Attack Severity Info -->
          <div v-else-if="currentIndex === 2">
            <div class="info-section">
              <h4>User Role Analysis</h4>
              <p>This visualization shows attack severity distribution across different user roles in the organization.
                Cyberattacks target all user roles, as shown in the chart, emphasizing the importance of digital citizenship. Educating users on safe online practices—like recognizing phishing and avoiding malware—reduces risks. Responsible behavior protects personal and organizational data. Strengthening digital citizenship builds a safer, more secure digital environment for everyone.
              </p>
            </div>
          </div>
          
          <!-- Industry Distribution Info -->
          <div v-else class="industry-info">
            <div class="info-section">
              <h4>Industry Attack Patterns</h4>
              <p>Distribution of cyber attacks across different industry sectors.</p>
            </div>
            <div class="industry-stats">
              <div class="stat-card">
                <div class="stat-value">15.8%</div>
                <div class="stat-label">Government</div>
                <div class="stat-detail">Most Targeted Industries</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">18%</div>
                <div class="stat-label">Phishing </div>
                <div class="stat-detail">Attack Type Prevalence: Most prevalent in Healthcare (1,597) and Retail (1,582)</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">>15%</div>
                <div class="stat-label">Every sector</div>
                <div class="stat-detail">All industries face significant cyber threats, with none immune to multiple attack types.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Navigation controls -->
      <div class="nav-controls">
        <button 
          @click="prevViz" 
          :disabled="currentIndex === 0"
          class="nav-button prev-button"
        >
          <span class="arrow">←</span> Previous
        </button>
        <button 
          @click="nextViz" 
          :disabled="currentIndex === visualizations.length - 1"
          class="nav-button next-button"
        >
          Next <span class="arrow">→</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import axios from 'axios';
import TableauViz from '@/components/TableauViz.vue';
import TableauIndustry from '@/components/TableauIndustry.vue';

export default {
  name: 'DataVisualization',
  components: { TableauViz, TableauIndustry },
  data() {
    return {
      loading: false,
      error: null,
      currentIndex: 0,
      chartInstance: null,
      visualizations: [],
      userRoles: [
        { name: 'External User', severity: 75 },
        { name: 'Contractor', severity: 60 },
        { name: 'Employee', severity: 45 },
        { name: 'Administrator', severity: 85 },
        { name: 'System Account', severity: 30 }
      ],
      apiUrls: {
        cyber: 'https://fit5120mainprojecttp20backend.onrender.com/api/cybersecurity/cycberData',
        student: 'https://fit5120mainprojecttp20backend.onrender.com/api/studentfocus/studentFocus'
      },
      resizeTimer: null
    };
  },
  computed: {
    currentViz() {
      return this.visualizations[this.currentIndex] || { 
        title: '', 
        options: {},
        isTableau: false 
      };
    }
  },
  async mounted() {
    await this.fetchData();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.disposeChart();
    clearTimeout(this.resizeTimer);
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.error = null;
      
      try {
        const [cyberData, studentData] = await Promise.all([
          axios.get(this.apiUrls.cyber),
          axios.get(this.apiUrls.student)
        ]);
        
        this.prepareVisualizations(cyberData.data, studentData.data);
        await this.$nextTick();
        this.initChart();
      } catch (err) {
        this.error = this.getErrorMessage(err);
        console.error('Data fetch error:', err);
      } finally {
        this.loading = false;
      }
    },
    
    prepareVisualizations(cyberData, studentData) {
      this.visualizations = [
        // Cyber Attack Data
        {
          title: 'Cyber Attack Data Breach Analysis',
          options: this.createCyberOptions(cyberData),
          isTableau: false
        },
        // Student Focus Data
        {
          title: 'Student Screen Time vs Focus Level',
          options: this.createStudentOptions(studentData),
          isTableau: false
        },
        // Tableau - Attack Severity
        {
          title: 'Attack Severity by User Role',
          isTableau: true
        },
        // Tableau - Industry Distribution
        {
          title: 'Industry-Wise Attack Distribution',
          isTableau: true
        }
      ];
    },
    
    createCyberOptions(data) {
      return {
        tooltip: {
          trigger: 'axis',
          formatter: params => `
            <strong>${params[0].name}</strong><br/>
            Data Breached: <b>${params[0].value.toLocaleString()}GB</b>
          `
        },
        grid: {
          left: '5%',
          right: '25%',
          bottom: '15%',
          top: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          name: 'Data Breach Volume (GB)',
          axisLabel: {
            formatter: value => `${(value / 1000).toFixed(0)}K`
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        yAxis: {
          type: 'category',
          name: 'Attack Type',
          data: data.map(d => d.attack_type),
          axisLabel: {
            interval: 0,
            rotate: 30
          }
        },
        series: [{
          type: 'bar',
          data: data.map(d => d.total_data_compromised_gb),
          itemStyle: {
            color: params => {
              const colors = [
                '#c23531', '#2f4554', '#61a0a8', '#d48265',
                '#91c7ae', '#749f83', '#ca8622', '#bda29a'
              ];
              return {
                type: 'linear',
                x: 0, y: 0, x2: 1, y2: 0,
                colorStops: [
                  { offset: 0, color: colors[params.dataIndex % colors.length] },
                  { offset: 1, color: '#aaa' }
                ]
              };
            }
          },
          label: {
            show: true,
            position: 'right',
            formatter: params => `${(params.value / 1000).toFixed(0)}K GB`
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };
    },
    
    createStudentOptions(data) {
  // Data preprocessing: Make sure all field types are correct
  const processedData = data.map(item => ({
    screen_bin: item.screen_bin,
    sleep_bin: item.sleep_bin,
    average_focus: Number(item.average_focus) || 0
  }));

  const screenBins = [...new Set(processedData.map(d => d.screen_bin))];
  const sleepBins = [...new Set(processedData.map(d => d.sleep_bin))];
  const focusValues = processedData.map(d => d.average_focus);
  const focusMin = Math.min(...focusValues);
  const focusMax = Math.max(...focusValues);

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#ddd',
      borderWidth: 1,
      padding: 12,
      textStyle: {
        color: '#333',
        fontSize: 12
      }
    },
    grid: {
      left: '10%',
      right: '20%',
      bottom: '20%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      name: 'Screen Time (hours)',
      nameGap: 25,
      data: screenBins,
      axisLabel: {
        interval: 0,
        rotate: 0,
        color: '#666'
      },
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'category',
      name: 'Sleep Time (hours)',
      nameGap: 25,
      data: sleepBins,
      axisLabel: {
        interval: 0,
        color: '#666'
      },
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      }
    },
    visualMap: {
      min: focusMin,
      max: focusMax,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '5%',
      inRange: {
        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      },
      textStyle: {
        color: '#666'
      },
      formatter: value => typeof value === 'number' ? value.toFixed(1) : 'N/A'
    },
    series: [{
      type: 'scatter',
      symbolSize: data => {
        const size = Math.sqrt(data[2]) * 12;
        return Math.min(Math.max(size, 8), 30); 
      },
      data: processedData.map(d => [d.screen_bin, d.sleep_bin, d.average_focus]),
      itemStyle: {
        opacity: 0.8,
        borderColor: '#fff',
        borderWidth: 1
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          borderColor: '#000',
          borderWidth: 2,
          opacity: 1
        },
        label: {
          show: true,
          formatter: params => {
            const value = params.value[2];
            return [
              `Screen: ${params.value[0]}h`,
              `Sleep: ${params.value[1]}h`,
              `Focus: ${typeof params.value[2] === 'number' ? params.value[2].toFixed(1) : 'N/A'}`
            ].join('\n');
          },
          position: 'top',
          color: '#333',
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderColor: '#999',
          borderWidth: 1,
          borderRadius: 4,
          padding: [4, 8],
          fontSize: 12
        }
      }
    }]
  };
},
    
    initChart() {
  if (!this.$refs.chart || this.currentViz.isTableau) return;
  
  this.disposeChart();
  
  try {
    this.chartInstance = echarts.init(this.$refs.chart);
    
    // 添加事件监听
    this.chartInstance.on('click', params => {
      console.log('Chart clicked:', params);
    });
    
    // 添加鼠标悬停效果
    this.chartInstance.on('mouseover', params => {
      this.chartInstance.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: params.dataIndex
      });
    });
    
    this.chartInstance.on('mouseout', () => {
      this.chartInstance.dispatchAction({
        type: 'downplay',
        seriesIndex: 0
      });
    });
    
    this.updateChart();
    
  } catch (err) {
    console.error('ECharts init error:', err);
  }
},
    
    updateChart() {
      if (this.chartInstance && !this.currentViz.isTableau) {
        this.chartInstance.setOption(this.currentViz.options, true);
      }
    },
    
    disposeChart() {
      if (this.chartInstance) {
        try {
          this.chartInstance.dispose();
        } catch (err) {
          console.warn('ECharts dispose warning:', err);
        }
        this.chartInstance = null;
      }
    },
    
    handleResize() {
      if (this.chartInstance && !this.currentViz.isTableau) {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          try {
            this.chartInstance.resize();
          } catch (err) {
            console.warn('Resize error:', err);
          }
        }, 200);
      }
    },
    
    handleTableauLoaded() {
      console.log('Tableau visualization loaded');
      this.$emit('tableau-loaded');
    },
    
    handleTableauError(err) {
      console.error('Tableau error:', err);
      this.error = 'Failed to load interactive visualization. Showing simplified version.';
      this.$emit('tableau-error', err);
    },
    
    nextViz() {
      if (this.currentIndex < this.visualizations.length - 1) {
        this.currentIndex++;
        if (!this.currentViz.isTableau) {
          this.initChart();
        }
      }
    },
    
    prevViz() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.initChart();
      }
    },
    
    getErrorMessage(err) {
      if (err.response) {
        return `Server error (${err.response.status}): ${err.response.data.message || 'Unknown error'}`;
      } else if (err.request) {
        return 'Network error: Failed to connect to server';
      } else {
        return 'Application error: Failed to process data';
      }
    }
  }
};
</script>

<style scoped>
.data-viz-container {
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  max-width: 3000px; 
  margin: 30px auto;  
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: relative;
  min-height: 700px; 
}

.loading-overlay, .error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  z-index: 100;
}

.loading-content {
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-content {
  text-align: center;
  max-width: 80%;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.error-content h3 {
  color: #d9534f;
  margin-bottom: 10px;
}

.retry-button {
  background: #5bc0de;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 15px;
  transition:  0.2s;
}

.retry-button:hover {
  background: #31b0d5;
}

.viz-content {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 70px;  
  min-height: 700px;  
}

@media (min-width: 1000px) {
  .viz-content {
    grid-template-columns: 3fr 1fr;  
    grid-template-rows: auto 70px;
  }
}

.main-viz-area {
  padding: 5px;  
  position: relative;
}

.echarts-container {
  width: 100%;
  height: 600px; 
}

.tableau-container {
  width: 100%;
  height: 600px;  
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}
.info-panel {
  padding: 20px;
  background: #f9fafc;
  border-left: 1px solid #eaeaea;
  overflow-y: auto;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.info-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.3rem;
}

.viz-indicator {
  background: #e0e0e0;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.current-page {
  font-weight: bold;
  color: #3498db;
}

.total-pages {
  color: #7f8c8d;
}

.info-content {
  padding: 10px 0;
}

.info-section {
  margin-bottom: 25px;
}

.info-section h4 {
  color: #34495e;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
}

.findings-list, .recommendations-list {
  padding-left: 20px;
}

.findings-list li {
  margin-bottom: 8px;
  color: #555;
}

.recommendations-list li {
  margin-bottom: 10px;
  color: #444;
}

.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.metric-card {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.metric-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 5px;
}

.metric-label {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 5px;
}

.metric-condition {
  font-size: 0.8rem;
  color: #888;
}

.role-severity {
  margin-top: 20px;
}

.severity-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}

.severity-bar {
  height: 20px;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  border-radius: 4px;
  margin-right: 10px;
  min-width: 5%;
}

.role-name {
  min-width: 120px;
  font-size: 0.9rem;
  color: #333;
}

.severity-value {
  margin-left: 10px;
  font-weight: bold;
  color: #2c3e50;
}

.industry-stats {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  margin-top: 20px;
}

.stat-card {
  background: white;
  border-radius: 6px;
  padding: 1px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.stat-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.stat-detail {
  font-size: 0.8rem;
  color: #666;
}

.nav-controls {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: #f5f7fa;
  border-top: 1px solid #eaeaea;
}

.nav-button {
  background: white;
  border: 1px solid #ddd;
  padding: 8px 20px;
  margin: 0 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
}

.nav-button:hover:not(:disabled) {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.arrow {
  font-weight: bold;
  margin: 0 5px;
}

@media (max-width: 768px) {
  .viz-content {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 60px;
  }
  
  .main-viz-area {
    order: 1;
  }
  
  .info-panel {
    order: 2;
    border-left: none;
    border-top: 1px solid #eaeaea;
  }
  
  .nav-controls {
    order: 3;
  }
  
  .echarts-container, .tableau-container {
    height: 400px;
  }
  
  .metrics-grid, .industry-stats {
    grid-template-columns: 1fr;
  }
}
</style>