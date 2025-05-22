

function blogPopUp(){
    const blogTrack = document.querySelector('.blog-track'); 

    for (let i = 0; i < blogTrack.children.length; i ++){
        const blogItem = blogTrack.children[i]; 

        blogItem.addEventListener('click', () => {
            const blogLinks = `blog${i}.html`;
             
            window.open(blogLinks, '_blank'); 
        }); 

    }
}

blogPopUp(); 


const blogs = document.querySelectorAll('.blog-container'); 
blogs.forEach(initBlog); 


function initBlog(blog){
    const blog_track = blog.querySelector('.blog-track'); 
    const items = blog_track.querySelectorAll('.blog-post'); 
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let currentTranslate = 0;
    let prevTranslate = 0;
    let currentIndex = 0;

    const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight) * 2;
    blog_track.style.width = `${itemWidth * items.length}px`;
    

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            centerItem(currentIndex);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            centerItem(currentIndex);
        }
    });

    setTimeout(() => {
        if (items.length > 0) {
            centerItem(0); 
        }
    }, 100);
    

    function centerItem(index) {

        const blogALL =  blog.offsetWidth;
        const itemCenter = items[index].offsetWidth / 2;
        const centerOffset = blogALL / 2 - itemCenter;
        
        currentIndex = index;
        currentTranslate = centerOffset - (index * itemWidth);
        prevTranslate = currentTranslate;
        
        setSliderPosition();
        updateActiveItems(index);
    }

    function setSliderPosition() {
        blog_track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function updateActiveItems(index) {

        items.forEach((item, i) => {
            item.classList.remove('active');            
        });
        
        items[index].classList.add('active');
     }


    window.addEventListener('resize', () => {
        centerItem(currentIndex);
    });
}

document.addEventListener('keydown', function(e) {
    const blogs = document.querySelectorAll('.blog-container'); 
    
    if (e.key === 'ArrowLeft') {
        const prevButton = document.querySelector('.prev-button');
        prevButton.click(); 
    }

    
    if (e.key === 'ArrowRight') {
        const nextButton = document.querySelector('.next-button');
        nextButton.click(); 
    }

});