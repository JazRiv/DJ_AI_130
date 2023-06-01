cancion_1 = "";
izq_x = 0;
izq_y = 0;
izq_point = 0;
dere_point = 0;
dere_x = 0;
dere_y = 0;
cancion_2 = "";
estado_1 = "";
estado_2 = "";

function setup(){
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300, 300);
    video.hide();
    modelo = ml5.poseNet(video, modelocargado);
    modelo.on("pose", obtener);
}

function preload(){
    cancion_1= loadSound("as_it_was.mp3");
    cancion_2 =loadSound("never_gonna_give_you_up.mp3");
}

function draw(){
    image(video, 0, 0, 300, 300);
    estado_1 = false;
    fill("red");
    stroke("black");
    
    if (izq_point > 0.2){
        circle(izq_x, izq_y, 25);
        cancion_2.stop();

        if (estado_1 == false){
            cancion_1.play();
            document.getElementById("song_name"). innerHTML = "Esta cancion se llama: As it was";
        }
    }
    
    estado_2 = false;
    fill("blue");
    stroke("green");

    if (dere_point > 0.2){
        circle(dere_x, dere_y, 25);
        cancion_1.stop();

        if (estado_2 == false){
            cancion_2.play();
            document.getElementById("song_name").innerHTML = "Esta cancion se llama: Never gonna give you up";
        }
    }
}

function modelocargado(){
    console.log("Modelo listo");
}

function obtener(resultado){
    if (resultado.length > 0){
        console.log(resultado);
        izq_point = resultado[0].pose.keypoints[9].score;
        izq_x = resultado[0].pose.leftWrist.x;
        izq_y = resultado[0].pose.leftWrist.y;
        console.log("izquierda x " + izq_x + "izquierda y " + izq_y);

        dere_point = resultado[0].pose.keypoints[10].score;
        dere_x = resultado[0].pose.rightWrist.x;
        dere_y = resultado[0].pose.rightWrist.y;
        console.log("derecha x " + dere_x + "derecha y " + dere_y);
    }

}
