song_1 = "";
song_2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

leftWristscore = 0;

song_status = "";

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modalLoded);
    poseNet.on("pose",gotPoses);
}

function preload(){
    song_1 = loadSound("im-a-mess.mp3");
    song_2 = loadSound("the-middle.mp3");
}

function modalLoded(){
    console.log("modal has Loaded");
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);

        leftWristscore = results[0].pose.keypoints[9].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist x = "+leftWristX+ "Left Wrist y = " +leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist x = "+rightWristX + "Right Wrist y = " +rightWristY);
    }
}

function draw(){
    image(video,0,0,600,500);

    fill("#9F2B68");
    stroke("#9F2B68");

    song_1_status = song_1.isPlaying();
    console.log("im a mess" + song_1_status);

    if (leftWristscore > 0.2){
        console.log("left");
        circle(leftWristX,leftWristY,20);
        song_2.stop();

        if (song_1_status == "false"){
            console.log("song 1 is playing");
            song_1.play();
            document.getElementById("song_name").innerHTML = "Song Name - Im a Mess by Bebe Rhexa"
        }
    }
    
}