function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
});

// Prevent dropdown from closing when clicking inside
document.getElementById("myDropdown").addEventListener('click', function(event) {
    event.stopPropagation();
});

function getSelectedOptions() {
    var checkboxes = document.querySelectorAll('.option:checked');
    var selectedValues = Array.from(checkboxes).map(checkbox => checkbox.value);
    alert('Selected options: ' + selectedValues.join(', '));
}



function createTextBoxes() {
    // Get the selected options from the dropdown
    var selectedOptions = document.getElementById('myDropdown').selectedOptions;
    var container = document.getElementById('text-boxes-container');

    // Clear previous text boxes
    container.innerHTML = '';

    // Loop through the selected options and create text boxes
    for (var i = 0; i < selectedOptions.length; i++) {
        var textBox = document.createElement('input');
        textBox.type = 'text';
        textBox.placeholder = `Text Box for Option ${selectedOptions[i].value}`;
        container.appendChild(textBox);
        container.appendChild(document.createElement('br')); // Line break for better layout
    }
}
