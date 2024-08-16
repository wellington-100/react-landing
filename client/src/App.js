import logo from './logo.svg';
import './App.css';
import Header from './layout/Header';
import Content from './layout/Content';
import Footer from './layout/Footer';
import Product from './domain/Product';

// HW*: how to use suspense ???
import { getAllProducts } from './api/data';
import {useEffect, useState} from 'react'



// const Loading = () => <div>Loading...</div>;

function App() {

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

export default App;






// import logo from './logo.svg';
// import './App.css';
// import Header from './layout/Header';
// import Content from './layout/Content';
// import Footer from './layout/Footer';
// import Product from './domain/product';

// // HW*: how to use suspense ???
// import { getAllProducts } from './api/data';
// import React, { Suspense } from 'react';


// const Loading = () => <div>Loading...</div>;

// function App() {
//   return (
//     <div className="App">
//         <Header />
//         <Suspense fallback={<Loading />}>
//           <Content>
//             <Product />
//             <Product />
//             <Product />
//           </Content>
//         </Suspense>
//         <Footer />
//     </div>
//   );
// }

// export default App;
