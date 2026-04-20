class PerformanceMonitor {
    constructor() {
        this.memoryUsage = [];
        this.fps = [];
        this.lastFrameTime = 0;
    }

    startTracking() {
        this.trackFPS();
        this.trackMemoryUsage();
        this.setupPerformanceObserver();
    }

    trackFPS() {
        const updateFPS = (timestamp) => {
            if (this.lastFrameTime) {
                const delta = timestamp - this.lastFrameTime;
                this.fps.push(1000 / delta);
            }
            this.lastFrameTime = timestamp;
            requestAnimationFrame(updateFPS);
        };
        requestAnimationFrame(updateFPS);
    }

    trackMemoryUsage() {
        setInterval(() => {
            if (performance.memory) {
                this.memoryUsage.push(performance.memory.usedJSHeapSize);
            }
        }, 1000);
    }

    setupPerformanceObserver() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log(entry);
            }
        });
        observer.observe({ entryTypes: ['measure', 'mark', 'navigation'] });
    }

    reportMetrics() {
        console.log('FPS:', this.fps);
        console.log('Memory Usage:', this.memoryUsage);
    }
}

// Usage:
const pm = new PerformanceMonitor();
pm.startTracking();

// Call pm.reportMetrics() to log performance data whenever needed.