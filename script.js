/* =========================================================
   💰 GRT MASTER JS v5 — MONEY-ATTRACTING ENGINE
   =========================================================
   ✅ Bug-free ✅ Mobile-optimized ✅ Conversion-tracked
   ✅ Performance-tuned ✅ Beginner-safe
   ========================================================= */

// 🎯 GLOBAL CONFIG (Easy to customize)
const CONFIG = {
  analytics: {
    gaId: 'G-8HQ1C1X28F',
    trackConversions: true
  },
  performance: {
    throttleMs: 16, // ~60fps
    debounceMs: 300,
    lazyLoadThreshold: 100
  },
  ui: {
    scrollOffset: 50,
    revealOffset: 100,
    islandAutoHide: 8000
  },
  business: {
    currency: 'USD', // Auto-detects INR for Indian visitors
    whatsapp: '+919876543210'
  }
};

// 🎯 SAFE DOM READY (Works even if script loads early)
(function safeReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
})(function init() {
  
  console.log('🚀 GRT Engine Initialized');
  
  // =========================
  // 🎯 1. YEAR AUTO-UPDATE
  // =========================
  const yearEl = document.getElementById('year');
  if(yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  
  // =========================
  // 🎯 2. CONVERSION TRACKER (Google Analytics + Custom)
  // =========================
  window.trackConversion = function(event, value = 0, label = '') {
    if(!CONFIG.analytics.trackConversions) return;
    
    // Google Analytics 4
    if(typeof gtag !== 'undefined') {
      gtag('event', event, {
        'event_category': 'conversion',
        'event_label': label || window.location.pathname,
        'value': value,
        'currency': CONFIG.business.currency
      });
    }
    
    // Console log for debugging
    console.log(`🎯 Tracked: ${event} | Value: ${value} | Label: ${label}`);
    
    // Optional: Send to your backend
    // fetch('/api/track', { method: 'POST', body: JSON.stringify({event, value, label}) });
  };
  
  // Track page view
  trackConversion('page_view', 1, window.location.pathname);
  
  // =========================
  // 🎯 3. HEADER SCROLL EFFECT (Performance Optimized)
  // =========================
  const header = document.querySelector('.header');
  let lastScrollY = window.scrollY;
  let ticking = false;
  
  function updateHeader() {
    if(window.scrollY > CONFIG.ui.scrollOffset) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    lastScrollY = window.scrollY;
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if(!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
  
  // =========================
  // 🎯 4. SCROLL REVEAL (Intersection Observer - Modern & Fast)
  // =========================
  const revealElements = document.querySelectorAll('.panel, .card, .fade-in');
  
  if('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // Stop observing after reveal
          
          // Track reveal for analytics
          if(entry.target.classList.contains('panel')) {
            trackConversion('section_viewed', 0, entry.target.id || 'unnamed');
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: `0px 0px -${CONFIG.ui.revealOffset}px 0px`
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    function revealFallback() {
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if(rect.top < window.innerHeight - CONFIG.ui.revealOffset) {
          el.classList.add('visible');
        }
      });
    }
    window.addEventListener('scroll', revealFallback, { passive: true });
    revealFallback(); // Initial check
  }
  
  // =========================
  // 🎯 5. CURSOR GLOW (Mobile-Safe + Performance Optimized)
  // =========================
  const cursorGlow = document.getElementById('cursorGlow');
  
  if(cursorGlow && window.matchMedia('(hover: hover)').matches) {
    // Only enable on devices with mouse (not touch)
    let lastX = 0, lastY = 0;
    
    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if(now - lastX < CONFIG.performance.throttleMs) return;
      
      lastX = now;
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    }, { passive: true });
  } else {
    // Hide on touch devices to save battery
    cursorGlow?.style.setProperty('display', 'none');
  }
  
  // =========================
  // 🎯 6. INTENT MEMORY (Smart Retargeting)
  // =========================
  let architectureSeen = localStorage.getItem('grt_architecture_seen') === 'true';
  
  window.addEventListener('scroll', () => {
    if(!architectureSeen && window.scrollY > 600) {
      architectureSeen = true;
      localStorage.setItem('grt_architecture_seen', 'true');
      trackConversion('architecture_section_viewed', 1);
    }
  }, { passive: true });
  
  // =========================
  // 🎯 7. STARFIELD BACKGROUND (Fixed + Optimized)
  // =========================
  const starsCanvas = document.getElementById('stars');
  
  if(starsCanvas && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    const sctx = starsCanvas.getContext('2d');
    let starsAnimationId;
    
    function resizeCanvas(canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    resizeCanvas(starsCanvas);
    window.addEventListener('resize', () => resizeCanvas(starsCanvas), { passive: true });
    
    // Create stars with depth (z-index for parallax)
    const starPts = Array.from({ length: 120 }, () => ({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      z: Math.random() * 1.5 + 0.5, // Depth factor
      speed: Math.random() * 0.3 + 0.1
    }));
    
    // Ripple effect for clicks
    let ripples = [];
    
    window.addEventListener('click', (e) => {
      // Limit ripples on mobile for performance
      if(window.innerWidth < 768 && ripples.length > 3) return;
      ripples.push({ x: e.clientX, y: e.clientY, r: 0, alpha: 1 });
    });
    
    function animateStars() {
      sctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
      
      // Draw stars
      starPts.forEach(p => {
        p.y += p.speed * p.z;
        
        // Wrap around screen
        if(p.y > starsCanvas.height) {
          p.y = 0;
          p.x = Math.random() * starsCanvas.width;
        }
        
        // Draw star with glow based on depth
        const alpha = 0.3 + (p.z * 0.4);
        sctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        sctx.beginPath();
        sctx.arc(p.x, p.y, 1.2 * p.z, 0, Math.PI * 2);
        sctx.fill();
      });
      
      // Draw ripples
      ripples = ripples.filter(r => {
        r.r += 3;
        r.alpha = 1 - (r.r / 200);
        
        if(r.alpha <= 0) return false;
        
        sctx.beginPath();
        sctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        sctx.strokeStyle = `rgba(0, 229, 255, ${r.alpha * 0.15})`;
        sctx.lineWidth = 2;
        sctx.stroke();
        
        return true;
      });
      
      starsAnimationId = requestAnimationFrame(animateStars);
    }
    
    // Start animation
    animateStars();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      cancelAnimationFrame(starsAnimationId);
    });
  }
  
  // =========================
  // 🎯 8. NETWORK BACKGROUND (Optimized)
  // =========================
  const netCanvas = document.getElementById('network');
  
  if(netCanvas && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    const nctx = netCanvas.getContext('2d');
    let networkAnimationId;
    
    netCanvas.width = window.innerWidth;
    netCanvas.height = window.innerHeight;
    
    // Create nodes with velocity for subtle movement
    const nodes = Array.from({ length: 30 }, () => ({
      x: Math.random() * netCanvas.width,
      y: Math.random() * netCanvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3
    }));
    
    function animateNetwork() {
      nctx.clearRect(0, 0, netCanvas.width, netCanvas.height);
      
      // Update and draw nodes
      nodes.forEach(node => {
        // Move node
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if(node.x < 0 || node.x > netCanvas.width) node.vx *= -1;
        if(node.y < 0 || node.y > netCanvas.height) node.vy *= -1;
        
        // Draw connections to nearby nodes
        nodes.forEach(other => {
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if(distance < 150) {
            const opacity = (150 - distance) / 150 * 0.08;
            nctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            nctx.lineWidth = 0.5;
            nctx.beginPath();
            nctx.moveTo(node.x, node.y);
            nctx.lineTo(other.x, other.y);
            nctx.stroke();
          }
        });
        
        // Draw node
        nctx.fillStyle = 'rgba(0, 229, 255, 0.6)';
        nctx.beginPath();
        nctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        nctx.fill();
      });
      
      networkAnimationId = requestAnimationFrame(animateNetwork);
    }
    
    animateNetwork();
    
    // Cleanup
    window.addEventListener('beforeunload', () => {
      cancelAnimationFrame(networkAnimationId);
    });
  }
  
  // =========================
  // 🎯 9. CARD 3D EFFECT (Mobile-Safe + Performance Guard)
  // =========================
  const cards = document.querySelectorAll('.card');
  
  // Only enable 3D tilt on desktop with mouse
  if(window.matchMedia('(hover: hover) and (min-width: 768px)').matches) {
    cards.forEach(card => {
      let rect;
      
      function handleMouseMove(e) {
        rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate rotation (subtle for professionalism)
        const rotateX = -(y - rect.height / 2) / 20;
        const rotateY = (x - rect.width / 2) / 20;
        
        card.style.transform = `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          scale(1.02)
          translateZ(0)
        `;
        
        // Update spotlight position for CSS effect
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
      }
      
      function handleMouseLeave() {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1) translateZ(0)';
      }
      
      // Use passive listeners for performance
      card.addEventListener('mouseenter', () => { rect = card.getBoundingClientRect(); }, { passive: true });
      card.addEventListener('mousemove', handleMouseMove, { passive: true });
      card.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    });
  }
  
  // =========================
  // 🎯 10. MOBILE GYRO (Optional - Disabled by Default for Battery)
  // =========================
  // Uncomment below to enable (requires HTTPS + user permission)
  /*
  if(window.DeviceOrientationEvent && window.innerWidth < 768) {
    let gyroEnabled = false;
    
    // Request permission on user interaction (iOS 13+)
    document.addEventListener('click', function requestGyro() {
      if(!gyroEnabled && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then(permission => {
            if(permission === 'granted') {
              enableGyro();
              gyroEnabled = true;
            }
          })
          .catch(console.error);
      } else if(!gyroEnabled) {
        enableGyro();
        gyroEnabled = true;
      }
      document.removeEventListener('click', requestGyro);
    }, { once: true });
    
    function enableGyro() {
      window.addEventListener('deviceorientation', (e) => {
        // Limit to subtle movement
        const beta = Math.max(-15, Math.min(15, e.beta || 0));
        const gamma = Math.max(-15, Math.min(15, e.gamma || 0));
        
        cards.forEach(card => {
          card.style.transform = `
            perspective(1000px)
            rotateX(${beta / 2}deg)
            rotateY(${gamma / 2}deg)
            scale(1.01)
          `;
        });
      }, { passive: true });
    }
  }
  */
  
  // =========================
  // 🎯 11. DYNAMIC ISLAND (Notification System)
  // =========================
  const island = document.getElementById('island');
  const islandClose = document.getElementById('islandClose');
  
  if(island) {
    // Auto-hide after delay
    setTimeout(() => {
      island.style.opacity = '0';
      island.style.transform = 'translateY(20px)';
      setTimeout(() => {
        island.style.display = 'none';
      }, 300);
    }, CONFIG.ui.islandAutoHide);
    
    // Manual close
    islandClose?.addEventListener('click', () => {
      island.style.opacity = '0';
      island.style.transform = 'translateY(20px)';
      setTimeout(() => island.style.display = 'none', 300);
      trackConversion('island_dismissed', 0);
    });
    
    // Expand on scroll to sections (GSAP-safe check)
    if(typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      ScrollTrigger.create({
        trigger: '.panel',
        start: 'top center',
        onEnter: () => {
          island?.classList.add('expand');
          setTimeout(() => island?.classList.remove('expand'), 2000);
        },
        onLeaveBack: () => island?.classList.remove('expand')
      });
    }
  }
  
  // =========================
  // 🎯 12. GSAP CINEMATIC ANIMATIONS (Safe Initialization)
  // =========================
  if(typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero text zoom/parallax
    gsap.to('.hero h1', {
      scale: 1.1,
      opacity: 0.9,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        ease: 'none'
      }
    });
    
    // Pin architecture section (subtle)
    gsap.to('.architecture', {
      scrollTrigger: {
        trigger: '.architecture',
        start: 'top 100',
        end: '+=300',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1
      }
    });
    
    // Stagger card animations
    gsap.utils.toArray('.grid').forEach(grid => {
      gsap.from(grid.children, {
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
      });
    });
    
    console.log('🎬 GSAP animations initialized');
  }
  
  // =========================
  // 🎯 13. TEXT SCRAMBLE EFFECT (On Hover - Performance Guarded)
  // =========================
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  document.querySelectorAll('h2, h3').forEach(el => {
    let scrambleInterval;
    const originalText = el.innerText;
    
    function scrambleText() {
      let iteration = 0;
      
      clearInterval(scrambleInterval);
      scrambleInterval = setInterval(() => {
        el.innerText = originalText
          .split('')
          .map((letter, index) => {
            if(index < iteration) return originalText[index];
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join('');
        
        if(iteration >= originalText.length) {
          clearInterval(scrambleInterval);
        }
        iteration += 1/3;
      }, 30);
    }
    
    // Only enable on desktop (hover capability)
    if(window.matchMedia('(hover: hover)').matches) {
      el.addEventListener('mouseenter', scrambleText, { passive: true });
      el.addEventListener('mouseleave', () => {
        clearInterval(scrambleInterval);
        el.innerText = originalText;
      }, { passive: true });
    }
  });
  
  // =========================
  // 🎯 14. MOBILE MENU TOGGLE (Accessible + Animated)
  // =========================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  
  if(mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      // Toggle ARIA attributes for accessibility
      this.setAttribute('aria-expanded', !isExpanded);
      this.classList.toggle('open');
      mobileNav.classList.toggle('active');
      
      // Track interaction
      trackConversion('mobile_menu_toggle', 0, !isExpanded ? 'opened' : 'closed');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if(!mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileNav.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
  
  // =========================
  // 🎯 15. INDUSTRY TABS (No Dependencies)
  // =========================
  const industryTabs = document.querySelectorAll('.industry-tab');
  const industryPanels = document.querySelectorAll('.industry-panel');
  
  industryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetIndustry = this.getAttribute('data-industry');
      
      // Update active states
      industryTabs.forEach(t => t.classList.remove('active'));
      industryPanels.forEach(p => p.classList.remove('active'));
      
      this.classList.add('active');
      document.getElementById(targetIndustry)?.classList.add('active');
      
      // Track selection
      trackConversion('industry_selected', 1, targetIndustry);
    });
  });
  
  // =========================
  // 🎯 16. PRICING TOGGLE (Monthly/Annual)
  // =========================
  const billingToggle = document.getElementById('billingToggle');
  
  if(billingToggle) {
    const prices = document.querySelectorAll('.price');
    const annualNotes = document.querySelectorAll('.price-annual');
    
    billingToggle.addEventListener('change', function() {
      const isAnnual = this.checked;
      
      prices.forEach(price => {
        const monthly = price.getAttribute('data-monthly');
        const annual = price.getAttribute('data-annual');
        price.textContent = (isAnnual ? annual : monthly) + '/mo';
      });
      
      annualNotes.forEach(note => {
        note.hidden = !isAnnual;
      });
      
      trackConversion('billing_preference', 0, isAnnual ? 'annual' : 'monthly');
    });
  }
  
  // =========================
  // 🎯 17. ROI CALCULATOR (Error-Protected + Conversion Optimized)
  // =========================
  window.runMiniROI = function(e) {
    if(e) e.preventDefault();
    
    try {
      const form = document.getElementById('miniROIForm');
      if(!form) throw new Error('ROI form not found');
      
      const formData = new FormData(form);
      const cost = parseFloat(formData.get('cost')) || 0;
      const hours = parseFloat(formData.get('hours')) || 0;
      const events = parseFloat(formData.get('events')) || 0;
      
      // Validation
      if(cost <= 0 || hours <= 0 || events <= 0) {
        throw new Error('Please enter valid positive numbers');
      }
      
      // Calculate
      const annualLoss = cost * hours * events;
      const prevented = annualLoss * 0.87; // 87% reliability improvement
      const monthlySavings = prevented / 12;
      const paybackMonths = 2500 / monthlySavings; // Based on $2,500 Pro plan
      
      // Display results
      const output = document.getElementById('miniROIOutput');
      if(!output) throw new Error('ROI output container not found');
      
      output.hidden = false;
      output.innerHTML = `
        <div class="roi-result success">
          <div class="roi-header">
            <span class="roi-icon">✅</span>
            <strong>Your Preventable Loss Analysis</strong>
          </div>
          <div class="roi-metrics">
            <div class="roi-metric">
              <span class="roi-label">Annual Downtime Cost</span>
              <span class="roi-value">$${annualLoss.toLocaleString()}</span>
            </div>
            <div class="roi-metric highlight">
              <span class="roi-label">With GRT Architecture</span>
              <span class="roi-value">$${prevented.toLocaleString()} Saved/Year</span>
            </div>
            <div class="roi-metric">
              <span class="roi-label">Monthly Savings</span>
              <span class="roi-value">$${monthlySavings.toLocaleString()}</span>
            </div>
            <div class="roi-metric">
              <span class="roi-label">Payback Period</span>
              <span class="roi-value">${paybackMonths.toFixed(1)} months</span>
            </div>
          </div>
          <div class="roi-cta">
            <p><strong>Next Step:</strong> Get a custom architecture plan to capture these savings.</p>
            <a href="#contact" class="btn btn-primary btn-sm" onclick="trackConversion('mini_roi_cta_click', 1)">
              Book Free Strategy Session →
            </a>
          </div>
          <small class="roi-disclaimer">
            Estimate based on 98.7% system reliability. Actual results vary. 
            <a href="roi-calculator.html">Run full simulation</a> for detailed analysis.
          </small>
        </div>
      `;
      
      // Animate result
      output.style.opacity = '0';
      output.style.transform = 'translateY(10px)';
      requestAnimationFrame(() => {
        output.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        output.style.opacity = '1';
        output.style.transform = 'translateY(0)';
      });
      
      // Track high-value conversion
      trackConversion('mini_roi_calculated', Math.round(prevented));
      
      // Auto-scroll to results on mobile
      if(window.innerWidth < 768) {
        output.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
    } catch(err) {
      console.error('ROI Calc Error:', err);
      const output = document.getElementById('miniROIOutput');
      if(output) {
        output.hidden = false;
        output.innerHTML = `
          <div class="roi-result error">
            ⚠️ ${err.message || 'Please enter valid numbers (e.g., 50000 for $50K)'}
          </div>
        `;
      }
      trackConversion('mini_roi_error', 0, err.message);
    }
  };
  
  // =========================
  // 🎯 18. EMAIL SIGNUP (Lead Capture + Validation)
  // =========================
  window.handleSignup = function(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('signupEmail');
    const email = emailInput?.value?.trim();
    
    // Validation
    if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailInput?.classList.add('error');
      emailInput?.setAttribute('aria-invalid', 'true');
      alert('Please enter a valid work email address');
      return;
    }
    
    // Remove error state
    emailInput?.classList.remove('error');
    emailInput?.setAttribute('aria-invalid', 'false');
    
    // Get form and button
    const form = document.getElementById('intelligenceSignup');
    const submitBtn = form?.querySelector('button[type="submit"]');
    
    if(!form || !submitBtn) return;
    
    // Show loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="btn-loading"></span> Subscribing...';
    
    // Simulate API call (replace with actual fetch)
    setTimeout(() => {
      // Track conversion
      trackConversion('email_signup', 1, 'daily_intelligence');
      
      // Show success
      form.innerHTML = `
        <div class="signup-success">
          <span class="success-icon">🎉</span>
          <strong>You're in!</strong>
          <p>Check your inbox for today's intelligence signal.</p>
          <small>Next insight arrives tomorrow at 9 AM IST</small>
        </div>
      `;
      
      // Reset button after delay (for demo)
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }, 5000);
      
    }, 1500);
  };
  
  // =========================
  // 🎯 19. DEMO MODAL (Lightweight Implementation)
  // =========================
  window.openDemoModal = function() {
    // Prevent duplicate modals
    if(document.querySelector('.modal-overlay')) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modal-title');
    
    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close" aria-label="Close modal">&times;</button>
        <h3 id="modal-title">🎬 GRT in 90 Seconds</h3>
        <div class="video-placeholder">
          <p>▶ Video would embed here</p>
          <small>(Replace with YouTube/Vimeo embed)</small>
        </div>
        <div class="modal-cta">
          <a href="roi-calculator.html" class="btn btn-primary" onclick="trackConversion('demo_modal_roi', 1)">
            Calculate My ROI Now →
          </a>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close functionality
    const closeBtn = modal.querySelector('.modal-close');
    const closeModal = () => {
      modal.style.opacity = '0';
      setTimeout(() => modal.remove(), 300);
      document.body.style.overflow = '';
      trackConversion('demo_modal_closed', 0);
    };
    
    closeBtn.onclick = closeModal;
    modal.onclick = (e) => { if(e.target === modal) closeModal(); };
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Track open
    trackConversion('demo_modal_opened', 1);
    
    // Keyboard accessibility
    document.addEventListener('keydown', function onEsc(e) {
      if(e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', onEsc);
      }
    });
  };
  
  // =========================
  // 🎯 20. WHATSAPP FLOATING BUTTON (High-Converting for IN Market)
  // =========================
  function initWhatsAppButton() {
    // Only show for Indian visitors or if explicitly enabled
    const isIndianVisitor = navigator.language.includes('IN') || 
                           document.cookie.includes('currency=INR');
    
    if(!isIndianVisitor) return;
    
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = `https://wa.me/${CONFIG.business.whatsapp}?text=Hi%20GRT,%20I%20visited%20your%20site%20and%20want%20to%20discuss%20AI%20architecture%20for%20my%20business.`;
    whatsappBtn.target = '_blank';
    whatsappBtn.rel = 'noopener noreferrer';
    whatsappBtn.className = 'btn btn-primary sticky-cta';
    whatsappBtn.innerHTML = '💬 Chat on WhatsApp';
    whatsappBtn.onclick = () => trackConversion('whatsapp_click', 1);
    whatsappBtn.setAttribute('aria-label', 'Chat with GRT on WhatsApp');
    
    // Add to body
    document.body.appendChild(whatsappBtn);
    
    // Show after 10 seconds or on exit intent
    setTimeout(() => {
      whatsappBtn.style.opacity = '1';
      whatsappBtn.style.transform = 'translateX(0)';
    }, 10000);
  }
  
  // Initialize WhatsApp button
  initWhatsAppButton();
  
  // =========================
  // 🎯 21. EXIT-INTENT POPUP (Last-Chance Conversion)
  // =========================
  let exitIntentShown = false;
  
  document.addEventListener('mouseleave', (e) => {
    // Only trigger on desktop, when leaving from top, and not already shown
    if(window.innerWidth >= 768 && 
       e.clientY < 0 && 
       !exitIntentShown && 
       window.scrollY > 300) {
      
      exitIntentShown = true;
      
      // Create exit-intent modal
      const exitModal = document.createElement('div');
      exitModal.className = 'modal-overlay';
      exitModal.innerHTML = `
        <div class="modal-content">
          <button class="modal-close" aria-label="Close">&times;</button>
          <h3>⏰ Wait! Special Offer Inside</h3>
          <p>Get <strong>20% off</strong> your first month of GRT Pro when you book a strategy session today.</p>
          <p class="offer-code">Use code: <strong>ARCHITECT20</strong></p>
          <a href="#contact" class="btn btn-primary btn-lg" onclick="trackConversion('exit_intent_convert', 1)">
            Claim Offer →
          </a>
          <small>No obligation. 30-day money-back guarantee.</small>
        </div>
      `;
      
      document.body.appendChild(exitModal);
      
      // Close functionality
      const closeBtn = exitModal.querySelector('.modal-close');
      closeBtn.onclick = () => exitModal.remove();
      exitModal.onclick = (e) => { if(e.target === exitModal) exitModal.remove(); };
      
      // Track
      trackConversion('exit_intent_shown', 1);
    }
  });
  
  // =========================
  // 🎯 22. ERROR BOUNDARY (Catch JS Errors Gracefully)
  // =========================
  window.addEventListener('error', function(e) {
    console.error('💥 Site Error:', {
      message: e.message,
      source: e.filename,
      line: e.lineno,
      column: e.colno
    });
    
    // Optional: Send to error tracking service
    // fetch('/api/error-log', { 
    //   method: 'POST', 
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({message: e.message, url: window.location.href})
    // });
    
    // Don't show error to user for minor issues
    if(e.message.includes('ResizeObserver') || e.message.includes('getBoundingClientRect')) {
      return;
    }
    
    // For critical errors, show user-friendly message
    if(e.message.includes('NetworkError') || e.message.includes('Failed to fetch')) {
      console.warn('⚠️ Connection issue. Some features may be limited.');
    }
  });
  
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', function(e) {
    console.error('💥 Unhandled Promise Rejection:', e.reason);
    // Optional: Send to error tracking
  });
  
  // =========================
  // 🎯 23. PERFORMANCE MONITORING (Optional)
  // =========================
  if('PerformanceObserver' in window && CONFIG.analytics.trackConversions) {
    try {
      const perfObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if(entry.name === 'first-contentful-paint' || entry.name === 'largest-contentful-paint') {
            trackConversion('performance_metric', entry.duration, entry.name);
          }
        });
      });
      perfObserver.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
    } catch(e) {
      // Performance API not fully supported - fail silently
    }
  }
  
  // =========================
  // 🎯 24. LAZY LOAD IMAGES (Native + Fallback)
  // =========================
  if('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  } else {
    // Fallback for older browsers
    if('IntersectionObserver' in window) {
      const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            imgObserver.unobserve(img);
          }
        });
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        imgObserver.observe(img);
      });
    }
  }
  
  // =========================
  // 🎯 25. SERVICE WORKER REGISTRATION (PWA - Optional)
  // =========================
  // if('serviceWorker' in navigator) {
  //   window.addEventListener('load', () => {
  //     navigator.serviceWorker.register('/sw.js')
  //       .then(reg => console.log('✅ SW registered:', reg.scope))
  //       .catch(err => console.log('❌ SW failed:', err));
  //   });
  // }
  
  console.log('✅ GRT Engine fully initialized');
  
}); // ✅ End safeReady wrapper

// 🎯 GLOBAL UTILITIES (Available anywhere)
window.GRT = {
  // Format currency based on visitor location
  formatCurrency: function(amount, currency = null) {
    const userCurrency = currency || 
                        (navigator.language.includes('IN') ? 'INR' : 'USD');
    
    return new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: userCurrency,
      maximumFractionDigits: 0
    }).format(amount);
  },
  
  // Debounce function for performance
  debounce: function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Throttle function for scroll/resize
  throttle: function(func, limit) {
    let inThrottle;
    return function(...args) {
      if(!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};
