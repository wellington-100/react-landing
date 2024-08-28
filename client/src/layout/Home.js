
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Product from '../domain/Product';
import { getAllProducts } from '../api/data';
import {useEffect, useState} from 'react'


export function Home(){
    let [products, setProducts] = useState([])
  
    const getProducts = () => {
      (async () => {
        let productsData = await getAllProducts()
        setProducts(productsData)
      })()
    }
  
    useEffect(getProducts, [])
  
    return (
      <div className="App">
          <Header />
  
          <Content>
            {products.map(product => <Product {...product}/>)}
          </Content>
  
          <Footer />
      </div>
    );
}