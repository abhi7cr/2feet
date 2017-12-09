let i = 0
function browse() {
    document.getElementById('file').click();
}
function onFileUpload() {
    let f = document.getElementById("file");
    var fragment = document.createDocumentFragment();
    var col = document.createElement('div')
    col.id = 'col_' + i
    i++;
    col.classList.add('item');
    col.style.width = '40%'
    var label = document.createElement('span');
    label.innerText = f.files[0].name;
    col.appendChild(label)
    var video = document.createElement('video');
    video.id = 'video_' + i
    video.style.width = '90%'
    var fileURL = URL.createObjectURL(f.files[0]);
    video.src = fileURL;
    video.style.display = "block";
    col.appendChild(video)
    fragment.appendChild(col)
    document.getElementById('wrapper').appendChild(fragment)
    document.getElementById('video_' + i).setAttribute('controls', 'controls')
}
export { i, browse, onFileUpload }