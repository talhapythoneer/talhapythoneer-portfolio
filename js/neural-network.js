/**
 * Interactive Neural Network Animation
 * Modern, performance-optimized particle system with mouse interaction
 * Inspired by cutting-edge web design trends
 */

class NeuralNetwork {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error('Canvas element not found');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.mouse = {
            x: null,
            y: null,
            radius: 150,
            active: false
        };
        
        this.animationId = null;
        this.lastTime = 0;
        this.fps = 0;
        
        // Configuration with modern aesthetics - BIGGER SCALE + DEPTH
        this.config = {
            particleCount: this.getParticleCount(),
            particleMinSize: 3,           // Increased from 2
            particleMaxSize: 6,           // Increased from 4
            connectionDistance: 200,      // Increased from 150
            mouseRepelRadius: 250,        // Increased from 200
            mouseRepelForce: 1.5,
            mouseAttractRadius: 120,      // Increased from 100
            particleSpeed: 0.5,
            particleColor: 'rgba(220, 20, 60, 0.8)',      // Crimson particles
            lineColor: 'rgba(220, 20, 60, 0.2)',          // More visible lines
            hoverLineColor: 'rgba(220, 20, 60, 0.5)',     // Brighter on hover
            glowColor: 'rgba(220, 20, 60, 0.3)',          // Glow effect
            pulseSpeed: 0.02,
            maxLineWidth: 2.5            // Increased from 2
        };
        
        this.init();
    }
    
    getParticleCount() {
        const width = window.innerWidth;
        if (width < 768) return 45;   // More particles with depth layers
        if (width < 1200) return 75;  // More particles with depth layers
        return 95;                     // More particles with depth layers
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
    }
    
    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        this.ctx.scale(dpr, dpr);
        this.width = rect.width;
        this.height = rect.height;
        
        // Recreate particles on resize
        if (this.particles.length > 0) {
            this.particles = [];
            this.createParticles();
        }
    }
    
    createParticles() {
        const newCount = this.getParticleCount();
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const clearRadius = Math.min(this.width, this.height) * 0.3; // Larger clear zone radius
        
        for (let i = 0; i < newCount; i++) {
            let x, y, distanceFromCenter;
            
            // Keep trying until we find a position outside the center zone
            do {
                x = Math.random() * this.width;
                y = Math.random() * this.height;
                distanceFromCenter = Math.hypot(x - centerX, y - centerY);
            } while (distanceFromCenter < clearRadius);
            
            // Assign depth layer: ~30% of particles in background
            const isBackground = Math.random() < 0.3;
            const depth = isBackground ? Math.random() * 0.4 + 0.3 : Math.random() * 0.3 + 0.7; // 0.3-0.7 (back) or 0.7-1.0 (front)
            
            this.particles.push(new Particle(
                x,
                y,
                this.config,
                this.width,
                this.height,
                depth,
                centerX,
                centerY,
                clearRadius
            ));
        }
        
        // Sort particles by depth (back to front) for proper rendering
        this.particles.sort((a, b) => a.depth - b.depth);
    }
    
    setupEventListeners() {
        // Mouse move tracking
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
            this.mouse.active = true;
        });
        
        // Mouse leave
        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.active = false;
            this.mouse.x = null;
            this.mouse.y = null;
        });
        
        // Touch support
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            this.mouse.x = touch.clientX - rect.left;
            this.mouse.y = touch.clientY - rect.top;
            this.mouse.active = true;
        });
        
        this.canvas.addEventListener('touchend', () => {
            this.mouse.active = false;
            this.mouse.x = null;
            this.mouse.y = null;
        });
        
        // Window resize with debounce
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.resize(), 250);
        });
    }
    
    animate(currentTime = 0) {
        // Calculate FPS
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        this.fps = deltaTime > 0 ? 1000 / deltaTime : 60;
        
        // Clear canvas completely (no trail effect)
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw connections first (behind particles)
        this.drawConnections();
        
        // Update and draw particles on top
        this.particles.forEach(particle => {
            if (this.mouse.active && this.mouse.x !== null) {
                particle.interact(this.mouse);
            }
            particle.update(this.width, this.height);
            particle.draw(this.ctx);
        });
        
        // Continue animation loop
        this.animationId = requestAnimationFrame((time) => this.animate(time));
    }
    
    drawConnections() {
        const connections = [];
        
        // Find all valid connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                
                // Only connect particles on similar depth layers (within 0.3 range)
                if (Math.abs(p1.depth - p2.depth) > 0.3) continue;
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Adjust connection distance based on depth (closer particles connect at greater distance)
                const depthFactor = (p1.depth + p2.depth) / 2;
                const adjustedDistance = this.config.connectionDistance * depthFactor;
                
                if (distance < adjustedDistance) {
                    connections.push({
                        p1: p1,
                        p2: p2,
                        distance: distance,
                        depth: depthFactor
                    });
                }
            }
        }
        
        // Draw connections with depth-based styling
        connections.forEach(conn => {
            const opacity = (1 - (conn.distance / (this.config.connectionDistance * conn.depth))) * conn.depth;
            const lineWidth = Math.max(0.5, opacity * this.config.maxLineWidth * conn.depth);
            
            // Check if connection is near mouse for enhanced effect
            let isNearMouse = false;
            if (this.mouse.active && this.mouse.x !== null) {
                const midX = (conn.p1.x + conn.p2.x) / 2;
                const midY = (conn.p1.y + conn.p2.y) / 2;
                const distToMouse = Math.hypot(midX - this.mouse.x, midY - this.mouse.y);
                isNearMouse = distToMouse < this.mouse.radius;
            }
            
            // Enhanced styling for connections near mouse
            if (isNearMouse) {
                // Draw glow effect
                this.ctx.strokeStyle = this.config.glowColor;
                this.ctx.lineWidth = lineWidth * 3;
                this.ctx.lineCap = 'round';
                this.ctx.beginPath();
                this.ctx.moveTo(conn.p1.x, conn.p1.y);
                this.ctx.lineTo(conn.p2.x, conn.p2.y);
                this.ctx.stroke();
                
                // Draw bright line on top
                const rgba = `rgba(220, 20, 60, ${opacity * 0.6})`;
                this.ctx.strokeStyle = rgba;
                this.ctx.lineWidth = lineWidth;
            } else {
                // Normal connection line - visibility based on depth
                const rgba = `rgba(220, 20, 60, ${opacity * 0.3})`;
                this.ctx.strokeStyle = rgba;
                this.ctx.lineWidth = lineWidth;
            }
            
            this.ctx.lineCap = 'round';
            this.ctx.beginPath();
            this.ctx.moveTo(conn.p1.x, conn.p1.y);
            this.ctx.lineTo(conn.p2.x, conn.p2.y);
            this.ctx.stroke();
        });
        
        return connections;
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.particles = [];
    }
}

class Particle {
    constructor(x, y, config, canvasWidth, canvasHeight, depth = 1, centerX = 0, centerY = 0, clearRadius = 0) {
        this.x = x;
        this.y = y;
        this.config = config;
        this.depth = depth; // 0.3-1.0 (back to front)
        this.centerX = centerX;
        this.centerY = centerY;
        this.clearRadius = clearRadius;
        
        // Random velocity adjusted by depth (background moves slower)
        const angle = Math.random() * Math.PI * 2;
        const speed = config.particleSpeed * (0.5 + Math.random() * 0.5) * depth;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        // Original velocity for returning to natural movement
        this.originalVx = this.vx;
        this.originalVy = this.vy;
        
        // Base position for gentle floating
        this.baseX = x;
        this.baseY = y;
        
        // Size with depth perspective (background particles are smaller)
        const sizeRange = config.particleMaxSize - config.particleMinSize;
        this.baseSize = config.particleMinSize + Math.random() * sizeRange;
        this.size = this.baseSize * depth;
        
        // Pulse animation
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = config.pulseSpeed * (0.8 + Math.random() * 0.4);
        
        // Energy level (affects visual appearance)
        this.energy = 0;
    }
    
    update(canvasWidth, canvasHeight) {
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        
        // Check if particle is entering the center clear zone
        const distanceFromCenter = Math.hypot(this.x - this.centerX, this.y - this.centerY);
        if (distanceFromCenter < this.clearRadius) {
            // Push particle away from center
            const angle = Math.atan2(this.y - this.centerY, this.x - this.centerX);
            const pushForce = (1 - distanceFromCenter / this.clearRadius) * 2;
            this.vx += Math.cos(angle) * pushForce;
            this.vy += Math.sin(angle) * pushForce;
            
            // Move particle to edge of clear zone if it's inside
            if (distanceFromCenter < this.clearRadius * 0.95) {
                this.x = this.centerX + Math.cos(angle) * this.clearRadius;
                this.y = this.centerY + Math.sin(angle) * this.clearRadius;
            }
        }
        
        // Bounce off edges with slight damping
        if (this.x <= 0 || this.x >= canvasWidth) {
            this.vx *= -0.95;
            this.x = Math.max(0, Math.min(canvasWidth, this.x));
        }
        if (this.y <= 0 || this.y >= canvasHeight) {
            this.vy *= -0.95;
            this.y = Math.max(0, Math.min(canvasHeight, this.y));
        }
        
        // Gentle pull toward base position (natural floating)
        const pullStrength = 0.002;
        const dxBase = this.baseX - this.x;
        const dyBase = this.baseY - this.y;
        this.vx += dxBase * pullStrength;
        this.vy += dyBase * pullStrength;
        
        // Gradually return to original velocity
        this.vx += (this.originalVx - this.vx) * 0.01;
        this.vy += (this.originalVy - this.vy) * 0.01;
        
        // Apply friction
        this.vx *= 0.99;
        this.vy *= 0.99;
        
        // Update pulse animation
        this.pulsePhase += this.pulseSpeed;
        
        // Decay energy over time
        this.energy *= 0.95;
    }
    
    interact(mouse) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Interaction strength reduced for background particles
        const interactionStrength = this.depth;
        
        if (distance < this.config.mouseRepelRadius) {
            // Repel from mouse
            const force = (1 - distance / this.config.mouseRepelRadius) * this.config.mouseRepelForce * interactionStrength;
            this.vx += (dx / distance) * force;
            this.vy += (dy / distance) * force;
            
            // Increase energy
            this.energy = Math.min(1, this.energy + 0.1 * interactionStrength);
        } else if (distance < this.config.mouseRepelRadius * 1.5) {
            // Subtle attraction at medium distance
            const attractForce = ((distance - this.config.mouseRepelRadius) / (this.config.mouseRepelRadius * 0.5)) * 0.1 * interactionStrength;
            this.vx -= (dx / distance) * attractForce;
            this.vy -= (dy / distance) * attractForce;
        }
    }
    
    draw(ctx) {
        // Calculate distance from center
        const distanceFromCenter = Math.hypot(this.x - this.centerX, this.y - this.centerY);
        
        // Don't draw if inside clear zone
        if (distanceFromCenter < this.clearRadius) return;
        
        // Pulsing size
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 1;
        const currentSize = this.size * pulse * (1 + this.energy * 0.5);
        
        // Opacity based on depth (background is dimmer)
        const baseOpacity = 0.3 + (this.depth * 0.7); // 0.3-1.0 opacity range
        
        // Enhanced glow for high energy particles
        if (this.energy > 0.3) {
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, currentSize * 4
            );
            gradient.addColorStop(0, `rgba(220, 20, 60, ${this.energy * 0.4 * baseOpacity})`);
            gradient.addColorStop(0.5, `rgba(220, 20, 60, ${this.energy * 0.2 * baseOpacity})`);
            gradient.addColorStop(1, 'rgba(220, 20, 60, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, currentSize * 4, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Main particle with gradient - dimmer for background
        const particleGradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, currentSize
        );
        particleGradient.addColorStop(0, `rgba(255, 86, 112, ${(0.9 + this.energy * 0.1) * baseOpacity})`);
        particleGradient.addColorStop(0.7, `rgba(220, 20, 60, ${(0.8 + this.energy * 0.2) * baseOpacity})`);
        particleGradient.addColorStop(1, `rgba(184, 16, 47, ${(0.6 + this.energy * 0.4) * baseOpacity})`);
        
        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner highlight - less visible on background particles
        ctx.fillStyle = `rgba(255, 255, 255, ${(0.3 + this.energy * 0.3) * baseOpacity})`;
        ctx.beginPath();
        ctx.arc(this.x - currentSize * 0.3, this.y - currentSize * 0.3, currentSize * 0.3, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const neuralNetwork = new NeuralNetwork('neural-canvas');
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (neuralNetwork) {
            neuralNetwork.destroy();
        }
    });
});
