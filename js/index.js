// just for audio

var audio = document.getElementById("requiem"),
    flag = 1;

$('body').click(function() {
    if (flag == 1){
        flag = 0;
        audio.pause();
    } else {
        flag = 1;
        audio.play();
    }
});
