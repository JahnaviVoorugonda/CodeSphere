
// script.js
document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdownContent = document.querySelector('.dropdown-content');
    const themeToggle = document.getElementById('theme-toggle');

    dropdownButton.addEventListener('click', function() {
        dropdownContent.classList.toggle('show');
    });

    themeToggle.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor behavior
        document.body.classList.toggle('dark-mode');
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', function(event) {
        if (!event.target.closest('.dropdown-button')) {
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        }
    });
});
