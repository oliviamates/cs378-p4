import './App.css';
import MenuItem from './components/MenuItem';
import 'bootstrap/dist/css/bootstrap.min.css'; 

// import 'bootstrap/dist/css/bootstrap.min.css'; // This imports bootstrap css styles. You can use bootstrap or your own classes by using the className attribute in your elements.

// Menu data. An array of objects where each object represents a menu item. Each menu item has an id, title, description, image name, and price.
// You can use the image name to get the image from the images folder.
function getData() {
  const BASE_URL = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m"
            fetch(BASE_URL)
                .then(data =>data.json())
                .then(json => console.log(json))
                .catch(error => console.log(error))
}

function getAPI() {
    fetch("https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json")
      .then(data =>data.json())
      .then(json => console.log(json))
      .catch(error => console.log(error)) 
}
 

function App() {
  return (
    
    <div>
      <h4 id="tagline">Weather Forecast</h4>



    </div>

  );
}

export default App;
