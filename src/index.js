document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-guest-form');
    const guestNameInput = document.getElementById('guest-name');
    const guestCategorySelect = document.getElementById('guest-category');
    const guestList = document.getElementById('guest-list');
    const MAX_GUESTS = 10;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (guestList.children.length >= MAX_GUESTS) {
            alert("The guest list is full (maximum 10 guests).");
            return;
        }

        const guestName = guestNameInput.value.trim();
        const guestCategory = guestCategorySelect.value;

        if (guestName === "") {
            alert("Please enter a guest name.");
            return;
        }

        const listItem = document.createElement('li');
        listItem.dataset.category = guestCategory;

        const nameAndTimestampWrapper = document.createElement('div');
        nameAndTimestampWrapper.classList.add('name-timestamp-wrapper');

        const guestNameSpan = document.createElement('span');
        guestNameSpan.textContent = guestName;
        guestNameSpan.classList.add('guest-name-span');
        nameAndTimestampWrapper.appendChild(guestNameSpan);

        const addedTime = new Date();
        const timeString = addedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const timestampSpan = document.createElement('span');
        timestampSpan.textContent = `Added: ${timeString}`;
        timestampSpan.classList.add('timestamp-span');
        nameAndTimestampWrapper.appendChild(timestampSpan);

        listItem.appendChild(nameAndTimestampWrapper);

        const categoryTag = document.createElement('span');
        categoryTag.textContent = guestCategory;
        categoryTag.classList.add('category-tag');
        categoryTag.classList.add(`category-${guestCategory.toLowerCase()}`);
        listItem.appendChild(categoryTag);

        // Buttons Wrapper
        const buttonsWrapper = document.createElement('div');
        buttonsWrapper.classList.add('buttons-wrapper'); // Add class for styling

        // Edit Button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', function() {
            // guestNameSpan contains the actual name, timestampSpan is a sibling.
            const currentName = guestNameSpan.textContent;
            const newName = prompt("Edit guest name:", currentName);
            if (newName && newName.trim() !== "") {
                guestNameSpan.textContent = newName.trim();
                // Note: If RSVP color was applied, it will persist on the new name. This is generally fine.
            }
        });
        buttonsWrapper.appendChild(editButton);

        const rsvpButton = document.createElement('button');
        rsvpButton.textContent = 'RSVP: Not Attending';
        rsvpButton.classList.add('rsvp-button');
        listItem.dataset.rsvp = 'Not Attending';
        rsvpButton.addEventListener('click', function() {
            if (listItem.dataset.rsvp === 'Not Attending') {
                listItem.dataset.rsvp = 'Attending';
                rsvpButton.textContent = 'RSVP: Attending';
                guestNameSpan.style.color = 'green';
            } else {
                listItem.dataset.rsvp = 'Not Attending';
                rsvpButton.textContent = 'RSVP: Not Attending';
                guestNameSpan.style.color = 'red';
            }
        });
        buttonsWrapper.appendChild(rsvpButton);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', function() {
            guestList.removeChild(listItem);
        });
        buttonsWrapper.appendChild(removeButton);

        listItem.appendChild(buttonsWrapper);

        guestList.appendChild(listItem);
        guestNameInput.value = '';
    });
});
