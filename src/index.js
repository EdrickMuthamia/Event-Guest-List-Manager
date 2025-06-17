document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-guest-form');
    const guestList = document.getElementById('guest-list');
    const guestNameInput = document.getElementById('guest-name');
    const guestCategorySelect = document.getElementById('guest-category');
    const MAX_GUESTS = 10;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (guestList.children.length >= MAX_GUESTS) {
            alert('Guest list is full! Maximum 10 guests allowed.');
            return;
        }

        const name = guestNameInput.value.trim();
        const category = guestCategorySelect.value;

        // Only allow letters and spaces in the name
        if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
            alert('Please enter a valid guest name (letters and spaces only).');
            guestNameInput.value = '';
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = `${name} (${category}) `;

        // RSVP button
        const rsvpBtn = document.createElement('button');
        rsvpBtn.textContent = 'Not Attending';
        rsvpBtn.onclick = function () {
            if (rsvpBtn.textContent === 'Not Attending') {
                rsvpBtn.textContent = 'Attending';
            } else {
                rsvpBtn.textContent = 'Not Attending';
            }
        };

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = function () {
            const newName = prompt('Edit guest name:', name);
            if (newName && /^[a-zA-Z\s]+$/.test(newName.trim())) {
                li.firstChild.textContent = `${newName.trim()} (${category}) `;
            } else if (newName !== null) {
                alert('Please enter a valid guest name (letters and spaces only).');
            }
        };

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => li.remove();

        // Add buttons to list item
        li.appendChild(rsvpBtn);
        li.appendChild(editBtn);
        li.appendChild(removeBtn);

        // Add to guest list
        guestList.appendChild(li);

        // Reset form
        guestNameInput.value = '';
        guestCategorySelect.value = '';
    });
});