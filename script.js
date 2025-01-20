document.addEventListener('DOMContentLoaded', () => {
    // Load video feed
    loadVideoFeed();

    // Add event listeners for video autoplay and pause
    window.addEventListener('scroll', handleScroll);

    // Add event listeners for like buttons
    const likeButtons = document.querySelectorAll('.video-actions button.like');
    likeButtons.forEach(button => {
        button.addEventListener('click', handleLike);
    });

    // Initialize likes from local storage
    initializeLikes();
});

function loadVideoFeed() {
    const videoFeed = document.getElementById('video-feed');
    // Fetch and display videos (mock data for now)
    const videos = [
        { id: 1, title: 'Video 1', url: 'placeholder-video1.mp4' },
        { id: 2, title: 'Video 2', url: 'placeholder-video2.mp4' }
    ];
    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.className = 'video-container';
        videoElement.innerHTML = `
            <video src="${video.url}" controls muted loop></video>
            <div class="video-actions">
                <button class="like">Like (<span class="like-count">${getLikeCount(video.id)}</span>)</button>
                <button>Comment</button>
                <button>Share</button>
            </div>`;
        videoFeed.appendChild(videoElement);
    });
}

function handleScroll() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (isElementInViewport(video)) {
            video.play();
        } else {
            video.pause();
        }
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleLike(event) {
    const button = event.target;
    const videoContainer = button.closest('.video-container');
    const videoId = Array.from(videoContainer.parentNode.children).indexOf(videoContainer) + 1;
    const likeCountSpan = button.querySelector('.like-count');
    let likeCount = parseInt(likeCountSpan.textContent, 10);

    // Increment like count
    likeCount++;
    likeCountSpan.textContent = likeCount;

    // Save like count in local storage
    saveLikeCount(videoId, likeCount);
}

function saveLikeCount(videoId, likeCount) {
    let likes = JSON.parse(localStorage.getItem('likes')) || {};
    likes[videoId] = likeCount;
    localStorage.setItem('likes', JSON.stringify(likes));
}

function getLikeCount(videoId) {
    let likes = JSON.parse(localStorage.getItem('likes')) || {};
    return likes[videoId] || 0;
}

function initializeLikes() {
    const likeButtons = document.querySelectorAll('.video-actions button.like');
    likeButtons.forEach((button, index) => {
        const likeCount = getLikeCount(index + 1);
        const likeCountSpan = button.querySelector('.like-count');
        likeCountSpan.textContent = likeCount;
    });
}
