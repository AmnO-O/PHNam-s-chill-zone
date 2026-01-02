/* assets/js/blog.js - Chỉ giữ lại logic Slider */

const blogs = document.querySelectorAll('.blog-container'); 
blogs.forEach(initBlog); 

function initBlog(blog){
    const blog_track = blog.querySelector('.blog-track'); 
    const items = blog_track.querySelectorAll('.blog-post'); 
    
    // Nếu chưa có bài viết nào thì thoát để tránh lỗi console
    if (items.length === 0) return;

    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let currentTranslate = 0;
    let currentIndex = 0;

    // Tính toán chiều rộng dựa trên item thực tế
    const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight) * 2;
    blog_track.style.width = `${itemWidth * items.length}px`;
    
    if(prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                centerItem(currentIndex);
            }
        });
    }

    if(nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentIndex < items.length - 1) {
                currentIndex++;
                centerItem(currentIndex);
            }
        });
    }

    // Khởi tạo vị trí ban đầu
    setTimeout(() => centerItem(0), 100);

    function centerItem(index) {
        const blogContainerWidth = blog.offsetWidth;
        const itemCenter = items[index].offsetWidth / 2;
        const centerOffset = blogContainerWidth / 2 - itemCenter;
        
        currentIndex = index;
        currentTranslate = centerOffset - (index * itemWidth);
        
        blog_track.style.transform = `translateX(${currentTranslate}px)`;
        
        // Cập nhật class active để làm nổi bật bài ở giữa
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');
    }

    window.addEventListener('resize', () => centerItem(currentIndex));
}

// Xử lý phím mũi tên
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') document.querySelector('.prev-button')?.click();
    if (e.key === 'ArrowRight') document.querySelector('.next-button')?.click();
});