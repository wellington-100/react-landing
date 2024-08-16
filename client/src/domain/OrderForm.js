import './OrderForm.scss'
import { orderProduct } from '../api/data'
import { useState } from 'react';

const OrderForm = ({productId}) => {

    const [quantity, setQuantity] = useState(1);

    return (
        <form>
            <input type="hidden" id="productId" value={productId}/>
            <label>
                <input id="inputName" placeholder="your name"></input>
            </label>
            <label>
                <input id="inputEmail" placeholder="your email"></input>
            </label>
            <label>
                <input id="inputPhone" placeholder="your phone"></input>
            </label>
            <label>
                quantity:<br></br>
                <input  id="inputQuantity" 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(+e.target.value)}
                />
            </label>
            <label>
                <input id="inputPIN" placeholder="choose a security PIN code"></input>
            </label>
            <label>
                <button onClick={(e)=>{
                    e.preventDefault()
                    // TODO: get form data -> backend
                    let productId = +document.getElementById("productId").value
                    let name = document.getElementById("inputName").value
                    let email = document.getElementById("inputEmail").value
                    let phone = document.getElementById("inputPhone").value
                    let quantity = +document.getElementById("inputQuantity").value
                    let pin = document.getElementById("inputPIN").value
                    orderProduct({
                        productId: productId,
                        clientName: name,
                        orderEmail: email,
                        orderPhone: phone,
                        orderQuantity: quantity,
                        orderPIN: pin
                    })


                    
                }} >
                    PAY
                </button>
            </label>

        </form>
    )
}

export {OrderForm}