        const predefinedTags = ['okay', 'bye', 'tata', 'random'];
        const selectedTags = [];

        const tagInput = document.getElementById('tag-input');
        const autocompleteList = document.getElementById('autocomplete-list');
        const selectedTagsContainer = document.getElementById('selected-tags');

        tagInput.addEventListener('focus', showAutocomplete);
        tagInput.addEventListener('input', filterTags);
        tagInput.addEventListener('blur', hideAutocomplete);

        function showAutocomplete() {
            const filteredTags = predefinedTags.filter(tag => !selectedTags.includes(tag));
            renderAutocomplete(filteredTags);
            autocompleteList.classList.remove('hidden');
        }

        function filterTags() {
            const query = tagInput.value.toLowerCase();
            const filteredTags = predefinedTags.filter(tag => tag.toLowerCase().includes(query) && !selectedTags.includes(tag));
            renderAutocomplete(filteredTags);
        }

        function hideAutocomplete() {
            setTimeout(() => autocompleteList.classList.add('hidden'), 200); // Hide after a short delay to allow tag selection
        }

        function renderAutocomplete(tags) {
            autocompleteList.innerHTML = '';
            tags.forEach(tag => {
                const tagDiv = document.createElement('div');
                tagDiv.textContent = tag;
                tagDiv.addEventListener('click', () => addTag(tag));
                autocompleteList.appendChild(tagDiv);
            });
        }

        function addTag(tag) {
            if (selectedTags.length >= 4 || selectedTags.includes(tag)) return;

            selectedTags.push(tag);
            renderTags();
            tagInput.value = '';
            showAutocomplete();
        }

        function removeTag(tag) {
            const index = selectedTags.indexOf(tag);
            if (index !== -1) {
                selectedTags.splice(index, 1);
                renderTags();
            }
        }

        function renderTags() {
            selectedTagsContainer.innerHTML = '';
            selectedTags.forEach(tag => {
                const tagEl = document.createElement('div');
                tagEl.className = 'tag';
                tagEl.textContent = tag;

                const closeEl = document.createElement('span');
                closeEl.className = 'tag-close';
                closeEl.textContent = 'x';
                closeEl.addEventListener('click', () => removeTag(tag));

                tagEl.appendChild(closeEl);
                selectedTagsContainer.appendChild(tagEl);
            });
        }
        // </div>
        // <div id="selected-tags" class="flex flex-wrap mb-4">
        //     <!-- Selected tags will appear here -->
        // </div>