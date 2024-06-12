import { createContext, useEffect, useState } from "react"
import { products } from "../assets/Data"
import axios from "../api/axios";




export const datacontect=createContext(null)

const Contextprovider = ({children}) => {
  const [auth, setAuth] = useState({});
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const [selectedDelivery, setSelectedDelivery] = useState({});
  const [cartQuantity, setCartQuantity] = useState(0);
  const [updateModes, setUpdateModes] = useState(
    cart.reduce((acc, item) => ({ ...acc, [item.productId]: false }), {})
  );
  const [token,setToken]=useState('');
  const [products,setProducts]=useState([])

  const updatequantity = () => {
    useEffect(() => {
      // Update cart quantity when cart items change
      const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartQuantity(totalQuantity);
      saveToStorage();
    }, [cart]);
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter((cartItem) => cartItem.productId !== productId);
    setCart(newCart);
    //saveToStorage();
  };

  const handleQuantityChange = (productId, event) => {
    const newQuantity = parseInt(event.target.value);
    if (isNaN(newQuantity) || newQuantity <= 0) {
      return; // Handle invalid input (optional: display error message)
    }

    const updatedCart = cart.map((item) =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    saveToStorage(); // Call saveToStorage here or within a separate function
  };

  const toggleUpdateMode = (productId) => {
    setUpdateModes((prevModes) => ({
      ...prevModes,
      [productId]: !prevModes[productId],
    }));
  };

  const handleDeliveryChange = (productId, optionId) => {
    setSelectedDelivery({ ...selectedDelivery, [productId]: optionId });
  };

  const selectedDeliveryDays = cart.map((item) => {
    const selectedOption = item.deliveryoption?.find(
      (option) => option.id === selectedDelivery[item.productId]
    );
    return selectedOption?.deliveryDays; // Return first found value
  
  });

  const totalItemPrice = cart.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.productId);
    return acc + ((product?.priceCents || 0) / 100) * item.quantity;
  }, 0);

  // Calculate total shipping cost based on selected delivery option
  const totalShippingCost = cart.reduce((acc, item) => {
    const selectedOption = item.deliveryoption?.find(
      (option) => option.id === selectedDelivery[item.productId]
    );
    return acc + (selectedOption?.priceCents || 0) / 100;
  }, 0);

  // Calculate subtotal (item price + shipping)
  const subtotalPrice = totalItemPrice + totalShippingCost;

  // Calculate tax (10% of subtotal)
  const taxAmount = subtotalPrice * 0.1;

  // Calculate order total (subtotal + tax)
  const orderTotal = subtotalPrice + taxAmount;

  const saveToStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const fetchproduct=async()=>{
    const response=await axios.get('/api/it/list');
    setProducts(response.data.data)
  }
  useEffect(()=>{
    async function loaddata(){
      await fetchproduct();
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
  }
  loaddata()
  },[])
    
  return (
    <datacontect.Provider value={{products, auth, setAuth,cart,selectedDeliveryDays,orderTotal
      ,cartQuantity,
      setCartQuantity,
      setCart,
      saveToStorage,
      updatequantity,updateModes, setUpdateModes,removeFromCart,handleQuantityChange,toggleUpdateMode
      ,handleDeliveryChange,selectedDelivery, setSelectedDelivery,totalItemPrice,totalShippingCost
      ,subtotalPrice,taxAmount,token,setToken
    }}>
      {children}
    </datacontect.Provider>
  )
}

export default Contextprovider;
