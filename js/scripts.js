/**
 * Main Scripts - Portfolio Website
 * Consolidated and optimized
 */

// ============================================
// Navbar Scroll Effect
// ============================================
window.addEventListener('DOMContentLoaded', () => {
    const navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) return;
        
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    // Initial shrink check
    navbarShrink();

    // Shrink navbar on scroll
    document.addEventListener('scroll', navbarShrink);
});

// ============================================
// Tooltip Functionality
// ============================================
function initTooltip() {
    const tooltips = Array.from(document.querySelectorAll('[data-tooltip-container]'));

    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseover', handleMouseOver);
    });

    function handleMouseOver() {
        const tooltipbox = createTooltipBox(this);

        handleMouseMove.tooltipbox = tooltipbox;
        this.addEventListener('mousemove', handleMouseMove);

        handleMouseLeave.tooltipbox = tooltipbox;
        handleMouseLeave.element = this;
        this.addEventListener('mouseleave', handleMouseLeave);
    }

    const handleMouseLeave = {
        handleEvent() {
            this.tooltipbox.remove();
            this.element.removeEventListener('mousemove', handleMouseMove);
            this.element.removeEventListener('mouseleave', handleMouseLeave);
        }
    };

    const handleMouseMove = {
        handleEvent(e) {
            this.tooltipbox.style.top = e.pageY + 25 + 'px';
            this.tooltipbox.style.left = e.pageX + 13 + 'px';
        }
    };

    function createTooltipBox(el) {
        let tooltip = document.createElement('div');
        tooltip.innerText = el.getAttribute('data-tooltip-label');
        tooltip.classList.add('tooltipCard');
        document.body.appendChild(tooltip);
        return tooltip;
    }
}

// Initialize tooltips when DOM is ready
document.addEventListener('DOMContentLoaded', initTooltip);

// ============================================
// Bootstrap Tab Functionality
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Handle tab clicks
    const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all tabs and panes
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active', 'show');
            });
            
            // Add active class to clicked tab
            button.classList.add('active');
            
            // Show corresponding pane
            const targetId = button.getAttribute('data-bs-target');
            const targetPane = document.querySelector(targetId);
            if (targetPane) {
                targetPane.classList.add('active', 'show');
            }
        });
    });
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or a data-bs attribute
            if (href === '#' || href === '#page-top' || this.hasAttribute('data-bs-toggle')) {
                if (href === '#page-top') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 72; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ============================================
// Navbar Toggle for Mobile
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (!navbarToggler || !navbarCollapse) return;
    
    // Main toggle function
    function toggleNavbar() {
        const isOpen = navbarCollapse.classList.contains('show');
        
        if (isOpen) {
            // Close menu
            navbarCollapse.classList.remove('show');
            navbarToggler.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        } else {
            // Open menu
            navbarCollapse.classList.add('show');
            navbarToggler.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Click on toggler button - use mousedown for immediate response
    navbarToggler.addEventListener('mousedown', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
    
    navbarToggler.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleNavbar();
    });
    
    // Touch events for mobile
    navbarToggler.addEventListener('touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
    
    navbarToggler.addEventListener('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleNavbar();
    });
    
    // Click on nav links to close
    const navLinks = navbarCollapse.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                toggleNavbar();
            }
        });
    });
    
    // Click outside to close
    document.addEventListener('click', (e) => {
        if (navbarCollapse.classList.contains('show')) {
            const isClickInsideNav = navbarCollapse.contains(e.target) || navbarToggler.contains(e.target);
            if (!isClickInsideNav) {
                toggleNavbar();
            }
        }
    });
    
    // Prevent canvas interference with mobile scroll
    const canvas = document.getElementById('neural-canvas');
    function updateCanvasPointer() {
        if (canvas) {
            canvas.style.pointerEvents = window.innerWidth >= 992 ? 'auto' : 'none';
        }
    }
    updateCanvasPointer();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        updateCanvasPointer();
        
        if (window.innerWidth >= 992 && navbarCollapse.classList.contains('show')) {
            toggleNavbar();
        }
    });
});

// ============================================
// Portfolio Data Loading and Rendering
// ============================================
async function loadProjects() {
    try {
        const response = await fetch('/assets/data/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Clear existing content
        document.getElementById('web-scraping-projects').innerHTML = '';
        document.getElementById('agentic-ai-projects').innerHTML = '';
        document.getElementById('web-development-projects').innerHTML = '';
        
        // Group projects by type
        const projectsByType = {
            'Web Scraping': [],
            'Agentic AI': [],
            'Web Development': []
        };
        
        data.projects.forEach(project => {
            if (projectsByType[project.projectType]) {
                projectsByType[project.projectType].push(project);
            }
        });
        
        // Render projects for each category
        for (const [type, projects] of Object.entries(projectsByType)) {
            const containerId = `${type.toLowerCase().replace(' ', '-')}-projects`;
            const container = document.getElementById(containerId);
            
            if (container && projects.length > 0) {
                projects.forEach(project => {
                    const projectElement = createProjectElement(project);
                    container.appendChild(projectElement);
                });
            } else if (container && projects.length === 0) {
                container.innerHTML = `
                    <div class="col-12">
                        <p class="lead text-center">${type} projects will be added soon.</p>
                    </div>
                `;
            }
        }
        
        // Re-attach event listeners to new portfolio items
        attachPortfolioEventListeners();
        
    } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback: Show error messages in each tab
        document.getElementById('web-scraping-projects').innerHTML = `
            <div class="col-12">
                <p class="lead text-center">Error loading projects. Please check the console for details.</p>
            </div>
        `;
        document.getElementById('agentic-ai-projects').innerHTML = `
            <div class="col-12">
                <p class="lead text-center">Error loading projects. Please check the console for details.</p>
            </div>
        `;
        document.getElementById('web-development-projects').innerHTML = `
            <div class="col-12">
                <p class="lead text-center">Error loading projects. Please check the console for details.</p>
            </div>
        `;
    }
}

function createProjectElement(project) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-3 mb-5';
    
    col.innerHTML = `
        <div class="portfolio-item mx-auto" data-project-id="${project.id}">
            <img class="img-fluid" src="${project.imagePath}" alt="${project.title}" />
            <div class="portfolio-item-caption d-flex align-items-end justify-content-center h-100 w-100">
                <div class="portfolio-item-caption-content text-center text-white">
                    <p class="p-title">${project.title}</p>
                    <p class="p-desc">${project.shortDescription}</p>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// ============================================
// Portfolio Modal Functionality
// ============================================
let projectsData = [];

async function attachPortfolioEventListeners() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Load project data if not already loaded
    if (projectsData.length === 0) {
        try {
            const response = await fetch('/assets/data/projects.json');
            if (response.ok) {
                const data = await response.json();
                projectsData = data.projects;
            }
        } catch (error) {
            console.error('Error loading project data for modals:', error);
        }
    }
    
    portfolioItems.forEach(item => {
        // Remove existing event listeners to prevent duplicates
        item.replaceWith(item.cloneNode(true));
    });
    
    // Re-select after cloning
    const freshPortfolioItems = document.querySelectorAll('.portfolio-item');
    
    freshPortfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectId = parseInt(item.getAttribute('data-project-id'));
            const project = projectsData.find(p => p.id === projectId);
            
            if (project) {
                openProjectModal(project);
            } else {
                // Fallback to basic modal if project data not found
                const title = item.querySelector('.p-title')?.textContent || 'Project';
                const description = item.querySelector('.p-desc')?.textContent || 'Project description';
                const imgSrc = item.querySelector('img')?.src || '';
                openBasicModal(title, description, imgSrc);
            }
        });
    });
    
    // Close modal functionality
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal') || 
            e.target.classList.contains('modal-close') ||
            e.target.closest('.modal-close')) {
            closePortfolioModal();
        }
    });
}

function openProjectModal(project) {
    // Create or get modal
    let modal = document.getElementById('portfolioModal');
    if (!modal) {
        modal = createEnhancedPortfolioModal();
        document.body.appendChild(modal);
    }
    
    // Update modal content with project details
    modal.querySelector('.modal-title').textContent = project.title;
    
    const modalBody = modal.querySelector('.modal-body');
    modalBody.innerHTML = `
        <div class="project-modal-content">
            <!-- Project Image - Clean and centered -->
            <div class="project-image-container text-center mb-5">
                <img class="img-fluid" src="${project.imagePath}" alt="${project.title}" />
            </div>
            
            <!-- Project Details - Clean minimal layout -->
            <div class="project-details">
                <!-- Short Description -->
                <div class="project-section mb-5">
                    <h4 class="text-primary">Overview</h4>
                    <p class="project-description">${project.shortDescription}</p>
                </div>
                
                <!-- Tools & Stack -->
                <div class="project-section mb-5">
                    <h5 class="text-secondary">Technology Stack</h5>
                    <div class="tech-stack">
                        ${project.toolsStack.map(tool => `<span class="tech-badge">${tool}</span>`).join('')}
                    </div>
                </div>
                
                <!-- Key Features -->
                <div class="project-section mb-5">
                    <h5 class="text-secondary">Features</h5>
                    <ul class="features-list">
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <!-- Business Benefits -->
                <div class="project-section">
                    <h5 class="text-secondary">Business Value</h5>
                    <ul class="benefits-list">
                        ${project.businessBenefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    // Show modal
    modal.classList.add('show');
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
    
    // Add backdrop
    let backdrop = document.querySelector('.modal-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';
        document.body.appendChild(backdrop);
    }
}

function openBasicModal(title, description, imgSrc) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('portfolioModal');
    if (!modal) {
        modal = createPortfolioModal();
        document.body.appendChild(modal);
    }
    
    // Update modal content
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-body p').textContent = description;
    modal.querySelector('.modal-body img').src = imgSrc;
    
    // Show modal
    modal.classList.add('show');
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
    
    // Add backdrop
    let backdrop = document.querySelector('.modal-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';
        document.body.appendChild(backdrop);
    }
}

function createPortfolioModal() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'portfolioModal';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Project Title</h5>
                    <button type="button" class="modal-close" aria-label="Close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <img class="img-fluid mb-3" src="" alt="Project Image" />
                    <p>Project description</p>
                </div>
            </div>
        </div>
    `;
    return modal;
}

function createEnhancedPortfolioModal() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'portfolioModal';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Project Title</h5>
                    <button type="button" class="modal-close" aria-label="Close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- Content will be dynamically populated -->
                </div>
            </div>
        </div>
    `;
    return modal;
}

function closePortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    const backdrop = document.querySelector('.modal-backdrop');
    
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
    
    if (backdrop) {
        backdrop.remove();
    }
}

// ============================================
// Performance Monitoring (Development)
// ============================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', () => {
        if (window.performance) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page load time: ${pageLoadTime}ms`);
        }
    });
}

// ============================================
// Initialize Portfolio on DOM Ready
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Load and render projects from JSON
    loadProjects();
    
    // Load and render company slideshow
    loadCompanies();
});

// ============================================
// Company Slideshow Functionality
// ============================================
async function loadCompanies() {
    try {
        const response = await fetch('/assets/data/companies.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const companies = await response.json();
        
        const companyTrack = document.getElementById('company-track');
        if (!companyTrack) return;
        
        // Clear existing content
        companyTrack.innerHTML = '';
        
        // Create company items with overlay similar to portfolio
        const createCompanyItems = () => {
            return companies.map(company => `
                <div class="company-item">
                    <img class="company-logo" src="${company.logo}" alt="${company.name}" />
                    <div class="company-overlay">
                        <div class="company-overlay-content">
                            <p class="company-overlay-name">${company.name}</p>
                            <p class="company-overlay-industry">(${company.industry})</p>
                        </div>
                    </div>
                </div>
            `).join('');
        };
        
        // Duplicate companies for seamless infinite scroll
        companyTrack.innerHTML = createCompanyItems() + createCompanyItems();
        
        // Initialize drag functionality
        initCompanyDrag(companyTrack);
        
    } catch (error) {
        console.error('Error loading companies:', error);
        const companyTrack = document.getElementById('company-track');
        if (companyTrack) {
            companyTrack.innerHTML = `
                <div style="color: var(--color-text-muted); text-align: center; width: 100%; padding: 2rem;">
                    Companies will be displayed here
                </div>
            `;
        }
    }
}

// ============================================
// Company Slideshow Drag Functionality
// ============================================
function initCompanyDrag(track) {
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = null;
    let velocity = 0;
    let lastX = 0;
    let lastTime = 0;
    let momentumID = null;
    
    // Get the width of half the track (one set of companies)
    const getHalfTrackWidth = () => track.offsetWidth / 2;
    
    // Get current transform value
    function getTranslateX() {
        const style = window.getComputedStyle(track);
        const matrix = style.transform || style.webkitTransform;
        
        if (matrix === 'none' || !matrix) {
            return 0;
        }
        
        const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
        return parseFloat(matrixValues[4]) || 0;
    }
    
    // Wrap position to create infinite loop effect
    function wrapPosition(translate) {
        const halfWidth = getHalfTrackWidth();
        
        // If we've scrolled past the first set, wrap to the second set
        if (translate > 0) {
            return translate - halfWidth;
        }
        // If we've scrolled past the second set, wrap to the first set
        else if (translate < -halfWidth) {
            return translate + halfWidth;
        }
        
        return translate;
    }
    
    // Set position with smooth transition
    function setSliderPosition() {
        track.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    // Animation loop while dragging
    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }
    
    // Momentum scrolling with deceleration
    function applyMomentum() {
        if (Math.abs(velocity) > 0.1) {
            currentTranslate += velocity;
            velocity *= 0.95; // Deceleration factor (friction)
            
            // Wrap position for infinite loop
            currentTranslate = wrapPosition(currentTranslate);
            
            setSliderPosition();
            momentumID = requestAnimationFrame(applyMomentum);
        } else {
            // Momentum stopped, resume infinite scroll animation
            resumeAnimation();
        }
    }
    
    // Resume animation from current position
    function resumeAnimation() {
        cancelAnimationFrame(momentumID);
        
        // Normalize position within the loop
        currentTranslate = wrapPosition(currentTranslate);
        
        // Calculate the offset as percentage of animation
        const trackWidth = getHalfTrackWidth();
        const normalizedTranslate = ((currentTranslate % trackWidth) + trackWidth) % trackWidth;
        
        // Resume animation from current position by adjusting animation delay
        const animationDuration = 30; // seconds (matching CSS)
        const progress = (trackWidth - normalizedTranslate) / trackWidth;
        const delay = -(progress * animationDuration);
        
        // Re-enable animation from the current position
        track.style.animation = `scroll ${animationDuration}s linear infinite`;
        track.style.animationDelay = `${delay}s`;
        track.style.transform = '';
        
        // Re-enable pointer events
        setTimeout(() => {
            track.style.pointerEvents = '';
        }, 50);
    }
    
    // Start drag
    function dragStart(e) {
        // Cancel any ongoing momentum
        cancelAnimationFrame(momentumID);
        
        isDragging = true;
        track.classList.add('dragging');
        
        // Get current position from computed style (including animation state)
        prevTranslate = getTranslateX();
        currentTranslate = prevTranslate;
        
        // Pause the animation and lock current position
        track.style.animation = 'none';
        
        // Get start position
        const clientX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        startX = clientX;
        lastX = clientX;
        lastTime = Date.now();
        velocity = 0;
        
        animationID = requestAnimationFrame(animation);
        
        // Disable hover effects during drag
        track.style.pointerEvents = 'none';
    }
    
    // During drag
    function drag(e) {
        if (!isDragging) return;
        
        const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        const currentTime = Date.now();
        
        // Calculate movement
        const movedBy = currentPosition - startX;
        currentTranslate = prevTranslate + movedBy;
        
        // Wrap position during drag for seamless loop
        currentTranslate = wrapPosition(currentTranslate);
        
        // Update references for continuous drag
        if (currentTranslate !== prevTranslate + movedBy) {
            prevTranslate = currentTranslate;
            startX = currentPosition;
        }
        
        // Calculate velocity for momentum (pixels per millisecond)
        const timeDelta = currentTime - lastTime;
        if (timeDelta > 0) {
            const distance = currentPosition - lastX;
            velocity = distance / timeDelta * 16; // Convert to ~60fps frame rate
        }
        
        lastX = currentPosition;
        lastTime = currentTime;
    }
    
    // End drag
    function dragEnd() {
        if (!isDragging) return;
        
        isDragging = false;
        track.classList.remove('dragging');
        cancelAnimationFrame(animationID);
        
        // Ensure position is wrapped before momentum
        currentTranslate = wrapPosition(currentTranslate);
        
        // Check if there's significant velocity for momentum scrolling
        if (Math.abs(velocity) > 0.5) {
            // Apply momentum with deceleration
            applyMomentum();
        } else {
            // No significant velocity, just resume animation
            resumeAnimation();
        }
    }
    
    // Mouse events
    track.addEventListener('mousedown', dragStart);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', dragEnd);
    
    // Touch events
    track.addEventListener('touchstart', dragStart, { passive: true });
    window.addEventListener('touchmove', drag, { passive: true });
    window.addEventListener('touchend', dragEnd, { passive: true });
    
    // Prevent context menu on long press
    track.addEventListener('contextmenu', (e) => {
        if (isDragging) {
            e.preventDefault();
        }
    });
    
    // Prevent click when dragging/throwing
    track.addEventListener('click', (e) => {
        if (Math.abs(currentTranslate - prevTranslate) > 5) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);
}