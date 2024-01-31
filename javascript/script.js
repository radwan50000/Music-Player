//Music Control Start

let musicIndex = 0,
    svgPlay = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>',
    svgPause = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>',
    playPauseButton = document.getElementById("playPauseButton"),
    music = document.getElementById("music"),
    progressBar = document.getElementById("progressBar"),
    previousButton = document.getElementById("previous"),
    nextButton = document.getElementById("next"),
    audioName = document.getElementById("audioName"),
    repeat = false,
    repeatVal = 1,
    repeatButton = document.getElementById("repeat"),
    incVol = document.getElementById("incVol"),
    decVol = document.getElementById("decVol");

function selectMusic(index) {
    let theImage = document.getElementById("image");
    document.body.style.cssText = `background-image: url("${musicArray[index].image}");`;
    music.src = musicArray[index].link;
    theImage.src = musicArray[index].image;
    theImage.alt = musicArray[index].name;
    audioName.innerHTML = musicArray[index].name;
}

window.onload = () => {
    selectMusic(musicIndex);
    loadMusicList();
    getMusicIndex();
}

playPauseButton.addEventListener("click", function () {
    if (music.paused) {
        music.play();
        image.style.cssText = "animation:  5s linear 0s infinite running imageRotate;";
        playPauseButton.innerHTML = svgPause;
    } else {
        image.style.cssText = "animation:  5s linear 0s infinite paused imageRotate;";
        music.pause();
        playPauseButton.innerHTML = svgPlay;
    }
    //return the play icon after the song is end
    music.addEventListener("ended", function () {
        if (repeat) {
            music.play();
        } else {
            image.style.cssText = "animation:  5s linear 0s infinite paused imageRotate;";
            playPauseButton.innerHTML = svgPlay;
            progressBar.setAttribute("value", 0);
        }
    });
    //make the progress bar change
    music.ontimeupdate = () => {
        progressBar.setAttribute("max", music.duration)
        progressBar.setAttribute("value", music.currentTime);
    }
});

nextButton.addEventListener("click", function () {
    //change to the next song
    //make the loop of change is infininte
    musicIndex < musicArray.length - 1 ? musicIndex++ : musicIndex = 0;
    if (music.paused) {
        selectMusic(musicIndex);
        music.pause();
        playPauseButton.innerHTML = svgPlay;
    } else {
        selectMusic(musicIndex);
        music.play();
        playPauseButton.innerHTML = svgPause;
    }
});

previousButton.addEventListener("click", function () {
    //change to song previous and make sure that the iterable 
    //is infininte
    musicIndex > 0 ? musicIndex-- : (musicIndex = musicArray.length - 1);
    if (music.paused) {
        selectMusic(musicIndex);
        music.paused();
        playPauseButton.innerHTML = svgPlay;
    } else {
        selectMusic(musicIndex);
        music.play();
        playPauseButton.innerHTML = svgPause;
    }
});

incVol.addEventListener("click", function () {
    music.volume += music.volume === 1 ? 0 : 0.1;
});

decVol.addEventListener("click", function () {
    music.volume -= music.volume === 0 ? 0 : 0.1;
});

repeatButton.addEventListener("click", function () {
    //make sure that when the song is finsh start again
    repeatVal = -repeatVal;
    repeat = repeatVal < 0 ? true : false;
    if (repeat) {
        repeatButton.classList.add("repeatGreen")
    } else {
        repeatButton.classList.remove("repeatGreen")
    }
})

document.addEventListener("keydown",function(e){
    if(e.code === 'Space'){
        playPauseButton.click();
    }else if(e.code === "ArrowRight"){
        nextButton.click();
    }else if(e.code === "ArrowLeft"){
        previousButton  .click();
    }else if(e.code === "ArrowUp"){
        incVol.click();
    }else if(e.code === "ArrowDown"){
        decVol.click();
    }
});

//Music Control End

//Music List Container Start

let listArrow = document.getElementById("listArrow"),
    listArrowSVG = document.querySelector("#listArrow svg"),
    musicListContainer = document.getElementById("musicListContainer"),
    musicUOList = document.getElementById("musicUOList"),
    listActive = false,
    listActiveVal = 1;

listArrow.addEventListener("click",function(){
    listActiveVal = -listActiveVal;
    listActive = listActiveVal < 0 ? true:false;
    if(listActive){
        musicListContainer.style.cssText += "transform: translateX(0%) translateY(-50%)";
        listArrowSVG.style.rotate = "180deg";
    }else{
        musicListContainer.style.cssText += "transform: translateX(-100%) translateY(-50%)";
        listArrowSVG.style.rotate = "0deg";
    }
});

function loadMusicList(){
    for(let i=0;i<musicArray.length;i++){
        let list = document.createElement("li");
        list.textContent = musicArray[i].name;
        musicUOList.appendChild(list);
    }
}

function getMusicIndex(){
    let lists = document.querySelectorAll("#musicUOList li");
    for(let i=0;i<lists.length;i++){
        lists[i].addEventListener("click",function(){
            musicIndex = i;
            if(music.paused){
                selectMusic(musicIndex);
                music.pause();
            }else{
                selectMusic(musicIndex);
                music.play();
            }
        })
    }

}