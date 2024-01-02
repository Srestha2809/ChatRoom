import TrafficLight from "./trafficlight";
import "../App.css"
const Street = () => {
    return (
        <div className="flex-container">
            <TrafficLight street="Srestha" />
            <TrafficLight street="Bharadwaj" />
            <TrafficLight street="Info3139" />
        </div>
    );
};

export default Street;