        const houseForm = document.getElementById('houseForm');
        const houseInput = document.getElementById('houseInput');
        const charactersDiv = document.getElementById('characters');

        houseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const houseName = houseInput.value.trim();

            fetch('https://hp-api.herokuapp.com/api/characters')
                .then(response => response.json())
                .then(characters => {
                    charactersDiv.innerHTML = ''; 
                    const filteredCharacters = characters.filter(character => character.house.toLowerCase() === houseName.toLowerCase());

                    if (filteredCharacters.length === 0) {
                        alert('No hemos encontrado su casa, revise que esté bien escrita');
                    } else {
                        filteredCharacters.forEach(character => {
                            const characterDiv = document.createElement('div');
                            characterDiv.classList.add('character');

                            const nameElement = document.createElement('h3');
                            nameElement.textContent = character.name;

                            const imageElement = document.createElement('img');
                            imageElement.src = character.image;
                            imageElement.alt = `Image of ${character.name}`;
                            imageElement.style.width = '100px';

                            characterDiv.appendChild(nameElement);
                            characterDiv.appendChild(imageElement);
                            charactersDiv.appendChild(characterDiv);
                        });
                    }
                })
                .catch(error => {
                    console.error('Error fetching characters:', error);
                    charactersDiv.innerHTML = 'Error fetching characters. Please try again later.';
                });

            houseInput.value = ''; // Clear input field
        });