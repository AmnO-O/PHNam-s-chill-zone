const musicCollection = [
    {
        url : "https://www.youtube.com/watch?v=fgpwTxIv76Q"
    },
    {
        url : "https://www.youtube.com/watch?v=iR964FRowgA" 

    },
    {
        url : "https://www.youtube.com/watch?v=oEwgOQMM5PI" 
    },
    {
        url : "https://www.youtube.com/watch?v=XkTs-AzGXnc"
    },{
        url : "https://www.youtube.com/watch?v=NWvYZT-HU54",
    },{
        url : "https://www.youtube.com/watch?v=ZXhXlffz_60",
    },{
        url : "https://www.youtube.com/watch?v=uWPy5-4jBSE",
    },{
        url: "https://www.youtube.com/watch?v=iwVdYvi66Fc",
    },{
        url : "https://www.youtube.com/watch?v=_hS33cHtK-E",
    },{
        url : "https://www.youtube.com/watch?v=HC6xx-GxlUY",
    },{
        url : "https://www.youtube.com/watch?v=cGJJX3L7I7I",
    },{
        url : "https://www.youtube.com/watch?v=r1Fx0tqK5Z4",
    },{
        url : "https://www.youtube.com/watch?v=9Ke4480MicU",
    },{
        url : "https://www.youtube.com/watch?v=DzwkcbTQ7ZE",
    }
];

const randomMusicBtn = document.getElementById('random-music-btn');


randomMusicBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * musicCollection.length);
    const randomMusic = musicCollection[randomIndex];
    
    randomMusicBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        randomMusicBtn.style.transform = 'scale(1)';
    }, 100);
    
    // Open random music in new tab
    window.open(randomMusic.url, '_blank');
});

// Add transition effect to random music button
randomMusicBtn.style.transition = 'transform 0.1s ease';