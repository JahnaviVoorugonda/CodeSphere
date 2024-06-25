document.addEventListener('DOMContentLoaded', function() {
    const descriptionTextarea = document.getElementById('description');
    const charCountSmall = document.getElementById('descrip');

    descriptionTextarea.addEventListener('input', function() {
        const charCount = descriptionTextarea.value.length;
        charCountSmall.textContent = `${charCount} characters`;
    });
});