

function blogPopUp(){
    const blogTrack = document.querySelector('.blog-track'); 

    for (let i = 0; i < blogTrack.children.length; i ++){
        const blogItem = blogTrack.children[i]; 

        blogItem.addEventListener('click', () => {
            window.open('404.html', '_blank'); 
        }); 

    }
}

blogPopUp(); 