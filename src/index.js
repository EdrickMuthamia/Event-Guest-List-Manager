document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-guest-form');
    const guestList = document.getElementById('guest-list');
    const guestNameInput = document.getElementById('guest-name');
    const guestCategorySelect = document.getElementById('guest-category');
    const MAX_GUESTS = 10;


    function getCategoryColor(category) {
        switch (category) {
            case 'Friend': return '#007bff';
            case 'Family': return '#28a745';
            case 'Colleague': return '#ffc107';
            default: return '#ccc';
        }
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

    
        if (guestList.children.length >= MAX_GUESTS) {
            alert('Guest list is full! Maximum 10 guests allowed.');
            return;
        }

        const name = guestNameInput.value.trim();
        const category = guestCategorySelect.value;

        if (name && category) {
            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.alignItems = 'center';
            li.style.justifyContent = 'space-between';

        
            const infoDiv = document.createElement('div');
            infoDiv.style.display = 'flex';
            infoDiv.style.alignItems = 'center';

            
            const catTag = document.createElement('span');
            catTag.textContent = category;
            catTag.style.background = getCategoryColor(category);
            catTag.style.color = '#fff';
            catTag.style.borderRadius = '4px';
            catTag.style.padding = '2px 8px';
            catTag.style.marginRight = '8px';
            catTag.style.fontSize = '0.9em';

        
            const nameSpan = document.createElement('span');
            nameSpan.textContent = name;
            nameSpan.style.fontWeight = 'bold';
            nameSpan.style.marginRight = '8px';

        
            const timeSpan = document.createElement('span');
            timeSpan.textContent = new Date().toLocaleTimeString();
            timeSpan.style.fontSize = '0.8em';
            timeSpan.style.color = '#888';
            timeSpan.style.marginLeft = '8px';

            infoDiv.appendChild(catTag);
            infoDiv.appendChild(nameSpan);
            infoDiv.appendChild(timeSpan);

        
            const rsvpBtn = document.createElement('button');
            rsvpBtn.textContent = 'Not Attending';
            rsvpBtn.style.marginLeft = '10px';
            rsvpBtn.style.background = '#dc3545';
            rsvpBtn.style.color = '#fff';
            
            rsvpBtn.onclick = function () {
                if (rsvpBtn.textContent === 'Not Attending') {
                    rsvpBtn.textContent = 'Attending';
                    rsvpBtn.style.background = '#28a745';
                } else {
                    rsvpBtn.textContent = 'Not Attending';
                    rsvpBtn.style.background = '#dc3545';
                }
            };

        
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.style.marginLeft = '10px';
            editBtn.onclick = function () {
                const newName = prompt('Edit guest name:', nameSpan.textContent);
                if (newName && newName.trim() !== '') {
                    nameSpan.textContent = newName.trim();
                }
            };

        
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.style.marginLeft = '10px';
            removeBtn.style.background = '#888';
            removeBtn.style.color = '#fff';
            removeBtn.style.cursor = 'pointer';
            removeBtn.onclick = () => li.remove();

            li.appendChild(infoDiv);
            li.appendChild(rsvpBtn);
            li.appendChild(editBtn);
            li.appendChild(removeBtn);
            guestList.appendChild(li);

            guestNameInput.value = '';
            guestCategorySelect.value = '';
        }
    });
});