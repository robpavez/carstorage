
let update = document.getElementById('update');

document.getElementById('form').addEventListener('submit', createCar);

// document.getElementById('edit').addEventListener('click',showEditModal);
function showEditModal(i) {
    document.getElementById('update').style.display = 'flex';
    console.log(i);
    updateCar(i);

}

function closeEditModal() {
    document.getElementById('update').style.display = 'none';
    
}

function createCar(e) {//seleciona los tag con sus respecivos valores ingresados del archivo html
    
    let name = document.getElementById('name').value
    let model = document.getElementById('model').value
    let doors = document.getElementById('doors').value
    let color = document.getElementById('color').value
    let brand = document.getElementById('brand').value

    const car = {//objeto listo
        name,
        model,
        doors,
        color,
        brand,
    }

    if (localStorage.getItem('cars')===null){//si el auto es nulo
        let cars = [];//entonces dejar el array vacio
        cars.push(car);//si no es asi meter en el arregla cars vacio los datos del arreglo car de arriba
        localStorage.setItem('cars',JSON.stringify(cars));
    } else {
        let cars = JSON.parse(localStorage.getItem('cars'));
        cars.push(car)
        localStorage.setItem('cars',JSON.stringify(cars))
    }

    readCars();
    document.getElementById('form').reset();//funcion reset,contiene el metodo preventDefault para evitar un comportamiento por defecto
    e.preventDefault();
}

function readCars() {
    let cars = JSON.parse(localStorage.getItem('cars'));
    let renderCar = document.getElementById('cars');
    
    renderCar.innerHTML = '';

    if (cars !== null) {
        for (let i = 0; i < cars.length; i++) {
            let {name,model,doors,brand,color} = cars[i]
            renderCar.innerHTML += `
            <div class="car">
                <div class="header">
                    <h3 class="name">${name}</h3>
                    <ul class="info">
                        <li><span>Brand:</span>${brand}</li>
                        <li><span>Model:</span>${model}</li>
                        <li><span>Doors:</span>${doors}</li>
                        <li><span>Color: </span>${color}</li>
                    </ul>
                </div>
                <div class="options">
                    <i class="fas fa-edit" onclick="showEditModal(${i})" style="color:#6c757d;"></i>
                    <i class="fas fa-trash-alt" onclick="deleteCar('${i}')" style="color:#dc3545;"></i>
                </div>
            </div> `;
        }
    }

}

function updateCar(i) {
    let cars = JSON.parse(localStorage.getItem('cars'));

    update.innerHTML = `
    <form action="" method="POST" id="updateForm" class="update-form">
            <h2>Edit Car</h2>
            <div class="update-container">
                <input type="text" required id="NewName" value="${cars[i].name}">
                <input type="text" required id="NewModel" value="${cars[i].model}">
                <input type="text" required id="NewBrand" value="${cars[i].brand}">
                <input type="text" required id="NewColor" value="${cars[i].color}">
                <input type="text" required id="NewDoors" value="${cars[i].doors}">
            </div>
            <button type="submit">Update</button>
            <a href="" onclick="closeEditModal()">Close</a>
        </form>
    `;
    document.getElementById('updateForm').addEventListener('submit', (e) => {
        let car = cars[i];
        console.log(car);
        car.name =  document.getElementById('NewName').value
        car.model = document.getElementById('NewModel').value
        car.doors = document.getElementById('NewDoors').value
        car.color = document.getElementById('NewColor').value
        car.brand = document.getElementById('NewBrand').value

        cars[i] = car;
        localStorage.setItem('cars',JSON.stringify(cars))
        // update.innerHTML = '';
        readCars();
        console.log(cars[i]);
        e.preventDefault();
        closeEditModal();
    });
}

function deleteCar(i) {
    let cars = JSON.parse(localStorage.getItem('cars'));
    cars.splice(i,1)
    localStorage.setItem('cars',JSON.stringify(cars));
    readCars()
}



readCars();