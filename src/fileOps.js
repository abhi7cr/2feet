import { getUserInfo } from './login'
let i = 0
function browse() {
    document.getElementById('file').click();
}
function onFileUpload(dbVideo) {
    var fragment = document.createDocumentFragment();
    var col = document.createElement('div')
    //Preview Mode
    if (!dbVideo) {
        let f = document.getElementById("file");
        var fileURL = URL.createObjectURL(f.files[0])
        col.id = 'colPreview'
        col.classList.add('item');
        col.style.width = '100%'
        var label = document.createElement('span');
        label.innerText = 'Preview: ' + f.files[0].name;
        col.appendChild(label)
        var video = document.createElement('video');
        video.id = 'videoPreview'
        video.style.width = '50%'
        video.style.alignSelf = 'center'
        video.src = fileURL;
        video.style.display = "block";
        var btn = document.createElement('button')
        btn.addEventListener('click', uploadToFirebase)
        btn.id = 'uploadBtn'
        btn.classList.add('uploadBtn')
        btn.innerText = 'Upload'
        col.appendChild(btn)
        col.appendChild(video)
        fragment.appendChild(col)
        document.getElementById('wrapper').appendChild(fragment)
        document.getElementById('videoPreview').setAttribute('controls', 'controls')
    }
    //Uploaded videos
    else {
        col.id = 'col_' + i
        col.classList.add('item');
        col.style.width = '40%'
        var label = document.createElement('span');
        label.innerText = dbVideo.name;
        col.appendChild(label)
        var video = document.createElement('video');
        video.id = 'video_' + i
        video.style.width = '90%'
        video.src = dbVideo.url;
        video.style.display = "block";
        col.appendChild(video)
        fragment.appendChild(col)
        document.getElementById('wrapper').appendChild(fragment)
        document.getElementById('video_' + i).setAttribute('controls', 'controls')
        i++;
    }
}
function uploadToFirebase(e) {
    var uid = getUserInfo().uid;
    var f = document.getElementById("file").files[0];
    // Create a root reference
    var storageRef = firebase.storage().ref();
    var videoRef = storageRef.child(uid + '/' + f.name);
    videoRef.put(f).then(function (snapshot) {
        console.log('Uploaded a blob or file!');
        alert('file uploaded successfully!')
        // Initialize Cloud Firestore through Firebase
        var db = firebase.firestore();
        db.collection("videos_" + uid).add({
            url: snapshot.downloadURL,
            name: f.name,
            uid: uid
        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    });
}
function removeContainer() {
    let container = document.getElementById("wrapper");
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
}
function getAllVideos() {
    i = 0
    removeContainer()
    var user = getUserInfo()
    var db = firebase.firestore();
    var docRef = db.collection("videos_" + user.uid);
    docRef.where('uid', '==', user.uid).get().then(function (querySnapshot) {
        querySnapshot.forEach(doc => {
            onFileUpload(doc.data())
        })
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
    // Create a reference with an initial file path and name
    var storage = firebase.storage();
    var ref = storage.ref(user.uid);
    re
}
export { i, browse, onFileUpload, uploadToFirebase, getAllVideos }