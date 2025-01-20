document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for video upload form
    document.getElementById('upload-form').addEventListener('submit', handleVideoUpload);
    document.getElementById('video-file').addEventListener('change', previewVideo);
});

function handleVideoUpload(event) {
    event.preventDefault();
    const title = document.getElementById('video-title').value;
    const description = document.getElementById('video-description').value;
    const file = document.getElementById('video-file').files[0];

    if (!file) {
        alert('Please choose a video file');
        return;
    }

    const videoUrl = URL.createObjectURL(file);
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    const id = videos.length + 1;
    const video = { id, title, description, url: videoUrl };

    videos.push(video);
    localStorage.setItem('videos', JSON.stringify(videos));
    alert('Video uploaded successfully');

    window.location.href = 'index.html';
}

function previewVideo(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('video-preview');

    if (file) {
        const videoUrl = URL.createObjectURL(file);
        preview.src = videoUrl;
        preview.style.display = 'block';
    } else {
        preview.src = '';
        preview.style.display = 'none';
    }
      }
