prediction1 = ""
prediction2 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

Webcam.attach("#camera")

function cap_picture() {
    Webcam.snap(function(picture){
        document.getElementById("snapshot").innerHTML = "<img id='captureimg' src ='" +picture+"'>"
    })
}
console.log("ml5 version:", ml5.version)

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/-EW6nieB4/model.json", modelLoaded)

function modelLoaded() {
    console.log("Model Loaded")
}

function speaking() {
    var synth = window.speechSynthesis
    data1 ="the first prediction is "+ prediction1
    data2 ="and the second prediction is"+ prediction2
    var final = new SpeechSynthesisUtterance(data1 + data2)
    synth.speak(final)
}

function pre_image() {
    var img1 = document.getElementById("captureimg")
    classifier.classify(img1, gotresults)
}

function gotresults(error, results) {
    if (error) {
        console.error(error)
    }
    else {
        console.log(results)

        document.getElementById("emotion_name").innerHTML = results[0].label
        document.getElementById("emotion_name2").innerHTML = results[1].label

        prediction1 = results[0].label
        prediction2 = results[1].label

        speaking()

        if (results[0].label == "Happy") {
            document.getElementById("emoji_name").innerHTML = "&#128513;"
        }
        if (results[0].label == "Sad") {
            document.getElementById("emoji_name").innerHTML = "&#128542;"
        }
        if (results[0].label == "Angry") {
            document.getElementById("emoji_name").innerHTML = "&#128544;"
        }
        if (results[0].label == "Crying") {
            document.getElementById("emoji_name").innerHTML = "&#128557;"
        }
        if (results[1].label == "Happy") {
            document.getElementById("emoji_name2").innerHTML = "&#128513;"
        }
        if (results[1].label == "Sad") {
            document.getElementById("emoji_name2").innerHTML = "&#128542;"
        }
        if (results[1].label == "Angry") {
            document.getElementById("emoji_name2").innerHTML = "&#128544;"
        }
        if (results[1].label == "Crying") {
            document.getElementById("emoji_name2").innerHTML = "&#128557;"
        }
    }
}