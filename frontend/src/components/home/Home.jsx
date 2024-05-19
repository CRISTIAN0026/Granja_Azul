import React, {useEffect, useState} from "react";
import Slider from "../slider/Slider"
import { getProducts } from "../../services/apiService";

// Es la parte principal cuando se inicia sesión
export default function Home() {
      const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await getProducts();
      setData(result);
    };

    getData();
  }, []);
    console.log(data)
    return (
        <Slider/>
    )
}