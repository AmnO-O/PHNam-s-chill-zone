/* assets/js/blog.js - Đã xóa phần điều hướng cũ */

// XÓA HÀM blogPopUp() ĐI NHÉ!

const blogs = document.querySelectorAll('.blog-container'); 
blogs.forEach(initBlog); 

function initBlog(blog){
    const blog_track = blog.querySelector('.blog-track'); 
    const items = blog_track.querySelectorAll('.blog-post'); 
    
    // Nếu chưa có bài viết nào thì dừng
    if(items.length === 0) return;

    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let currentIndex = 0;

    // Tính toán lại chiều rộng
    // Lưu ý: Trong code cũ bạn dùng margin cứng, ở đây ta lấy động
    const itemStyle = window.getComputedStyle(items[0]);
    const itemWidth = items[0].offsetWidth + parseFloat(itemStyle.marginRight) * 2;
    
    blog_track.style.width = `${itemWidth * items.length}px`;

    // Xử lý nút Next/Prev (Giữ nguyên logic slider của bạn)
    if(prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }

    if(nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentIndex < items.length - 1) {
                currentIndex++;
                updateSlider();
            }
        });
    }

    // Hàm cập nhật vị trí slider
    function updateSlider() {
        // Căn giữa item đang chọn
        const trackCenter = blog.offsetWidth / 2;
        const itemCenter = items[currentIndex].offsetWidth / 2;
        // Tính vị trí cần dịch chuyển
        const position = (itemWidth * currentIndex) - (trackCenter - itemCenter);
        
        blog_track.style.transform = `translateX(-${position}px)`;

        // Update class active
        items.forEach(item => item.classList.remove('active'));
        items[currentIndex].classList.add('active');
    }

    // Khởi chạy lần đầu
    setTimeout(() => updateSlider(), 100);
    window.addEventListener('resize', () => updateSlider());
}