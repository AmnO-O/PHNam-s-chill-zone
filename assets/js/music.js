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
    },
    {
        url : "https://www.youtube.com/watch?v=NWvYZT-HU54",
    },
    {
        url : "https://www.youtube.com/watch?v=ZXhXlffz_60",
    },
    {
        url : "https://www.youtube.com/watch?v=uWPy5-4jBSE",
    },
    {
        url: "https://www.youtube.com/watch?v=iwVdYvi66Fc",
    },
    {
        url : "https://www.youtube.com/watch?v=_hS33cHtK-E",
    },
    {
        url : "https://www.youtube.com/watch?v=HC6xx-GxlUY",
    },
    {
        url : "https://www.youtube.com/watch?v=cGJJX3L7I7I",
    },
    {
        url : "https://www.youtube.com/watch?v=r1Fx0tqK5Z4",
    },
    {
        url : "https://www.youtube.com/watch?v=9Ke4480MicU",
    },
    {
        url : "https://www.youtube.com/watch?v=DzwkcbTQ7ZE",
    },
    {
        url: "https://www.youtube.com/watch?v=N6SQ9QoSjCI&list=RDcGJJX3L7I7I&index=3",
    },
    {
        url: "https://www.youtube.com/watch?v=-CmadmM5cOk",   
    },
    {
        url: "https://www.youtube.com/watch?v=PuZQXbcuqnQ",
    },
    {
        url: "https://www.youtube.com/watch?v=n7eq3E9zE2Y",
    },
    {
        url : "https://www.youtube.com/watch?v=ZAfAud_M_mg",
    },
    {
        url : "https://www.youtube.com/watch?v=TdrL3QxjyVw",
    },
    {
        url : "https://www.youtube.com/watch?v=50VNCymT-Cs",
    },
    {
        url : "https://www.youtube.com/watch?v=H8NTALzm0F4",
    },
    {
        url : "https://www.youtube.com/watch?v=7RWbq-lbBlk",
    },
    {
        url : "https://www.youtube.com/watch?v=FvOpPeKSf_4",
    },
    {
        url : "https://www.youtube.com/watch?v=K5NEOwRXa_8",
    },
    {
        url : "https://www.youtube.com/watch?v=aDCcW_sVp9M",
    },
    {
        url : "https://www.youtube.com/watch?v=mzmjdntlRJk",
    },
    {
        url : "https://www.youtube.com/watch?v=lV0OOyDUPII",
    },
    {
        url : "https://www.youtube.com/watch?v=j3KCob5TbMk",
    },
    {
        url : "https://www.youtube.com/watch?v=W4UeUJA9wLU",
    },
    {
        url : "https://www.youtube.com/watch?v=Y7ix6RITXM0",
    },
    {
        url : "https://www.youtube.com/watch?v=sdEU-t3uEM4",
    },
    {
        url : "https://www.youtube.com/watch?v=kOCkne-Bku4",
    }
];


const randomMusicBtn = document.getElementById('random-music-btn');


randomMusicBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * musicCollection.length);
    const randomMusic = musicCollection[randomIndex];
    
    randomMusicBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        randomMusicBtn.style.transform = '';
    }, 100);
    
    // Open random music in new tab
    window.open(randomMusic.url, '_blank');
});

// Add transition effect to random music button
randomMusicBtn.style.transition = 'transform 0.1s ease';