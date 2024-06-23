document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(`tab-${tab.id.split('-')[2]}`).classList.add('active');
        });
    });

    // Get user score from your application (replace this with your actual implementation)
    const userScore = getUserScore(); // Call your function to get the user score
    // Call updateBadges function with the user score to initially hide the badges
    updateBadges(userScore);
});

// Assume badgeData is obtained dynamically, either from an API or stored data
const badgeData = [
    { type: "gold", name: "Gold Badge", threshold: 100 },
    { type: "silver", name: "Silver Badge", threshold: 75 },
    { type: "bronze", name: "Bronze Badge", threshold: 50 }
];

// Function to update badges dynamically after the user scores them
function updateBadges(userScore) {
    const badgesEarned = document.getElementById('badges-earned');
    // Clear previous badges
    badgesEarned.innerHTML = '';

    // Loop through badge data and create badge elements if user score meets the threshold
    badgeData.forEach(badge => {
        // Check if user score meets the threshold for displaying this badge
        if (userScore >= badge.threshold) {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = `${badge.type}_badge.png`; // Assume badge images are named like gold_badge.png, silver_badge.png, etc.
            img.alt = `${badge.type} Badge`;
            img.classList.add('badge-icon');
            li.appendChild(img);
            li.appendChild(document.createTextNode(badge.name));
            badgesEarned.appendChild(li);
        }
    });
}

// This is just a placeholder function. You need to replace it with your actual implementation to get the user score.
function getUserScore() {
    // Implement your logic to fetch the user score from your application/database
    // For example, you might retrieve it via AJAX request or from local storage
    // Return the actual user score here
    return 0; // Initial score
}

// Call updateBadges function when a user earns a new badge
// For demonstration purposes, let's call it with a sample score
updateBadges(80); // Replace 80 with the actual score earned when a user gets a new badge