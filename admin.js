document.addEventListener('DOMContentLoaded', () => {
    loadUserActivities();
    loadDashboard();
});

function loadUserActivities() {
    const activities = JSON.parse(localStorage.getItem('userActivities')) || [];
    const activityLog = document.getElementById('activity-log');

    activities.forEach(activity => {
        const activityElement = document.createElement('div');
        activityElement.className = 'activity';
        activityElement.innerHTML = `
            <p>${activity.user} ${activity.action} at ${activity.timestamp}</p>
            <p>${activity.details}</p>
            <button class="delete" data-id="${activity.id}">Delete</button>`;
        activityLog.appendChild(activityElement);
    });

    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', (event) => {
            const activityId = event.target.getAttribute('data-id');
            deleteActivity(activityId);
        });
    });
}

function trackActivity(user, action, details) {
    const activities = JSON.parse(localStorage.getItem('userActivities')) || [];
    const activity = {
        id: Date.now(),
        user,
        action,
        details,
        timestamp: new Date().toLocaleString()
    };
    activities.push(activity);
    localStorage.setItem('userActivities', JSON.stringify(activities));
}

function deleteActivity(activityId) {
    let activities = JSON.parse(localStorage.getItem('userActivities')) || [];
    activities = activities.filter(activity => activity.id != activityId);
    localStorage.setItem('userActivities', JSON.stringify(activities));
    document.getElementById('activity-log').innerHTML = '';
    loadUserActivities();
}

function loadDashboard() {
    document.getElementById('dashboard-refresh').addEventListener('click', () => {
        document.getElementById('activity-log').innerHTML = '';
        loadUserActivities();
    });

    // Add more admin actions as needed
}
