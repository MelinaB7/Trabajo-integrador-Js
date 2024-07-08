document.addEventListener('DOMContentLoaded', () => {
    const dataForm = document.getElementById('dataForm');
    const dataInput = document.getElementById('dataInput');
    const dataList = document.getElementById('dataList');
    const fetchDataBtn = document.getElementById('fetchData');
    const externalDataDiv = document.getElementById('externalData');

    let data = JSON.parse(localStorage.getItem('data')) || [];

    const renderData = () => {
        dataList.innerHTML = '';
        data.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.addEventListener('click', () => {
                data.splice(index, 1);
                localStorage.setItem('data', JSON.stringify(data));
                renderData();
            });
            li.appendChild(deleteBtn);
            dataList.appendChild(li);
        });
    };

    dataForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newData = dataInput.value;
        data.push(newData);
        localStorage.setItem('data', JSON.stringify(data));
        dataInput.value = '';
        renderData();
    });

    fetchDataBtn.addEventListener('click', () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                externalDataDiv.innerHTML = '<h2>Datos Externos</h2>';
                json.slice(0, 5).forEach(post => {
                    const p = document.createElement('p');
                    p.textContent = `${post.title}: ${post.body}`;
                    externalDataDiv.appendChild(p);
                });
            });
    });

    renderData();
});
