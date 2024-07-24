console.log("\n\n\nTrains");



const EventEmitter = require('events');
const http = require('http');


const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

class Train extends EventEmitter {
    constructor(name) {
        super();
        this.name = name;
        this.fuel = 0;
        this.speed = 0;
        this.distance = 0;
        this.passengers = 0;
        this.cars = 0;
        this.cargo = 0;
        this.route = [];
        this.stops = [];
        this.stations = [];
        this.fuelflow = [];
        // this.on('newListener', (event, listener) => {
        //     console.log('Event: ' + event);
        // });
        this.on('start', () => {
            console.log('Train started');
        });
        this.on('stop', () => {
            console.log('Train stopped');
        });
        this.on('accelerate', function () {
            this.fuel -= 10;
            console.log('Train accelerated');
        });


        this.on('addFuel', async function () {
            console.log('Fueling train');
            const fuelCapacity = 150000; // 15000 liters
            let fueling = 970; // 1000 liters per cycle
            setImmediate(async () => {
                while (this.fuel <= fuelCapacity) {
                    await waitFor(5);
                    const genratedFuel = Number(((Math.random() * fueling) + 359).toFixed(2));
                    const progressPercentage = (this.fuel / fuelCapacity) * 100;
                    const remaining = (fuelCapacity - this.fuel.toFixed(2));
                    if (this.fuel + genratedFuel > fuelCapacity) {
                        this.fuel = fuelCapacity;
                        console.log(this.name, ' Fueling: ' + this.fuel.toFixed(2) + ' liters ', progressPercentage.toFixed(2) + '%', 'Remaining: ' + remaining + ' liters');
                        break;
                    } else {
                        this.fuel += genratedFuel;
                        console.log(this.name, ' Fueling: ' + this.fuel.toFixed(2) + ' liters ', progressPercentage.toFixed(2) + '%', 'Remaining: ' + remaining + ' liters');
                    }
                    // this.fuelflow.push(genratedFuel);
                }
                console.log(this.name, ' Fueling complete');
            });
        });
        this.on('addPassenger', function () {
            console.log('Passenger added');
        });

        this.on('addCar', function () {
            console.log('Car added');
        });

        this.on("getFuelFlow", function () {
            console.log('Fuel Flow: ' + this.fuelflow);
        });

        this.on('addCargo', function () {
            console.log('Cargo added');
        });

        this.on('addRoute', function () {
            console.log('Route added');
        });

        this.on('addStop', function () {
            console.log('Stop added');
        });
        console.log(this);
    }

    // methods
    start() {
        this.emit('start');
    }
    stop() {
        console.log("Train stopped");
        this.emit('stop');
    }
    accelerate() {
        console.log("Train accelerated");
        this.emit('accelerate');
    }
    decelerate() {
        console.log("Train decelerated");
        this.emit('decelerate');
    }
    addFuel() {
        this.emit('addFuel');
    }
    removeFuel() {
        this.emit('removeFuel');
    }
    addPassenger(passengers) {
        this.passengers += passengers;
        console.log("Passengers added: " + passengers);
        this.emit('addPassenger');
    }
    removePassenger(passengers) {
        this.passengers -= passengers;
        console.log("Passengers removed: " + passengers);
        this.emit('removePassenger');
    }
    addCar(cars) {
        this.cars += cars;
        console.log("Cars added: " + cars);
        this.emit('addCar');
    }
    removeCar(cars) {
        this.cars -= cars;
        console.log("Cars removed: " + cars);
        this.emit('removeCar');
    }
    addCargo(cargo) {
        this.cargo += cargo;
        console.log("Cargo added: " + cargo);
        this.emit('addCargo');
    }
    removeCargo(cargo) {
        this.cargo -= cargo;
        console.log("Cargo removed: " + cargo);
        this.emit('removeCargo');
    }
    addRoute(route) {
        this.route.push(route);
        console.log("Route added: " + route);
        this.emit('addRoute');
    }
    removeRoute(route) {
        this.route.pop(route);
        console.log("Route removed: " + route);
        this.emit('removeRoute');
    }
    addStop(stop) {
        this.stops.push(stop);
        console.log("Stop added: " + stop);
        this.emit('addStop');
    }
    removeStop(stop) {
        this.stops.pop(stop);
        console.log("Stop removed: " + stop);
        this.emit('removeStop');
    }
    addStation(station) {
        this.stations.push(station);
        console.log("Station added: " + station);
        this.emit('addStation');
    }
    removeStation(station) {
        this.stations.pop(station);
        console.log("Station removed: " + station);
        this.emit('removeStation');
    }
    // getters
    getFuel() {
        console.log("Fuel: " + this.fuel);
        this.emit('getFuel');
    }
    getSpeed() {
        console.log("Speed: " + this.speed);
        this.emit('getSpeed');
    }
    getDistance() {
        console.log("Distance: " + this.distance);
        this.emit('getDistance');
    }
    getPassengers() {
        console.log("Passengers: " + this.passengers);
        this.emit('getPassengers');
    }
    getCars() {
        console.log("Cars: " + this.cars);
        this.emit('getCars');
    }
    getCargo() {
        console.log("Cargo: " + this.cargo);
        this.emit('getCargo');
    }
    getRoute() {
        console.log("Route: " + this.route);
        this.emit('getRoute');
    }
    getStops() {
        console.log("Stops: " + this.stops);
        this.emit('getStops');
    }
    getStations() {
        console.log("Stations: " + this.stations);
        this.emit('getStations');
    }
    getFuelFlow() {
        console.log("Fuel Flow: " + this.fuelflow);
        this.emit('getFuelFlow');
    }
}


const trains = new Array(4).fill(0);


trains.forEach((train, index) => {
    trains[index] = new Train('Train ' + index);
});


// create rest server
http.createServer(async (req, res) => {
    // routes
    if (req.url === '/start') {
        trains.map(train => train.start());
        res.end('Train started');
    } else if (req.url === '/stop') {
        trains.map(train => train.stop());
        res.end('Train stopped');
    } else if (req.url === '/accelerate') {
        trains.map(train => train.accelerate());
        res.end('Train accelerated');
    }
    // create train
    else if (req.url === '/create') {
        trains.push(new Train('Train ' + trains.length));
        res.end('Train created');
    }
    // add fuel
    else if (req.url === '/addFuel') {
        trains.map(train => train.addFuel());
        res.end('Fuel added');
    }
    // get fuel
    else if (req.url === '/getFuel') {
        trains.map(train => train.getFuel());
        res.end('Fuel');
    }
    // add passenger
    else if (req.url === '/addPassenger') {
        trains.map(train => train.addPassenger(1));
        res.end('Passenger added');
    }
    // get passenger
    else if (req.url === '/getPassengers') {
        trains.map(train => train.getPassengers());
        res.end('Passengers');
    }
    // add car
    else if (req.url === '/addCar') {
        trains.map(train => train.addCar(1));
        res.end('Car added');
    }
    // get car
    else if (req.url === '/getCars') {
        trains.map(train => train.getCars());
        res.end('Cars');
    }
    // add cargo
    else if (req.url === '/addCargo') {
        trains.map(train => train.addCargo(1));
        res.end('Cargo added');
    }
    // get cargo
    else if (req.url === '/getCargo') {
        trains.map(train => train.getCargo());
        res.end('Cargo');
    } else if (req.url === '/addRoute') {
        trains.map(train => train.addRoute('A'));
        res.end('Route added');
    }
    // get route
    else if (req.url === '/getRoute') {
        trains.map(train => train.getRoute());
        res.end('Route');
    }
    // add stop
    else if (req.url === '/addStop') {
        trains.map(train => train.addStop('A'));
        res.end('Stop added');
    }
    // get stop
    else if (req.url === '/getStops') {
        trains.map(train => train.getStops());
        res.end('Stops');
    } else if (req.url === "/train") {
        // json response
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(trains));
        res.end();
    } else if (req.url === "/") {
        const html = `
            <html>
                <body>
                    <h1>Train API</h1>
                    <ul>
                        <li><a href="/start">Start</a></li>
                        <li><a href="/stop">Stop</a></li>
                        <li><a href="/accelerate">Accelerate</a></li>
                        <li><a href="/addFuel">Add Fuel</a></li>
                        <li><a href="/getFuel">Get Fuel</a></li>
                        <li><a href="/addPassenger">Add Passenger</a></li>
                        <li><a href="/getPassengers">Get Passengers</a></li>
                        <li><a href="/addCar">Add Car</a></li>
                        <li><a href="/getCars">Get Cars</a></li>
                        <li><a href="/addCargo">Add Cargo</a></li>
                        <li><a href="/getCargo">Get Cargo</a></li>
                        <li><a href="/addRoute">Add Route</a></li>
                        <li><a href="/getRoute">Get Route</a></li>
                        <li><a href="/addStop">Add Stop</a></li>
                        <li><a href="/getStops">Get Stops</a></li>
                        <li><a href="/train">Get Train</a></li>
                    </ul>
                </body>
            </html>
        `;
        res.end(html);
    } else {
        res.end("404 Not Found");
    }

}).listen(8080);

