

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