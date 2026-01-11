// Enhanced Blog Slider with Touch Support
const blogs = document.querySelectorAll('.blog-container'); 
blogs.forEach(initBlog); 

function initBlog(blog) {
    const blog_track = blog.querySelector('.blog-track'); 
    const items = blog_track.querySelectorAll('.blog-post'); 
    
    if (items.length === 0) return;

    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;

    // Calculate item width dynamically
    function getItemWidth() {
        const itemStyle = window.getComputedStyle(items[0]);
        const itemWidth = items[0].offsetWidth;
        const marginRight = parseFloat(itemStyle.marginRight) || 0;
        const marginLeft = parseFloat(itemStyle.marginLeft) || 0;
        return itemWidth + marginRight + marginLeft;
    }

    function updateSlider(smooth = true) {
        const itemWidth = getItemWidth();
        const trackCenter = blog.offsetWidth / 2;
        const itemCenter = items[currentIndex].offsetWidth / 2;
        const position = (itemWidth * currentIndex) - (trackCenter - itemCenter);
        
        blog_track.style.transition = smooth ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
        blog_track.style.transform = `translateX(-${position}px)`;

        // Update active state
        items.forEach((item, index) => {
            item.classList.remove('active');
            if (index === currentIndex) {
                item.classList.add('active');
            }
        });

        // Update button states
        if (prevButton && nextButton) {
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === items.length - 1;
            
            prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
            nextButton.style.opacity = currentIndex === items.length - 1 ? '0.5' : '1';
        }
    }

    // Button Navigation
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentIndex < items.length - 1) {
                currentIndex++;
                updateSlider();
            }
        });
    }

    // Touch/Mouse Drag Support
    function touchStart(index) {
        return function(event) {
            currentIndex = index;
            startPos = getPositionX(event);
            isDragging = true;
            animationID = requestAnimationFrame(animation);
            blog_track.style.cursor = 'grabbing';
        }
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        blog_track.style.cursor = 'grab';

        const movedBy = currentTranslate - prevTranslate;

        // Swipe threshold
        if (movedBy < -100 && currentIndex < items.length - 1) {
            currentIndex += 1;
        }

        if (movedBy > 100 && currentIndex > 0) {
            currentIndex -= 1;
        }

        updateSlider();
        prevTranslate = currentTranslate;
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        if (isDragging) {
            blog_track.style.transition = 'none';
            blog_track.style.transform = `translateX(${currentTranslate}px)`;
            requestAnimationFrame(animation);
        }
    }

    // Add event listeners to each item
    items.forEach((item, index) => {
        const image = item.querySelector('img');
        if (image) {
            image.addEventListener('dragstart', (e) => e.preventDefault());
        }

        // Touch events
        item.addEventListener('touchstart', touchStart(index));
        item.addEventListener('touchmove', touchMove);
        item.addEventListener('touchend', touchEnd);

        // Mouse events
        item.addEventListener('mousedown', touchStart(index));
        item.addEventListener('mousemove', touchMove);
        item.addEventListener('mouseup', touchEnd);
        item.addEventListener('mouseleave', () => {
            if (isDragging) touchEnd();
        });

        // Click to navigate (if not dragging)
        item.addEventListener('click', (e) => {
            if (Math.abs(currentTranslate - prevTranslate) < 10) {
                // Navigate to blog post
                const link = item.querySelector('a');
                if (link && !e.defaultPrevented) {
                    window.location.href = link.href;
                }
            }
        });
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updateSlider();
        } else if (e.key === 'ArrowRight' && currentIndex < items.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    // Auto-scroll on hover (optional)
    let autoScrollInterval;
    
    blog.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

    blog.addEventListener('mouseleave', () => {
        // Optional: Add auto-scroll here if desired
    });

    // Resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSlider(false);
        }, 200);
    });

    // Intersection Observer for lazy loading
    const blogObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(0.9)';
                    }, index * 100);
                });
                blogObserver.unobserve(blog);
            }
        });
    }, { threshold: 0.1 });

    blogObserver.observe(blog);

    // Set initial styles
    items.forEach(item => {
        item.style.opacity = '0.7';
        item.style.transition = 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    // Initialize
    setTimeout(() => updateSlider(), 100);
}

// Smooth scroll for blog navigation
document.querySelectorAll('.blog-post a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Add loading animation
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        loader.innerHTML = '<div style="width: 50px; height: 50px; border: 3px solid #fff; border-top: 3px solid #4cb9e7; border-radius: 50%; animation: spin 1s linear infinite;"></div>';
        
        document.body.appendChild(loader);
        setTimeout(() => loader.style.opacity = '1', 10);
    });
});

// Add spin animation
const loaderStyle = document.createElement('style');
loaderStyle.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loaderStyle);

// Blog post hover effect enhancement
document.querySelectorAll('.blog-post').forEach(post => {
    post.addEventListener('mouseenter', function() {
        if (window.innerWidth > 768) {
            this.style.zIndex = '10';
        }
    });

    post.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Add ripple effect on click
document.querySelectorAll('.blog-post').forEach(post => {
    post.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

console.log('✨ Enhanced blog slider initialized with touch support!');