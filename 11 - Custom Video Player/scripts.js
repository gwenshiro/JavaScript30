
/* Get out the elements */
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

/* Build out the functions */

function togglePlay() { /* At this stage, we have to console togglePlay() and it will play the video. Remember, the buttons are not hooked up to event listeners yet */
    if(video.paused) { /*paused exists on the video itself, and will check if the video is paused*/
        video.play();
    } else {
        video.pause();
    }

    /*another method is to do this: 
    const method = video.paused ? 'play' : 'pause';
    video[method](); */

}

    /*Toggle Play/Pause Button*/
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚'; /* when the video is playing, change the icon to the pause icon and vice versa */
    toggle.textContent = icon; /* change the text content of the toggle button to the icon */
}

    /*Skip Buttons*/
function skip() {
    /* data-skip skips the data by the value. you can put it on anything, such as video or image */
    console.log("Skipping!")
    video.currentTime += parseFloat(this.dataset.skip); /* this will add the data-skip value of the button that is clicked onto the current video time, making it skip forward or backward depending. because it is a string, we have to parseFloat it to convert it to a floating value to be deducted from the currentTime */
}

    /*Range Sliders*/
function handleRangeUpdate() {
    video[this.name] = this.value; /* the values are named volume and playback rate, which is the exact property name to change the values for the video. hence, we can just use this.name to adjust the value */
    // console.log(this.name) 
    // console.log(this.value)
}

function handleProgress() { 
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
} /* after writing this, the progress bar still doesn't update. we can make it update by listening for the video to create an event called time update, then we update the progress bar accordingly */

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth)*video.duration; /*offSetWidth gives us the width value of the progress bar*/
    video.currentTime = scrubTime;
    // console.log(e)
}

function fullScreen(){
    // console.log("FULLSCREEN BIJ");- event works, let's try to make it full screen
    if (player.classList.contains('videoFull')) {
    player.classList.remove("videoFull")
    } else {
    player.classList.add("videoFull")
    }
}

/* Hook up to event listeners */

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay); /* adding the togglePlay function to work when clicking on the video itself or on the play button . at this point, you may notice that the play button does not change to a pause button. to do this, we need to edit the textContent when the video is paused. however, instead of adding it to the if statement in togglePlay, we can try to listen for the video, and if the video stops playing, we change the textContent */

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

video.addEventListener('timeupdate', handleProgress);


progress.addEventListener('click', scrub)
/*progress.addEventListener('mousemove', scrub) - in this case, whatever mouse movement is done of the progress bar will cause the scrubbing. Hence, to prevent that, we create a flag variable (similar to the canvas exercise), where we set a variable to be false and only when the mouse is clicked down, the variable will be set to true and the function will fire */

let mousedown = false; 
progress.addEventListener('mousemove', (e) => mousedown ? scrub(e):false); 
/* progress.addEventListener('mousemove', (e) => mousedown && scrub(e) - this is another method, if the mousedown is true, then it will move on to run the scrub. basically, 'abusing' the fact that && will check if the first condition is true before checking the second condition */

progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullscreen.addEventListener('click', fullScreen)