
import {
 
  FaTaxi,
 
} from "react-icons/fa";

const CarType = [
  { "id": 1, "type": "SUV" },
  { "id": 2, "type": "Sedan" },
  { "id": 3, "type": "Hatchback" },
  { "id": 4, "type": "Coupe" },
  { "id": 5, "type": "Convertible" },
  { "id": 6, "type": "Pickup Truck" },
  { "id": 7, "type": "MPV" },
  { "id": 8, "type": "Crossover" },
  { "id": 9, "type": "Luxury" },
  { "id": 10, "type": "Electric" }
]

const Pricing = [
  { "id": 1, "range": "5" },
  { "id": 2, "range": "10" },
  { "id": 3, "range": "15" },
  { "id": 4, "range": "20" },
  { "id": 5, "range": "30" },
  { "id": 6, "range": "50" },
  { "id": 7, "range": "100" }
]

const carTypes2 = [
  { id: 1, type: "SUV", icon: <img src="../src/assets/suv.png" alt="suv"  height={60} width={60}/> },
  
  { id: 2, type: "Sedan", icon:  <img src="../src/assets/sedan.png" alt="sedan" height={60} width={60} /> },
  { id: 3, type: "Hatchback", icon: <img src="../src/assets/hatchback.png" alt="hatchback" height={60} width={60} /> },
  { id: 4, type: "Coupe", icon: <img src="../src/assets/coupe.png" alt="coupe" height={60} width={60} />},
  { id: 5, type: "Convertible", icon: <img src="../src/assets/cabriolet.png" alt="cabriolet" height={60} width={60} /> },
  { id: 6, type: "Pickup Truck", icon:<img src="../src/assets/pickup-truck.png" alt="pickup-truck" height={60} width={60} />},
  { id: 7, type: "Van", icon: <img src="../src/assets/delivery-van.png" alt="delivery-van" height={60} width={60} /> },
  { id: 8, type: "Wagon", icon: <img src="../src/assets/wagon.png" alt="wagon" height={60} width={60} /> },
  { id: 9, type: "Crossover", icon: <img src="../src/assets/crossover-car.png" alt="crossovercar" height={60} width={60} /> },
  { id: 10, type: "Sports Car", icon:<img src="../src/assets/super-car.png" alt="super-car" height={60} width={60} /> },
  { id: 11, type: "Luxury", icon: <img src="../src/assets/luxury.png" alt="luxury" height={60} width={60} /> },
  { id: 12, type: "Off-Road", icon: <img src="../src/assets/offroad.png" alt="offroad" height={60} width={60} /> },
  { id: 13, type: "Electric", icon: <img src="../src/assets/electric.png" alt="electric" height={60} width={60} /> },
  { id: 14, type: "Mini", icon: <FaTaxi /> },
  { id: 15, type: "Taxi", icon: <FaTaxi /> },
];


const carFake =[
  {
    "id": 1,
    "name": "Hyundai Creta",
    "price": "₹12.45 Lakh",
    "fuelType": "Petrol",
    "mileage": "17.4 kmpl",
    "transmission": "Automatic",
    "image": "https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": 2,
    "name": "Tata Nexon",
    "price": "₹9.80 Lakh",
    "fuelType": "Diesel",
    "mileage": "21.5 kmpl",
    "transmission": "Manual",
    "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNhcnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    "id": 3,
    "name": "Maruti Swift",
    "price": "₹7.25 Lakh",
    "fuelType": "Petrol",
    "mileage": "23.2 kmpl",
    "transmission": "Manual",
    "image": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": 4,
    "name": "Kia Seltos",
    "price": "₹13.60 Lakh",
    "fuelType": "Petrol",
    "mileage": "16.8 kmpl",
    "transmission": "CVT",
    "image": "https://images.unsplash.com/photo-1531920327645-347e96a7f31e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D"
  },
  {
    "id": 5,
    "name": "Mahindra Thar",
    "price": "₹15.25 Lakh",
    "fuelType": "Diesel",
    "mileage": "15.2 kmpl",
    "transmission": "Automatic",
    "image": "https://images.unsplash.com/photo-1531920327645-347e96a7f31e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D"
  },
  {
    "id": 6,
    "name": "Toyota Fortuner",
    "price": "₹37.50 Lakh",
    "fuelType": "Diesel",
    "mileage": "14.3 kmpl",
    "transmission": "Automatic",
    "image": "https://images.unsplash.com/photo-1531920327645-347e96a7f31e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D"
  },
  {
    "id": 7,
    "name": "Honda City",
    "price": "₹12.75 Lakh",
    "fuelType": "Petrol",
    "mileage": "18.4 kmpl",
    "transmission": "Manual",
    "image": "https://images.unsplash.com/photo-1531920327645-347e96a7f31e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D"
  },
  {
    "id": 8,
    "name": "Maruti Brezza",
    "price": "₹10.50 Lakh",
    "fuelType": "CNG",
    "mileage": "25.5 km/kg",
    "transmission": "Manual",
    "image": "https://images.unsplash.com/photo-1531920327645-347e96a7f31e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D"
  }
]





export default { CarType,Pricing,carTypes2,carFake}