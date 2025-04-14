document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const slideNumber = document.getElementById('slide-number');
    const fullscreenBtn = document.getElementById('fullscreen');
    const printBtn = document.getElementById('print');
    const cursorControlBtn = document.getElementById('cursor-control');
    const controls = document.querySelector('.controls');
    

    const bottomHoverArea = document.createElement('div');
    bottomHoverArea.className = 'bottom-hover-area';
    document.body.appendChild(bottomHoverArea);

    document.body.insertBefore(bottomHoverArea, controls);
    
    let currentSlide = 0;
    let isAnimating = false;
    
    let isCursorHidden = false;
    let isCursorLocked = false;

    function applyIntroAnimations() {
        if (currentSlide === 0) {
            const introElements = document.querySelectorAll('.intro-animation');
            introElements.forEach((element, index) => {
                element.style.animationDelay = `${0.3 * (index + 1)}s`;
                element.style.animationDuration = '1s';
                element.style.opacity = '0';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                }, 100);
            });
        }
    }
    

    function prepareSlideElementsForAnimation(slide) {
        if (!slide) return;

        const elements = slide.querySelectorAll('h1, h2, h3, p, li, .definition-box, .image-container, .two-col > div');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        });
    }
    
    
    function animateSlideElements(slide) {
        if (!slide) return;

        const elements = slide.querySelectorAll('h1, h2, h3, p, li, .definition-box, .image-container, .two-col > div');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100 + index * 100);
        });
    }
    
    
    function updateSlideNumber() {
        slideNumber.textContent = `${currentSlide + 1} / ${slides.length}`;
    }
    
   
    function showSlide() {
        if (isAnimating) return;
        isAnimating = true;

        const currentSlideElement = slides[currentSlide];
        const nextSlideElement = slides[currentSlide + 1];
        const prevSlideElement = slides[currentSlide - 1];

        
        prepareSlideElementsForAnimation(currentSlideElement);

       
        if (nextSlideElement) {
            nextSlideElement.style.display = 'flex';
            nextSlideElement.classList.add('slide-right-in');
            currentSlideElement.classList.add('slide-right-out');
        } else if (prevSlideElement) {
            prevSlideElement.style.display = 'flex';
            prevSlideElement.classList.add('slide-left-in');
            currentSlideElement.classList.add('slide-left-out');
        }

       
        setTimeout(() => {
            slides.forEach((slide, index) => {
                if (index === currentSlide) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active', 'slide-right-in', 'slide-left-in', 'slide-right-out', 'slide-left-out');
                    slide.style.display = 'none';
                }
            });

           
            animateSlideElements(currentSlideElement);
            isAnimating = false;
        }, 1200); 
    }
    
    
    function nextSlide() {
        if (currentSlide < slides.length - 1 && !isAnimating) {
            isAnimating = true;
            
           
            slides.forEach((slide, index) => {
                if (index !== currentSlide && index !== currentSlide + 1) {
                    slide.style.display = 'none';
                }
            });
            
           
            prepareSlideElementsForAnimation(slides[currentSlide + 1]);
            
            
            slides[currentSlide].classList.add('slide-right-out');
            slides[currentSlide + 1].style.display = 'flex';
            slides[currentSlide + 1].classList.add('active', 'slide-right-in');
            
            
            animateSlideElements(slides[currentSlide + 1]);
            
            
            setTimeout(() => {
                slides[currentSlide].classList.remove('active', 'slide-right-out');
                slides[currentSlide].style.display = 'none';
                currentSlide++;
                updateSlideNumber();
                updateProgressIndicator();
                isAnimating = false;
            }, 500);
        }
    }
    
    
    function prevSlide() {
        if (currentSlide > 0 && !isAnimating) {
            isAnimating = true;
            
            
            slides.forEach((slide, index) => {
                if (index !== currentSlide && index !== currentSlide - 1) {
                    slide.style.display = 'none';
                }
            });
            
           
            if (currentSlide - 1 === 0) {
                
            } else {
                prepareSlideElementsForAnimation(slides[currentSlide - 1]);
            }
            
            
            slides[currentSlide].classList.add('slide-left-out');
            slides[currentSlide - 1].style.display = 'flex';
            slides[currentSlide - 1].classList.add('active', 'slide-left-in');
            
            
            if (currentSlide - 1 === 0) {
                applyIntroAnimations();
            } else {
                animateSlideElements(slides[currentSlide - 1]);
            }
            
            
            setTimeout(() => {
                slides[currentSlide].classList.remove('active', 'slide-left-out');
                slides[currentSlide].style.display = 'none';
                currentSlide--;
                updateSlideNumber();
                updateProgressIndicator();
                isAnimating = false;
            }, 500);
        }
    }
    
    
    function goToSlide(index) {
        if (index >= 0 && index < slides.length && !isAnimating && index !== currentSlide) {
            isAnimating = true;
            
            
            const goingRight = index > currentSlide;
            
           
            slides.forEach((slide, i) => {
                if (i !== currentSlide && i !== index) {
                    slide.style.display = 'none';
                }
            });
            
           
            if (index === 0) {
                
            } else {
                prepareSlideElementsForAnimation(slides[index]);
            }
            
            
            if (goingRight) {
                slides[currentSlide].classList.add('slide-left-out');
                slides[index].style.display = 'flex';
                slides[index].classList.add('active', 'slide-right-in');
            } else {
                slides[currentSlide].classList.add('slide-right-out');
                slides[index].style.display = 'flex';
                slides[index].classList.add('active', 'slide-left-in');
            }
            
            
            if (index === 0) {
                applyIntroAnimations();
            } else {
                animateSlideElements(slides[index]);
            }
            
           
            setTimeout(() => {
                slides[currentSlide].classList.remove('active', goingRight ? 'slide-left-out' : 'slide-right-out');
                slides[currentSlide].style.display = 'none';
                currentSlide = index;
                updateSlideNumber();
                updateProgressIndicator();
                isAnimating = false;
            }, 500);
        }
    }
    
  
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) { 
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) { 
                document.documentElement.msRequestFullscreen();
            }
            fullscreenBtn.textContent = 'Exit Fullscreen';
        } else {
            
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { 
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { 
                document.msExitFullscreen();
            }
            fullscreenBtn.textContent = 'Fullscreen';
        }
    }
    
    
    let autoSlideInterval = null;
    
    function startAutoSlide(interval = 8000) {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            if (currentSlide < slides.length - 1) {
                nextSlide();
            } else {
                
                goToSlide(0);
            }
        }, interval);
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    
    function toggleAutoSlide() {
        if (autoSlideInterval) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    }
    
    
    function createPrintableVersion() {
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Computer Types Presentation</title>');
        printWindow.document.write('<style>');
        printWindow.document.write(`
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; }
            .slide { page-break-after: always; padding: 20px; margin-bottom: 30px; border: 1px solid #ddd; border-radius: 8px; }
            h1 { color: #003366; font-size: 24pt; margin-bottom: 15px; }
            h2, h3 { color: #004c99; }
            img { max-width: 80%; height: auto; display: block; margin: 15px auto; border: 2px solid #ddd; }
            table { border-collapse: collapse; width: 100%; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
            th { background-color: #003366; color: white; }
            .definition-box { border-left: 5px solid #003366; padding: 15px; margin: 15px 0; background-color: #f5f5f5; }
            .two-col { display: flex; flex-wrap: wrap; }
            .two-col > div { width: 45%; margin: 10px; }
            .timeline { margin: 20px 0; }
            .timeline-item { margin-bottom: 15px; padding-left: 20px; border-left: 3px solid #003366; }
            .timeline-date { font-weight: bold; color: #003366; }
            .team-members { text-align: center; margin-top: 20px; color: #555; }
            .caption { text-align: center; font-style: italic; color: #666; }
            @media print {
                .slide { page-break-after: always; clear: both; }
                body { font-size: 12pt; }
            }
        `);
        printWindow.document.write('</style></head><body>');
        
        
        printWindow.document.write(`
            <div style="text-align: center; padding: 50px; margin-bottom: 50px;">
                <h1 style="font-size: 36pt; color: #003366; margin-bottom: 30px;">Computer Types</h1>
                <h2 style="font-size: 24pt; color: #004c99; margin-bottom: 50px;">Supercomputers, Mainframes, Minicomputers, and Microcomputers</h2>
                <p style="font-size: 14pt; margin-top: 50px;">Presented by: Team Member 1, Team Member 2, Team Member 3, Team Member 4</p>
                <p style="font-size: 12pt; margin-top: 100px; color: #666;">Generated from HTML presentation</p>
            </div>
        `);
        
        
        slides.forEach((slide, index) => {
           
            if (index === 0) return;
            
            const clonedSlide = slide.cloneNode(true);
            clonedSlide.classList.remove('active', 'slide-left-in', 'slide-right-in', 'slide-left-out', 'slide-right-out');
            clonedSlide.classList.add('slide');
            clonedSlide.style.display = 'block';
            printWindow.document.body.appendChild(clonedSlide);
        });
        
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        
        
        printWindow.onload = function() {
            printWindow.focus();
            printWindow.print();
        };
    }
    
    
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
    });
    
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    
   
    printBtn.addEventListener('click', createPrintableVersion);
    
   
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            stopAutoSlide();
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            stopAutoSlide();
            prevSlide();
        } else if (e.key === 'f') {
            toggleFullscreen();
        } else if (e.key >= '1' && e.key <= '9') {
          
            stopAutoSlide();
            const slideIndex = parseInt(e.key) - 1;
            if (slideIndex < slides.length) {
                goToSlide(slideIndex);
            }
        } else if (e.key === 'a') {
          
            toggleAutoSlide();
        } else if (e.key === 'p') {
          
            createPrintableVersion();
        }
    });
    
   
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        
        stopAutoSlide();
    }, false);
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
           
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
          
            prevSlide();
        }
    }
    
   
    function createProgressIndicator() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            dot.setAttribute('title', `Slide ${i+1}`);
            if (i === 0) dot.classList.add('active');
            
           
            dot.addEventListener('click', () => {
                stopAutoSlide();
                goToSlide(i);
            });
            
            progressContainer.appendChild(dot);
        }
        
        document.body.appendChild(progressContainer);
        return progressContainer;
    }
    
  
    function updateProgressIndicator() {
        const dots = document.querySelectorAll('.progress-dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    
    const progressIndicator = createProgressIndicator();
    
   
    const slideObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class' && 
                mutation.target.classList.contains('active')) {
                updateProgressIndicator();
            }
        });
    });
    
    
    slides.forEach(slide => {
        slideObserver.observe(slide, { attributes: true });
    });
    
    
    if (slides.length > 0) {
        prepareSlideElementsForAnimation(slides[0]);
        applyIntroAnimations();
        updateSlideNumber();
    }

   
    let scrollStep = 100; 
    let fastScrollStep = 300;

    function handleKeyboardScroll(e) {
        const currentSlideElement = slides[currentSlide];
        if (!currentSlideElement) return;

       
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (e.ctrlKey || e.shiftKey) {
                    currentSlideElement.scrollBy({ top: fastScrollStep, behavior: 'smooth' });
                } else {
                    currentSlideElement.scrollBy({ top: scrollStep, behavior: 'smooth' });
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (e.ctrlKey || e.shiftKey) {
                    currentSlideElement.scrollBy({ top: -fastScrollStep, behavior: 'smooth' });
                } else {
                    currentSlideElement.scrollBy({ top: -scrollStep, behavior: 'smooth' });
                }
                break;
            case 'PageDown':
                e.preventDefault();
                currentSlideElement.scrollBy({ 
                    top: currentSlideElement.clientHeight * 0.9, 
                    behavior: 'smooth' 
                });
                break;
            case 'PageUp':
                e.preventDefault();
                currentSlideElement.scrollBy({ 
                    top: -currentSlideElement.clientHeight * 0.9, 
                    behavior: 'smooth' 
                });
                break;
            case 'Home':
                e.preventDefault();
                currentSlideElement.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'End':
                e.preventDefault();
                currentSlideElement.scrollTo({ 
                    top: currentSlideElement.scrollHeight, 
                    behavior: 'smooth' 
                });
                break;
            case ' ':
               
                if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
                    e.preventDefault();
                    if (e.shiftKey) {
                        currentSlideElement.scrollBy({ 
                            top: -currentSlideElement.clientHeight * 0.75, 
                            behavior: 'smooth' 
                        });
                    } else {
                        currentSlideElement.scrollBy({ 
                            top: currentSlideElement.clientHeight * 0.75, 
                            behavior: 'smooth' 
                        });
                    }
                }
                break;
        }
    }

   
    document.addEventListener('keydown', handleKeyboardScroll);

    function toggleCursor() {
        if (isCursorLocked) {
           
            document.body.classList.remove('cursor-locked');
            cursorControlBtn.textContent = 'Hide Cursor';
            cursorControlBtn.classList.remove('cursor-hidden');
            isCursorLocked = false;
            isCursorHidden = false;
        } else if (isCursorHidden) {
            
            document.body.classList.add('cursor-locked');
            cursorControlBtn.textContent = 'Unlock Cursor';
            cursorControlBtn.classList.add('cursor-hidden');
            isCursorLocked = true;
        } else {
           
            document.body.classList.add('cursor-hidden');
            cursorControlBtn.textContent = 'Show Cursor';
            cursorControlBtn.classList.add('cursor-hidden');
            isCursorHidden = true;
        }
    }

    cursorControlBtn.addEventListener('click', toggleCursor);

    
    controls.addEventListener('mouseenter', () => {
        if (isCursorHidden || isCursorLocked) {
            document.body.classList.remove('cursor-hidden', 'cursor-locked');
        }
    });

    controls.addEventListener('mouseleave', () => {
        if (isCursorHidden) {
            document.body.classList.add('cursor-hidden');
        } else if (isCursorLocked) {
            document.body.classList.add('cursor-locked');
        }
    });

    
    class MatrixRain {
        constructor() {
            this.canvas = null;
            this.ctx = null;
            this.chars = "01";
            this.fontSize = 14;
            this.columns = 0;
            this.drops = [];
            this.isActive = false;
            this.activationSequence = ['m', 'a', 't', 'r', 'i', 'x'];
            this.sequenceIndex = 0;
        }

        init() {
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'matrix-rain';
            this.canvas.style.position = 'fixed';
            this.canvas.style.top = '0';
            this.canvas.style.left = '0';
            this.canvas.style.zIndex = '9999';
            this.canvas.style.pointerEvents = 'none';
            document.body.appendChild(this.canvas);

            this.ctx = this.canvas.getContext('2d');
            this.resize();
            window.addEventListener('resize', () => this.resize());
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.columns = Math.floor(this.canvas.width / this.fontSize);
            this.drops = Array(this.columns).fill(1);
        }

        draw() {
            if (!this.isActive) return;

            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.fillStyle = '#0F0';
            this.ctx.font = this.fontSize + 'px monospace';

            for (let i = 0; i < this.drops.length; i++) {
                const text = this.chars[Math.floor(Math.random() * this.chars.length)];
                const x = i * this.fontSize;
                const y = this.drops[i] * this.fontSize;

                this.ctx.fillStyle = `rgba(0, 255, 0, ${Math.random()})`;
                this.ctx.fillText(text, x, y);

                if (y > this.canvas.height && Math.random() > 0.975) {
                    this.drops[i] = 0;
                }
                this.drops[i]++;
            }

            requestAnimationFrame(() => this.draw());
        }

        toggle() {
            this.isActive = !this.isActive;
            if (this.isActive) {
                this.draw();
                document.body.classList.add('matrix-active');
            } else {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                document.body.classList.remove('matrix-active');
            }
        }
    }

   
    const matrixRain = new MatrixRain();
    matrixRain.init();

    
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === matrixRain.activationSequence[matrixRain.sequenceIndex]) {
            matrixRain.sequenceIndex++;
            if (matrixRain.sequenceIndex === matrixRain.activationSequence.length) {
                matrixRain.toggle();
                matrixRain.sequenceIndex = 0;
            }
        } else {
            matrixRain.sequenceIndex = 0;
        }
    });

   
    class Presentation3D {
        constructor() {
            this.isActive = false;
            this.activationSequence = ['t', 'd'];
            this.sequenceIndex = 0;
            this.mouseX = 0;
            this.mouseY = 0;
            this.maxDepth = 500;
            this.sensitivity = 0.3;
            this.presentation = document.querySelector('.presentation');
            this.slides = document.querySelectorAll('.slide');
            this.currentIndex = 0;
            this.parallaxElements = [];
            this.lastMouseMove = 0;
            this.mouseMoveTimeout = null;
            this.isMouseMoving = false;
            this.isTransitioning = false;
            this.zoomLevel = 1;
            this.maxZoom = 2;
            this.minZoom = 0.5;
            this.isOverviewMode = false;
            this.enableAutoRotate = false;
            this.rotationAngle = 0;
            this.rotationSpeed = 0.2;
            this.perspectiveStrength = 1500;
            this.isGlowEffectEnabled = false;
            this.isDarkMode = document.body.classList.contains('dark-mode');
          
            this.initKeyboardListener();
            this.createProgressIndicator();
            this.createSlideNumber();
            this.createSlideTitleDisplay();
    
            this.updateProgress = this.updateProgress.bind(this);
            this.updateMousePosition = this.updateMousePosition.bind(this);
            this.animate = this.animate.bind(this);
            this.toggle = this.toggle.bind(this);
            this.handleZoom = this.handleZoom.bind(this);
            this.toggleOverviewMode = this.toggleOverviewMode.bind(this);
            this.toggleAutoRotate = this.toggleAutoRotate.bind(this);
            this.toggleGlowEffect = this.toggleGlowEffect.bind(this);
            this.changePerspective = this.changePerspective.bind(this);
         
            document.addEventListener('wheel', (e) => {
                if (this.isActive && e.ctrlKey) {
                    e.preventDefault();
                    this.handleZoom(e.deltaY > 0 ? 'out' : 'in');
                }
            });
           
            document.addEventListener('keydown', (e) => {
                if (!this.isActive) return;
                
                switch(e.key.toLowerCase()) {
                    case 'o':
                        this.toggleOverviewMode();
                        break;
                    case 'r':
                        this.toggleAutoRotate();
                        break;
                    case 'g':
                        this.toggleGlowEffect();
                        break;
                    case '=':
                    case '+':
                        if (e.ctrlKey) {
                            e.preventDefault();
                            this.handleZoom('in');
                        }
                        break;
                    case '-':
                        if (e.ctrlKey) {
                            e.preventDefault();
                            this.handleZoom('out');
                        }
                        break;
                    case '[':
                        this.changePerspective(-100);
                        break;
                    case ']':
                        this.changePerspective(100);
                        break;
                    case 'arrowup':
                        if (e.ctrlKey) {
                            e.preventDefault();
                            this.adjustDepth(50);
                        }
                        break;
                    case 'arrowdown':
                        if (e.ctrlKey) {
                            e.preventDefault();
                            this.adjustDepth(-50);
                        }
                        break;
                    case 't':
                        // Toggle dark mode during 3D mode
                        if (!e.ctrlKey && !e.altKey && !e.metaKey) {
                            const themeToggleBtn = document.getElementById('theme-toggle');
                            if (themeToggleBtn) {
                                themeToggleBtn.click();
                                this.isDarkMode = document.body.classList.contains('dark-mode');
                                this.updateTheme3D();
                            }
                        }
                        break;
                }
            });
            
            // Listen for theme changes from outside
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'class') {
                        if (this.isActive) {
                            this.isDarkMode = document.body.classList.contains('dark-mode');
                            this.updateTheme3D();
                        }
                    }
                });
            });
            
            observer.observe(document.body, { attributes: true });
           
            this.animate();
        }

        initKeyboardListener() {
            document.addEventListener('keydown', (e) => {
                if (e.key.toLowerCase() === this.activationSequence[this.sequenceIndex]) {
                    this.sequenceIndex++;
                    if (this.sequenceIndex === this.activationSequence.length) {
                        this.toggle();
                        this.sequenceIndex = 0;
                    }
                } else {
                    this.sequenceIndex = 0;
                    if (e.key.toLowerCase() === 't') {
                        this.sequenceIndex = 1;
                    }
                }
            });
        }

        toggle() {
            this.isActive = !this.isActive;
            document.body.classList.toggle('presentation-3d');
            
            if (this.isActive) {
                this.isDarkMode = document.body.classList.contains('dark-mode');
                this.presentation.style.transform = 'translateZ(0)';
                this.resetSlides();
                this.showCurrentSlide();
                this.addDepthToElements();
                document.addEventListener('mousemove', this.updateMousePosition);
                this.updateProgress();
                this.updateSlideNumber();
                this.updateTitleDisplay();
                this.createBatteryIndicator();
                this.updateTheme3D();
            } else {
                this.presentation.style.transform = '';
                this.resetSlides();
                const currentSlide = document.querySelector('.slide.active');
                if (currentSlide) {
                    currentSlide.style.display = 'flex';
                }
                document.removeEventListener('mousemove', this.updateMousePosition);
                if (this.progressFill) this.progressFill.remove();
                if (this.slideNumberEl) this.slideNumberEl.remove();
                if (this.titleDisplay) this.titleDisplay.remove();
                this.hideHelpTooltip();
                const batteryIndicator = document.querySelector('.battery-indicator');
                if (batteryIndicator) batteryIndicator.remove();
            }
        }
        
        updateTheme3D() {
            if (!this.isActive) return;
            
            // Update 3D specific elements to match the current theme
            const glowColor = this.isDarkMode ? 
                'rgba(99, 102, 241, 0.3)' : 'rgba(78, 84, 200, 0.3)';
            const deepGlowColor = this.isDarkMode ? 
                'rgba(99, 102, 241, 0.2)' : 'rgba(78, 84, 200, 0.2)';
                
            if (this.isGlowEffectEnabled) {
                // Update glow colors to match theme
                document.querySelectorAll('.slide').forEach(slide => {
                    slide.style.boxShadow = `0 0 30px ${glowColor}, 0 0 80px ${deepGlowColor}`;
                });
                
                document.querySelectorAll('.definition-box, .image-container, .two-col > div').forEach(el => {
                    el.style.boxShadow = `0 0 15px ${glowColor}`;
                });
            }
            
            // Update help panel colors if visible
            if (this.helpTooltip) {
                this.helpTooltip.style.background = this.isDarkMode ? 
                    'rgba(30, 41, 59, 0.95)' : 'rgba(248, 250, 252, 0.95)';
                this.helpTooltip.style.color = this.isDarkMode ? 
                    '#e2e8f0' : '#334155';
            }
        }

        resetSlides() {
            document.querySelectorAll('.slide').forEach(slide => {
                slide.style.display = 'none';
                slide.classList.remove('active', 'slide-right-in', 'slide-left-in', 'slide-right-out', 'slide-left-out', 'initial-transition');
                slide.style.pointerEvents = 'none';
                slide.style.opacity = '0';
                slide.style.transform = 'translateZ(-1000px) scale(0.8)';
                slide.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        }

        showCurrentSlide() {
            const currentSlide = document.querySelector('.slide.active');
            if (currentSlide) {
                currentSlide.style.display = 'flex';
                currentSlide.classList.add('active', 'initial-transition');
                currentSlide.style.pointerEvents = 'auto';
                
              
                currentSlide.offsetHeight;
                
            
                currentSlide.style.opacity = '1';
                currentSlide.style.transform = 'translateZ(0) scale(1)';
            }
        }

        addDepthToElements() {
            document.querySelectorAll('.definition-box').forEach((box, index) => {
                box.setAttribute('data-depth', (index % 4) + 1);
            });

            document.querySelectorAll('.image-container').forEach((container, index) => {
                container.setAttribute('data-depth', ((index + 2) % 4) + 1);
            });

            document.querySelectorAll('.two-col > div').forEach((div, index) => {
                div.setAttribute('data-depth', ((index + 1) % 4) + 1);
            });
        }

        updatePerspective() {
            if (!this.isActive || this.isTransitioning) return;
            
            const depth = this.mouseY * this.maxDepth * this.sensitivity;
            const tiltX = this.mouseX * 5;
            const tiltY = this.mouseY * 2;
            
            let rotationY = this.enableAutoRotate ? this.rotationAngle : tiltY;
            
            this.presentation.style.transform = `
                perspective(${this.perspectiveStrength}px)
                rotateX(${-tiltX}deg)
                rotateY(${rotationY}deg)
                translateZ(${depth}px)
                scale(${this.zoomLevel})
            `;
            
            // Update slide elements with parallax effect
            if (this.isGlowEffectEnabled) {
                const activeSlide = document.querySelector('.slide.active');
                if (activeSlide) {
                    const elements = activeSlide.querySelectorAll('.definition-box, .image-container, .two-col > div');
                    elements.forEach((element, index) => {
                        const depthValue = parseInt(element.getAttribute('data-depth') || '1');
                        const parallaxFactor = depthValue * 10;
                        element.style.transform = `translateZ(${parallaxFactor}px) translateX(${this.mouseX * 20 * depthValue}px) translateY(${this.mouseY * 10 * depthValue}px)`;
                    });
                }
            }
        }

        handleSlideTransition(direction) {
            if (this.isTransitioning) return;
            this.isTransitioning = true;

            const currentSlide = document.querySelector('.slide.active');
            const nextSlide = direction === 'next' ? currentSlide.nextElementSibling : currentSlide.previousElementSibling;

            if (!nextSlide) {
                this.isTransitioning = false;
                return;
            }


            currentSlide.classList.add(direction === 'next' ? 'slide-right-out' : 'slide-left-out');
            currentSlide.style.opacity = '0';
            currentSlide.style.transform = direction === 'next' 
                ? 'translateX(-100%) translateZ(-1000px) scale(0.8)' 
                : 'translateX(100%) translateZ(-1000px) scale(0.8)';

       
            nextSlide.style.display = 'flex';
            nextSlide.classList.add(direction === 'next' ? 'slide-right-in' : 'slide-left-in');
            nextSlide.style.opacity = '0';
            nextSlide.style.transform = direction === 'next'
                ? 'translateX(100%) translateZ(-1000px) scale(0.8)'
                : 'translateX(-100%) translateZ(-1000px) scale(0.8)';


            nextSlide.offsetHeight;


            nextSlide.style.opacity = '1';
            nextSlide.style.transform = 'translateX(0) translateZ(0) scale(1)';

            setTimeout(() => {
                currentSlide.style.display = 'none';
                currentSlide.classList.remove('active', 'slide-right-out', 'slide-left-out');
                nextSlide.classList.add('active');
                this.isTransitioning = false;
            }, 1200);
        }

        createProgressIndicator() {
            const progress = document.createElement('div');
            progress.className = 'progress-3d';
            const fill = document.createElement('div');
            fill.className = 'fill';
            progress.appendChild(fill);
            document.body.appendChild(progress);
            this.progressFill = fill;
            this.updateProgress();
        }

        createSlideNumber() {
            const slideNumber = document.createElement('div');
            slideNumber.className = 'slide-number';
            document.body.appendChild(slideNumber);
            this.slideNumberEl = slideNumber;
            this.updateSlideNumber();
        }

        updateProgress() {
            if (!this.progressFill) return;
            const progress = (this.currentIndex / (this.slides.length - 1)) * 100;
            this.progressFill.style.width = `${progress}%`;
        }

        updateSlideNumber() {
            if (!this.slideNumberEl) return;
            this.slideNumberEl.textContent = `${this.currentIndex + 1} / ${this.slides.length}`;
        }

        updateMousePosition(e) {
            if (!this.isActive) return;
            
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            
            this.mouseX = x;
            this.mouseY = y;
            
            this.updatePerspective();
        }

        animate() {
            if (this.isActive) {
                // Smooth mouse movement
                this.mouseX += (this.mouseX - this.mouseX) * 0.1;
                this.mouseY += (this.mouseY - this.mouseY) * 0.1;
                
                // Auto-rotation if enabled
                if (this.enableAutoRotate) {
                    this.rotationAngle += this.rotationSpeed;
                    if (this.rotationAngle > 360) {
                        this.rotationAngle = 0;
                    }
                }
                
                this.updatePerspective();
            }
            requestAnimationFrame(this.animate);
        }

        handleZoom(direction) {
            const zoomStep = 0.1;
            const newZoom = direction === 'in' 
                ? Math.min(this.zoomLevel + zoomStep, this.maxZoom)
                : Math.max(this.zoomLevel - zoomStep, this.minZoom);
            
            if (newZoom !== this.zoomLevel) {
                this.zoomLevel = newZoom;
                this.updatePerspective();
            }
        }

        adjustDepth(amount) {
            this.maxDepth = Math.max(100, Math.min(1000, this.maxDepth + amount));
            this.updatePerspective();
        }

        toggleOverviewMode() {
            this.isOverviewMode = !this.isOverviewMode;
            document.body.classList.toggle('overview-mode', this.isOverviewMode);
            
            if (this.isOverviewMode) {
                this.showOverview();
            } else {
                this.exitOverview();
            }
        }

        showOverview() {
            const totalSlides = this.slides.length;
            
          
            let gridContainer = document.querySelector('.overview-grid-container');
            if (!gridContainer) {
                gridContainer = document.createElement('div');
                gridContainer.className = 'overview-grid-container';
                document.body.appendChild(gridContainer);
            }
            
     
            const gridControls = document.createElement('div');
            gridControls.className = 'grid-controls';
            gridControls.innerHTML = `
                <button class="grid-control-button" id="reset-grid">Reset View</button>
                <button class="grid-control-button" id="exit-overview">Exit Overview</button>
            `;
            document.body.appendChild(gridControls);
            
        
            const zoomControls = document.createElement('div');
            zoomControls.className = 'zoom-controls';
            zoomControls.innerHTML = `
                <button class="zoom-button" id="zoom-in">+</button>
                <button class="zoom-button" id="zoom-out">-</button>
            `;
            document.body.appendChild(zoomControls);
            
 
            const rows = Math.ceil(Math.sqrt(totalSlides));
            const cols = Math.ceil(totalSlides / rows);
            
  
            const slideWidth = 250;
            const slideHeight = 200;
            const horizontalGap = 50;
            const verticalGap = 50;
            
            const gridWidth = cols * (slideWidth + horizontalGap) - horizontalGap;
            const gridHeight = rows * (slideHeight + verticalGap) - verticalGap;
            
      
            const offsetX = (window.innerWidth - gridWidth) / 2;
            const offsetY = (window.innerHeight - gridHeight) / 2;
            
          
            let isDragging = false;
            let startX = 0;
            let startY = 0;
            let currentTransform = { x: offsetX, y: offsetY, scale: 1 };
            
        
            gridContainer.style.transform = `translate3d(${currentTransform.x}px, ${currentTransform.y}px, 0) scale(${currentTransform.scale})`;
            
          
            gridContainer.addEventListener('mousedown', (e) => {
                if (e.button === 0) { 
                    e.preventDefault();
                    isDragging = true;
                    gridContainer.classList.add('dragging');
                    startX = e.clientX - currentTransform.x;
                    startY = e.clientY - currentTransform.y;
                }
            });
            
            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                
                currentTransform.x = e.clientX - startX;
                currentTransform.y = e.clientY - startY;
                
                gridContainer.style.transform = `translate3d(${currentTransform.x}px, ${currentTransform.y}px, 0) scale(${currentTransform.scale})`;
            });
            
            document.addEventListener('mouseup', () => {
                isDragging = false;
                gridContainer.classList.remove('dragging');
            });
            
           
            gridContainer.addEventListener('wheel', (e) => {
                e.preventDefault();
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                currentTransform.scale = Math.max(0.5, Math.min(2, currentTransform.scale + delta));
                gridContainer.style.transform = `translate3d(${currentTransform.x}px, ${currentTransform.y}px, 0) scale(${currentTransform.scale})`;
            });
            
          
            gridContainer.innerHTML = '';
            
          
            const slidesWrapper = document.createElement('div');
            slidesWrapper.className = 'slides-wrapper';
            slidesWrapper.style.position = 'relative';
            slidesWrapper.style.width = `${gridWidth}px`;
            slidesWrapper.style.height = `${gridHeight}px`;
            gridContainer.appendChild(slidesWrapper);
            
           
            this.slides.forEach((slide, index) => {
                
                const slideClone = slide.cloneNode(true);
                slideClone.style.position = 'absolute';
                slideClone.style.width = `${slideWidth}px`;
                slideClone.style.height = `${slideHeight}px`;
                slideClone.style.margin = '0';
                slideClone.style.display = 'flex';
                slideClone.style.opacity = '1';
                slideClone.style.overflow = 'hidden';
                slideClone.style.transform = 'none';
                
                
                const row = Math.floor(index / cols);
                const col = index % cols;
                const left = col * (slideWidth + horizontalGap);
                const top = row * (slideHeight + verticalGap);
                
                slideClone.style.left = `${left}px`;
                slideClone.style.top = `${top}px`;
                
               
                const slideInfo = document.createElement('div');
                slideInfo.className = 'slide-info';
                slideInfo.style.position = 'absolute';
                slideInfo.style.bottom = '5px';
                slideInfo.style.left = '5px';
                slideInfo.style.background = 'rgba(0, 0, 0, 0.7)';
                slideInfo.style.color = 'white';
                slideInfo.style.padding = '3px 6px';
                slideInfo.style.borderRadius = '3px';
                slideInfo.style.fontSize = '12px';
                slideInfo.textContent = `${index + 1}`;
                
               
                if (index === this.currentIndex) {
                    slideClone.classList.add('active');
                    const activeMarker = document.createElement('div');
                    activeMarker.style.position = 'absolute';
                    activeMarker.style.top = '0';
                    activeMarker.style.left = '0';
                    activeMarker.style.right = '0';
                    activeMarker.style.height = '4px';
                    activeMarker.style.background = '#4a90e2';
                    slideClone.appendChild(activeMarker);
                }
                
                slideClone.appendChild(slideInfo);
                slidesWrapper.appendChild(slideClone);
              
                slideClone.onclick = (e) => {
                    if (!isDragging) {
                        this.currentIndex = index;
                        this.toggleOverviewMode();
                    }
                };
            });
            
           
            document.getElementById('reset-grid').onclick = () => {
                currentTransform.x = offsetX;
                currentTransform.y = offsetY;
                currentTransform.scale = 1;
                gridContainer.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) scale(1)`;
            };
            
            document.getElementById('exit-overview').onclick = () => {
                this.toggleOverviewMode();
            };
            
            document.getElementById('zoom-in').onclick = () => {
                currentTransform.scale = Math.min(2, currentTransform.scale + 0.1);
                gridContainer.style.transform = `translate3d(${currentTransform.x}px, ${currentTransform.y}px, 0) scale(${currentTransform.scale})`;
            };
            
            document.getElementById('zoom-out').onclick = () => {
                currentTransform.scale = Math.max(0.5, currentTransform.scale - 0.1);
                gridContainer.style.transform = `translate3d(${currentTransform.x}px, ${currentTransform.y}px, 0) scale(${currentTransform.scale})`;
            };
            
           
            const hint = document.createElement('div');
            hint.className = 'overview-hint';
            hint.textContent = 'Click and drag to move • Scroll to zoom • Click slide to navigate';
            document.body.appendChild(hint);
            
            setTimeout(() => {
                hint.classList.add('visible');
            }, 500);
            
            setTimeout(() => {
                hint.classList.remove('visible');
                setTimeout(() => hint.remove(), 300);
            }, 4000);
        }

        exitOverview() {
          
            const gridContainer = document.querySelector('.overview-grid-container');
            if (gridContainer) gridContainer.remove();
            
           
            const gridControls = document.querySelector('.grid-controls');
            if (gridControls) gridControls.remove();
            
            const zoomControls = document.querySelector('.zoom-controls');
            if (zoomControls) zoomControls.remove();
            
           
            const existingHint = document.querySelector('.overview-hint');
            if (existingHint) existingHint.remove();
            
            
            this.resetSlides();
            this.showCurrentSlide();
        }

        showHelpTooltip() {
            // Remove existing help tooltip if it exists
            this.hideHelpTooltip();
            
            // Create new help tooltip
            const helpTooltip = document.createElement('div');
            helpTooltip.className = 'presentation-3d-help';
            
            // Set proper colors based on theme
            if (this.isDarkMode) {
                helpTooltip.style.background = 'rgba(30, 41, 59, 0.95)';
                helpTooltip.style.color = '#e2e8f0';
            } else {
                helpTooltip.style.background = 'rgba(248, 250, 252, 0.95)';
                helpTooltip.style.color = '#334155';
            }
            
            helpTooltip.innerHTML = `
                <h3>3D Mode Controls</h3>
                <ul>
                    <li><strong>Mouse:</strong> Move to rotate the presentation</li>
                    <li><strong>Scroll Wheel + Ctrl:</strong> Zoom in/out</li>
                    <li><strong>O:</strong> Toggle overview mode</li>
                    <li><strong>R:</strong> Toggle automatic rotation</li>
                    <li><strong>G:</strong> Toggle glow/depth effects</li>
                    <li><strong>T:</strong> Toggle dark/light theme</li>
                    <li><strong>[/]:</strong> Adjust perspective depth</li>
                    <li><strong>Ctrl + ↑/↓:</strong> Adjust depth perception</li>
                    <li><strong>ESC:</strong> Exit 3D mode</li>
                </ul>
                <p>Press H to toggle this help.</p>
            `;
            document.body.appendChild(helpTooltip);
            this.helpTooltip = helpTooltip;
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
            if (this.helpTooltip) {
                    this.helpTooltip.classList.add('fading');
                    setTimeout(() => {
                        if (this.helpTooltip && this.helpTooltip.classList.contains('fading')) {
                this.helpTooltip.remove();
                this.helpTooltip = null;
            }
                    }, 1000);
                }
            }, 5000);
        }
        
        hideHelpTooltip() {
            if (this.helpTooltip) {
                this.helpTooltip.remove();
                this.helpTooltip = null;
            }
        }
        
        toggleHelpTooltip() {
            if (this.helpTooltip) {
                this.hideHelpTooltip();
            } else {
                this.showHelpTooltip();
            }
        }
        
        
        createBatteryIndicator() {
            if ('getBattery' in navigator) {
                navigator.getBattery().then(battery => {
                    const batteryIndicator = document.createElement('div');
                    batteryIndicator.className = 'battery-indicator';
                    batteryIndicator.style.position = 'fixed';
                    batteryIndicator.style.bottom = '15px';
                    batteryIndicator.style.right = '15px';
                    batteryIndicator.style.background = 'rgba(0, 0, 0, 0.7)';
                    batteryIndicator.style.color = 'white';
                    batteryIndicator.style.padding = '5px 10px';
                    batteryIndicator.style.borderRadius = '15px';
                    batteryIndicator.style.fontSize = '12px';
                    batteryIndicator.style.zIndex = '9000';
                    
                    const updateBatteryStatus = () => {
                        const level = Math.floor(battery.level * 100);
                        let color = '#4caf50'; // green
                        
                        if (level <= 20) {
                            color = '#f44336'; // red
                        } else if (level <= 50) {
                            color = '#ff9800'; // orange
                        }
                        
                        batteryIndicator.innerHTML = `
                            <span style="color: ${color}">
                                ${battery.charging ? '⚡ ' : ''}${level}%
                            </span>
                        `;
                    };
                    
                    updateBatteryStatus();
                    
                    battery.addEventListener('levelchange', updateBatteryStatus);
                    battery.addEventListener('chargingchange', updateBatteryStatus);
                    
                    document.body.appendChild(batteryIndicator);
                });
            }
        }

        toggleAutoRotate() {
            this.enableAutoRotate = !this.enableAutoRotate;
            
            // Show a notification
            const notification = document.createElement('div');
            notification.className = 'mode-notification';
            notification.textContent = this.enableAutoRotate ? 
                'Auto-Rotation Enabled' : 'Auto-Rotation Disabled';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('visible');
            }, 10);
            
            setTimeout(() => {
                notification.classList.remove('visible');
                setTimeout(() => notification.remove(), 500);
            }, 2000);
        }
        
        toggleGlowEffect() {
            this.isGlowEffectEnabled = !this.isGlowEffectEnabled;
            
            if (this.isGlowEffectEnabled) {
                document.body.classList.add('glow-effect');
                
                // Get theme appropriate colors
                const glowColor = this.isDarkMode ? 
                    'rgba(99, 102, 241, 0.3)' : 'rgba(78, 84, 200, 0.3)';
                const deepGlowColor = this.isDarkMode ? 
                    'rgba(99, 102, 241, 0.2)' : 'rgba(78, 84, 200, 0.2)';
                
                // Add glow to all slides
                document.querySelectorAll('.slide').forEach(slide => {
                    slide.style.boxShadow = `0 0 30px ${glowColor}, 0 0 80px ${deepGlowColor}`;
                });
                
                // Add glow to elements within slides
                document.querySelectorAll('.definition-box, .image-container, .two-col > div').forEach(el => {
                    el.style.boxShadow = `0 0 15px ${glowColor}`;
                    el.style.transition = 'all 0.5s ease, transform 0.3s ease, box-shadow 0.3s ease';
                });
            } else {
                document.body.classList.remove('glow-effect');
                
                // Remove glow
                document.querySelectorAll('.slide').forEach(slide => {
                    slide.style.boxShadow = '';
                });
                
                document.querySelectorAll('.definition-box, .image-container, .two-col > div').forEach(el => {
                    el.style.boxShadow = '';
                });
            }
            
            // Show a notification
            const notification = document.createElement('div');
            notification.className = 'mode-notification';
            notification.textContent = this.isGlowEffectEnabled ? 
                'Glow Effect Enabled' : 'Glow Effect Disabled';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('visible');
            }, 10);
            
            setTimeout(() => {
                notification.classList.remove('visible');
                setTimeout(() => notification.remove(), 500);
            }, 2000);
        }
        
        changePerspective(amount) {
            this.perspectiveStrength = Math.max(500, Math.min(3000, this.perspectiveStrength + amount));
            this.updatePerspective();
            
            // Show a notification
            const notification = document.createElement('div');
            notification.className = 'mode-notification';
            notification.textContent = `Perspective: ${this.perspectiveStrength}px`;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('visible');
            }, 10);
            
            setTimeout(() => {
                notification.classList.remove('visible');
                setTimeout(() => notification.remove(), 500);
            }, 2000);
        }

        createSlideTitleDisplay() {
            const titleDisplay = document.createElement('div');
            titleDisplay.className = 'slide-title-display';
            titleDisplay.style.position = 'fixed';
            titleDisplay.style.top = '15px';
            titleDisplay.style.left = '50%';
            titleDisplay.style.transform = 'translateX(-50%)';
            titleDisplay.style.background = 'rgba(0, 0, 0, 0.7)';
            titleDisplay.style.color = 'white';
            titleDisplay.style.padding = '8px 20px';
            titleDisplay.style.borderRadius = '20px';
            titleDisplay.style.fontSize = '14px';
            titleDisplay.style.zIndex = '9000';
            titleDisplay.style.opacity = '0';
            titleDisplay.style.transition = 'opacity 0.3s ease';
            document.body.appendChild(titleDisplay);
            this.titleDisplay = titleDisplay;
            
            this.updateTitleDisplay();
        }
        
        updateTitleDisplay() {
            if (!this.titleDisplay) return;
            
            const currentSlide = this.slides[this.currentIndex];
            if (!currentSlide) return;
            
            const h1 = currentSlide.querySelector('h1');
            const h2 = currentSlide.querySelector('h2');
            let title = '';
            
            if (h1) {
                title = h1.textContent;
            } else if (h2) {
                title = h2.textContent;
            } else {
                title = `Slide ${this.currentIndex + 1}`;
            }
            
            this.titleDisplay.textContent = title;
            this.titleDisplay.style.opacity = '1';
            
            setTimeout(() => {
                this.titleDisplay.style.opacity = '0';
            }, 3000);
        }
    }


    const presentation3D = new Presentation3D();

    
    let wobbleSequence = ['q', 'q', 'q'];
    let wobbleIndex = 0;
    let wobbleLastKeyTime = 0;
    let isWobbleMode = false;

    let discoSequence = ['z', 'z', 'z'];
    let discoIndex = 0;
    let discoInterval = null;
    let isDiscoMode = false;

    let flipSequence = ['x', 'x', 'x'];
    let flipIndex = 0;
    let isFlipMode = false;

   
    let gravitySequence = ['c', 'c', 'c'];
    let gravityIndex = 0;
    let isGravityMode = false;
    let fallingElements = [];
    let gravityInterval = null;

 
    let thanosSequence = ['v', 'v', 'v'];
    let thanosIndex = 0;
    let isThanosMode = false;

    document.addEventListener('keydown', (e) => {
        
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        const key = e.key.toLowerCase();
        const currentTime = new Date().getTime();
        
        if (key === wobbleSequence[wobbleIndex]) {
            if (wobbleIndex === 0 || currentTime - wobbleLastKeyTime < 1000) {
                wobbleIndex++;
                wobbleLastKeyTime = currentTime;
                
                if (wobbleIndex === wobbleSequence.length) {
                    toggleWobbleMode();
                    wobbleIndex = 0;
                }
            } else {
                wobbleIndex = 1;
                wobbleLastKeyTime = currentTime;
            }
        } else if (key === wobbleSequence[0]) {
            wobbleIndex = 1;
            wobbleLastKeyTime = currentTime;
        } else if (key === discoSequence[discoIndex]) {
            discoIndex++;
            if (discoIndex === discoSequence.length) {
                toggleDiscoMode();
                discoIndex = 0;
            }
        } else if (key === discoSequence[0]) {
            discoIndex = 1;
        } else if (key === flipSequence[flipIndex]) {
            flipIndex++;
            if (flipIndex === flipSequence.length) {
                toggleFlipMode();
                flipIndex = 0;
            }
        } else if (key === flipSequence[0]) {
            flipIndex = 1;
        } else if (key === gravitySequence[gravityIndex]) {
            gravityIndex++;
            if (gravityIndex === gravitySequence.length) {
                toggleGravityMode();
                gravityIndex = 0;
            }
        } else if (key === gravitySequence[0]) {
            gravityIndex = 1;
        } else if (key === thanosSequence[thanosIndex]) {
            thanosIndex++;
            if (thanosIndex === thanosSequence.length) {
                thanosSnap();
                thanosIndex = 0;
            }
        } else if (key === thanosSequence[0]) {
            thanosIndex = 1;
        } else {
            wobbleIndex = 0;
            discoIndex = 0;
            flipIndex = 0;
            gravityIndex = 0;
            thanosIndex = 0;
        }
    });

    function toggleWobbleMode() {
        isWobbleMode = !isWobbleMode;
        
        if (isWobbleMode) {
            const wobbleStyle = document.createElement('style');
            wobbleStyle.id = 'wobble-style';
            wobbleStyle.textContent = `
                @keyframes wobble {
                    0% { transform: rotate(0deg) scale(1); }
                    25% { transform: rotate(5deg) scale(1.05); }
                    50% { transform: rotate(0deg) scale(1); }
                    75% { transform: rotate(-5deg) scale(0.95); }
                    100% { transform: rotate(0deg) scale(1); }
                }
                
                .slide.active {
                    animation: wobble 0.5s ease-in-out infinite !important;
                }
                
                .slide.active * {
                    animation: wobble 0.7s ease-in-out infinite !important;
                }
            `;
            document.head.appendChild(wobbleStyle);
        } else {
            const wobbleStyle = document.getElementById('wobble-style');
            if (wobbleStyle) wobbleStyle.remove();
        }
    }

    function toggleDiscoMode() {
        isDiscoMode = !isDiscoMode;
        
        if (isDiscoMode) {
            const discoStyle = document.createElement('style');
            discoStyle.id = 'disco-style';
            discoStyle.textContent = `
                .slide.active h1, .slide.active h2, .slide.active h3 {
                    transition: color 0.2s ease !important;
                }
                
                .controls {
                    animation: disco-background 1s linear infinite !important;
                }
                
                @keyframes disco-background {
                    0% { background-color: rgba(255, 0, 0, 0.7); }
                    16.6% { background-color: rgba(255, 165, 0, 0.7); }
                    33.3% { background-color: rgba(255, 255, 0, 0.7); }
                    50% { background-color: rgba(0, 128, 0, 0.7); }
                    66.6% { background-color: rgba(0, 0, 255, 0.7); }
                    83.3% { background-color: rgba(75, 0, 130, 0.7); }
                    100% { background-color: rgba(238, 130, 238, 0.7); }
                }
            `;
            document.head.appendChild(discoStyle);
            
            discoInterval = setInterval(() => {
                const headings = document.querySelectorAll('.slide.active h1, .slide.active h2, .slide.active h3');
                headings.forEach(heading => {
                    const r = Math.floor(Math.random() * 256);
                    const g = Math.floor(Math.random() * 256);
                    const b = Math.floor(Math.random() * 256);
                    heading.style.color = `rgb(${r}, ${g}, ${b})`;
                });
            }, 200);
        } else {
            const discoStyle = document.getElementById('disco-style');
            if (discoStyle) discoStyle.remove();
            
            if (discoInterval) {
                clearInterval(discoInterval);
                discoInterval = null;
            }
            
            const headings = document.querySelectorAll('.slide h1, .slide h2, .slide h3');
            headings.forEach(heading => {
                heading.style.color = '';
            });
            
            if (document.discoAudio) {
                document.discoAudio.pause();
                document.discoAudio = null;
            }
        }
    }

    function toggleFlipMode() {
        isFlipMode = !isFlipMode;
        
        if (isFlipMode) {
            const flipStyle = document.createElement('style');
            flipStyle.id = 'flip-style';
            flipStyle.textContent = `
                .slide.active {
                    transform: scaleX(-1) !important;
                }
                
                .slide.active * {
                    transform: scaleX(-1) !important;
                }
                
                .slide.active img {
                    transform: scaleX(-1) scaleY(-1) !important;
                }
            `;
            document.head.appendChild(flipStyle);
        } else {
            const flipStyle = document.getElementById('flip-style');
            if (flipStyle) flipStyle.remove();
        }
    }

    function toggleGravityMode() {
        isGravityMode = !isGravityMode;
        
        if (isGravityMode) {
           
            const gravityStyle = document.createElement('style');
            gravityStyle.id = 'gravity-style';
            gravityStyle.textContent = `
                .falling-element {
                    position: absolute;
                    transition: transform 0.1s linear, top 0.1s linear;
                    z-index: 1000;
                }
            `;
            document.head.appendChild(gravityStyle);
            
          
            initGravityMode();
        } else {
           
            const gravityStyle = document.getElementById('gravity-style');
            if (gravityStyle) gravityStyle.remove();
            
            if (gravityInterval) {
                clearInterval(gravityInterval);
                gravityInterval = null;
            }
            
           
            document.querySelectorAll('.falling-element').forEach(el => el.remove());
            fallingElements = [];
            
           
            document.querySelectorAll('.slide.active img, .slide.active .definition-box, .slide.active h1, .slide.active h2').forEach(el => {
                el.style.visibility = '';
            });
        }
    }

    function initGravityMode() {
       
        const currentSlide = document.querySelector('.slide.active');
        if (!currentSlide) return;
        
        const elements = currentSlide.querySelectorAll('img, .definition-box, h1, h2');
        
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            
        
            const clone = document.createElement('div');
            clone.className = 'falling-element';
            clone.innerHTML = el.outerHTML;
            
            
            clone.style.top = rect.top + 'px';
            clone.style.left = rect.left + 'px';
            clone.style.width = rect.width + 'px';
            clone.style.height = rect.height + 'px';
            
         
            el.style.visibility = 'hidden';
            
           
            const fallingElement = {
                element: clone,
                x: rect.left,
                y: rect.top,
                width: rect.width,
                height: rect.height,
                velocityY: 0,
                velocityX: (Math.random() - 0.5) * 5,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 10
            };
            
            fallingElements.push(fallingElement);
            document.body.appendChild(clone);
        });
        
        
        const gravity = 0.5;
        const friction = 0.99;
        const bounce = 0.7;
        
        gravityInterval = setInterval(() => {
            fallingElements.forEach(obj => {
                
                obj.velocityY += gravity;
                
             
                obj.y += obj.velocityY;
                obj.x += obj.velocityX;
                obj.rotation += obj.rotationSpeed;
                
               
                if (obj.y + obj.height > window.innerHeight) {
                    obj.y = window.innerHeight - obj.height;
                    obj.velocityY = -obj.velocityY * bounce;
                    obj.velocityX *= friction;
                    obj.rotationSpeed *= friction;
                }
                
                
                if (obj.x + obj.width > window.innerWidth) {
                    obj.x = window.innerWidth - obj.width;
                    obj.velocityX = -obj.velocityX * bounce;
                } else if (obj.x < 0) {
                    obj.x = 0;
                    obj.velocityX = -obj.velocityX * bounce;
                }
                
                
                obj.element.style.top = obj.y + 'px';
                obj.element.style.left = obj.x + 'px';
                obj.element.style.transform = `rotate(${obj.rotation}deg)`;
            });
        }, 30);
    }

    function thanosSnap() {
      
        const currentSlide = document.querySelector('.slide.active');
        if (!currentSlide) return;
        
        const elements = currentSlide.querySelectorAll('p, li, img, .definition-box, .image-container, .two-col > div');
        const elementsArray = Array.from(elements);
        
       
        const shuffled = elementsArray.sort(() => 0.5 - Math.random());
        
       
        const selectedElements = shuffled.slice(0, Math.floor(shuffled.length / 2));
        
       
        const snapStyle = document.createElement('style');
        snapStyle.id = 'thanos-style';
        snapStyle.textContent = `
            @keyframes disintegrate {
                0% {
                    opacity: 1;
                    filter: brightness(1);
                    transform: scale(1);
                }
                50% {
                    opacity: 0.8;
                    filter: brightness(3);
                    transform: scale(1.1);
                }
                100% {
                    opacity: 0;
                    filter: brightness(1);
                    transform: scale(0);
                }
            }
            
            .disintegrating {
                animation: disintegrate 2s forwards;
                pointer-events: none;
            }
        `;
        document.head.appendChild(snapStyle);
        
       
        const snapSound = new Audio('https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Thanos+Snap&filename=nj/NjQyODUwNTgzNjQyODU4_JzthsfvVyzI.mp3');
        snapSound.volume = 0.3;
        snapSound.play();
        
        
        selectedElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('disintegrating');
            }, 100 + (index * 50));
        });
        
      
        setTimeout(() => {
            selectedElements.forEach(el => {
                el.classList.remove('disintegrating');
            });
            const snapStyleElement = document.getElementById('thanos-style');
            if (snapStyleElement) snapStyleElement.remove();
        }, 10000);
    }

    // Dark mode toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        // If no saved preference, use system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // Listen for system theme changes
    if (window.matchMedia) {
        const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Update theme when system preference changes
        colorSchemeQuery.addEventListener('change', (e) => {
            // Only apply if user hasn't set a preference
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    document.body.classList.add('dark-mode');
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                } else {
                    document.body.classList.remove('dark-mode');
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
            }
        });
    }

    // Toggle theme function
    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
            showThemeNotification('Dark Mode Enabled');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
            showThemeNotification('Light Mode Enabled');
        }
    }
    
    // Function to show theme change notification
    function showThemeNotification(message) {
        // Remove any existing notification
        const existingNotification = document.querySelector('.theme-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Trigger animation by adding visible class after a small delay
        setTimeout(() => {
            notification.classList.add('visible');
        }, 10);
        
        // Remove notification after 2 seconds
        setTimeout(() => {
            notification.classList.remove('visible');
            setTimeout(() => {
                notification.remove();
            }, 500); // Wait for fade out animation
        }, 2000);
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', toggleTheme);
    
    // Toggle theme with keyboard shortcut 'T'
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.altKey && !e.metaKey) {
            // Only trigger if not inside an input field
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                toggleTheme();
            }
        }
    });

    // Add presentation timer
    function createPresentationTimer() {
        const timerElement = document.createElement('div');
        timerElement.className = 'presentation-timer';
        timerElement.innerHTML = '00:00';
        document.body.appendChild(timerElement);
        
        let seconds = 0;
        let minutes = 0;
        let timerInterval = null;
        
        function updateTimer() {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
            }
            
            const formattedMinutes = minutes.toString().padStart(2, '0');
            const formattedSeconds = seconds.toString().padStart(2, '0');
            timerElement.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
        }
        
        // Start the timer
        timerInterval = setInterval(updateTimer, 1000);
        
        // Pause/resume functionality with 'p' key
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'p' && e.ctrlKey) {
                e.preventDefault();
                if (timerInterval) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    timerElement.classList.add('paused');
                } else {
                    timerInterval = setInterval(updateTimer, 1000);
                    timerElement.classList.remove('paused');
                }
            }
        });
        
        return timerElement;
    }
    
    const presentationTimer = createPresentationTimer();

    // Add presenter notes functionality
    function setupPresenterNotes() {
        const notesPanel = document.createElement('div');
        notesPanel.className = 'presenter-notes-panel';
        notesPanel.innerHTML = `
            <div class="notes-header">
                <h3>Presenter Notes</h3>
                <button class="close-notes">×</button>
            </div>
            <div class="notes-content"></div>
        `;
        document.body.appendChild(notesPanel);
        
        // Sample notes for each slide (you can customize these)
        const notes = [
            "Welcome the audience and introduce yourself and the team.", // Slide 1
            "Explain that we'll be covering the main types of computers and their characteristics.", // Slide 2
            "Set the context for why understanding computer categories is important for different applications.", // Slide 3
            "Emphasize that supercomputers are the most powerful computers designed for complex calculations.", // Slide 4
            "Show real examples of supercomputers and their impressive specifications.", // Slide 5
            "Explain the internal architecture that makes supercomputers so powerful.", // Slide 6
            "Highlight the practical applications where supercomputers are essential.", // Slide 7
            "Transition to mainframes - the backbone of business computing.", // Slide 8
            "Compare mainframe images from past to present to show evolution.", // Slide 9
            "Emphasize reliability and transaction processing capabilities of mainframes.", // Slide 10
            "Explain where mainframes are still essential today despite newer technologies.", // Slide 11
            "Introduce minicomputers as the middle ground between mainframes and personal computers.", // Slide 12
            "Show how minicomputers evolved and their historical importance.", // Slide 13
            "Explain the key technical specifications that define minicomputers.", // Slide 14
            "Discuss real-world applications where minicomputers were/are used.", // Slide 15
            "Transition to the most familiar category - microcomputers.", // Slide 16
            "Emphasize how microcomputers revolutionized personal computing.", // Slide 17
            "Explain the technical characteristics that define microcomputers.", // Slide 18
            "Discuss how microcomputers are used in our daily lives.", // Slide 19
            "Compare all four types side by side to highlight key differences.", // Slide 20
            "Show the timeline of computer evolution across all categories.", // Slide 21
            "Summarize the key points covered in the presentation.", // Slide 22
            "Thank the audience and open the floor for questions." // Slide 23
        ];
        
        const notesContent = notesPanel.querySelector('.notes-content');
        const closeButton = notesPanel.querySelector('.close-notes');
        
        // Update notes based on current slide
        function updateNotes() {
            if (currentSlide < notes.length) {
                notesContent.innerHTML = notes[currentSlide];
            } else {
                notesContent.innerHTML = "No notes for this slide.";
            }
        }
        
        // Toggle notes with 'n' key
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'n') {
                notesPanel.classList.toggle('visible');
                if (notesPanel.classList.contains('visible')) {
                    updateNotes();
                }
            }
        });
        
        // Update notes when slides change
        const updateNotesOnSlideChange = () => {
            if (notesPanel.classList.contains('visible')) {
                updateNotes();
            }
        };
        
        // Listen for slide changes
        slides.forEach(slide => {
            slide.addEventListener('transitionend', (e) => {
                if (e.propertyName === 'opacity' && slide.classList.contains('active')) {
                    updateNotesOnSlideChange();
                }
            });
        });
        
        // Close button functionality
        closeButton.addEventListener('click', () => {
            notesPanel.classList.remove('visible');
        });
        
        // Initial update
        updateNotes();
    }
    
    setupPresenterNotes();

    // Add progress bar at the top of slides
    function createTopProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'top-progress-bar';
        
        const progressFill = document.createElement('div');
        progressFill.className = 'progress-fill';
        progressBar.appendChild(progressFill);
        
        document.body.appendChild(progressBar);
        
        // Update progress bar width based on current slide
        function updateProgress() {
            const progress = (currentSlide / (slides.length - 1)) * 100;
            progressFill.style.width = `${progress}%`;
        }
        
        // Update on slide change
        slides.forEach(slide => {
            slide.addEventListener('transitionend', (e) => {
                if (e.propertyName === 'opacity' && slide.classList.contains('active')) {
                    updateProgress();
                }
            });
        });
        
        // Initial update
        updateProgress();
        
        return { progressBar, updateProgress };
    }
    
    const topProgressBar = createTopProgressBar();
    
    // Update progress when changing slides with next/prev functions
    const originalNextSlide = nextSlide;
    nextSlide = function() {
        originalNextSlide();
        if (topProgressBar && topProgressBar.updateProgress) {
            setTimeout(topProgressBar.updateProgress, 600);
        }
    };
    
    const originalPrevSlide = prevSlide;
    prevSlide = function() {
        originalPrevSlide();
        if (topProgressBar && topProgressBar.updateProgress) {
            setTimeout(topProgressBar.updateProgress, 600);
        }
    };
    
    const originalGoToSlide = goToSlide;
    goToSlide = function(index) {
        originalGoToSlide(index);
        if (topProgressBar && topProgressBar.updateProgress) {
            setTimeout(topProgressBar.updateProgress, 600);
        }
    };

    // Add keyboard shortcuts help panel
    function createKeyboardShortcutsHelp() {
        const helpPanel = document.createElement('div');
        helpPanel.className = 'keyboard-shortcuts-panel';
        helpPanel.innerHTML = `
            <div class="shortcuts-header">
                <h3>Keyboard Shortcuts</h3>
                <button class="close-shortcuts">×</button>
            </div>
            <div class="shortcuts-content">
                <div class="shortcut-group">
                    <h4>Navigation</h4>
                    <div class="shortcut"><span class="key">→</span> or <span class="key">Space</span> <span class="desc">Next slide</span></div>
                    <div class="shortcut"><span class="key">←</span> <span class="desc">Previous slide</span></div>
                    <div class="shortcut"><span class="key">1</span>-<span class="key">9</span> <span class="desc">Jump to slide</span></div>
                </div>
                <div class="shortcut-group">
                    <h4>Display</h4>
                    <div class="shortcut"><span class="key">F</span> <span class="desc">Toggle fullscreen</span></div>
                    <div class="shortcut"><span class="key">T</span> <span class="desc">Toggle dark/light theme</span></div>
                    <div class="shortcut"><span class="key">N</span> <span class="desc">Toggle presenter notes</span></div>
                    <div class="shortcut"><span class="key">Ctrl</span>+<span class="key">P</span> <span class="desc">Pause/resume timer</span></div>
                </div>
                <div class="shortcut-group">
                    <h4>Content</h4>
                    <div class="shortcut"><span class="key">↑</span>/<span class="key">↓</span> <span class="desc">Scroll current slide</span></div>
                    <div class="shortcut"><span class="key">Home</span>/<span class="key">End</span> <span class="desc">Scroll to top/bottom</span></div>
                    <div class="shortcut"><span class="key">P</span> <span class="desc">Print presentation</span></div>
                    <div class="shortcut"><span class="key">H</span> <span class="desc">Show/hide this help</span></div>
                </div>
            </div>
        `;
        document.body.appendChild(helpPanel);
        
        const closeButton = helpPanel.querySelector('.close-shortcuts');
        
        // Toggle help panel with 'h' key
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'h') {
                helpPanel.classList.toggle('visible');
            }
        });
        
        // Close button functionality
        closeButton.addEventListener('click', () => {
            helpPanel.classList.remove('visible');
        });
        
        return helpPanel;
    }
    
    const keyboardShortcutsPanel = createKeyboardShortcutsHelp();
}); 