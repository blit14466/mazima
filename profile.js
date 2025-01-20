document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile();
    loadUserVideos();
});

function loadUserProfile() {
    const username = localStorage.getItem('username') || 'User123';
    const email = localStorage.getItem('email') || 'user@example.com';
    const bio = localStorage.getItem('bio') || 'This is a sample bio.';
    const profilePic = localStorage.getItem('profilePic') || 'profile-pic.jpg';

    document.getElementById('username').textContent = username;
    document.getElementById('email').textContent = email;
    document.getElementById('bio').textContent = bio;
    document.getElementById('profile-pic').src = profilePic;

    document.getElementById('edit-profile').addEventListener('click', () => {
        toggleEditProfile();
    });

    document.getElementById('profile-pic').addEventListener('click', () => {
        document.getElementById('profile-pic-upload').click();
    });

    document.getElementById('profile-pic-upload').addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profile-pic').src = e.target.result;
            localStorage.setItem('profilePic', e.target.result);
        };
        reader.readAsDataURL(file);
    });
}

function toggleEditProfile() {
    const bioElement = document.getElementById('bio');
    const bioEditElement = document.getElementById('bio-edit');
    const editButton = document.getElementById('edit-profile');

    if (bioEditElement.style.display === 'none') {
        bioEditElement.value = bioElement.textContent;
        bioElement.style.display = 'none';
        bioEditElement.style.display = 'block';
        editButton.textContent = 'Save';
    } else {
        bioElement.textContent = bioEditElement.value;
        bioElement.style.display = 'block';
        bioEditElement.style.display = 'none';
        editButton.textContent = 'Edit';
        localStorage.setItem('bio', bioEditElement.value);
    }
}

function loadUserVideos() {
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    const videoGrid = document.getElementById('video-grid');

    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.className = 'video-container';
        videoElement.innerHTML = `
            <video src="${video.url}" controls muted loop></video>
            <div class="video-info">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
                <button class="delete-video" data-id="${video.id}">Delete</button>
            </div>`;
        videoGrid.appendChild(videoElement);
    });

    document.querySelectorAll('.delete-video').forEach(button => {
        button.addEventListener('click', (event) => {
            const videoId = event.target.getAttribute('data-id');
            deleteVideo(videoId);
        });
    });
}

function deleteVideo(videoId) {
    let videos = JSON.parse(localStorage.getItem('videos')) || [];
    videos = videos.filter(video => video.id != videoId);
    localStorage.setItem('videos', JSON.stringify(videos));
    document.getElementById('video-grid').innerHTML = '';
    loadUserVideos();
}
