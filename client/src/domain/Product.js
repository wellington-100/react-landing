import { OrderForm } from "./OrderForm";
import {useState} from 'react';

const Product = ({title, subtitle, image, description, price, id, tags}) => {

    const {amount, currency} = price || {};
    let [showForm, setShowForm] = useState(false)

    return (
        <article>
            <h2>{title}</h2>
            <h3>{subtitle}</h3>
            <img src={`/images/${image}`} alt={title}/>
            <p>{description}</p>
            <div>
                {amount} {currency}
            </div>
            <div>
                <button onClick={() => setShowForm(!showForm)}>
                    {/* HW: manage the button Order -> Cancel*/}
                    {showForm ? "Cancel" : "Order"}
                </button>
                {showForm && <OrderForm productId={id}/>}
            </div>
            {/* <div>
                {tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div> */}
        </article>
    )
}

export default Product