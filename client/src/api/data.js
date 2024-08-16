const getAllProducts = async () => {
    const response = await fetch('http://localhost:8888/api/product')
    const products = await response.json()
    return products
}

const orderProduct = async (orderData) => {
        const response = await fetch('http://localhost:8888/api/order', {
        method: 'POST',
        body: JSON.stringify(orderData)
    })
    const {url} = await response.json()
    window.open(url)
}


export {getAllProducts, orderProduct}
// return [
//     {
//         id: 1001,
//         title: "JavaScript for impatient programmers (ES2022 edition)",
//         subtitle: "This book makes JavaScript less challenging to learn for newcomers by offering a modern view that is as consistent aspossible.",
//         description: "Some advanced language features are not explained, but references to appropriate material are provided – for example, to my other JavaScript books at ExploringJS.com, which are free to read online.\nThis book deliberately focuses on the language.\nBrowser-only features, etc are not described",
//         image: "/images/jsbook1.png",
//         tags: ["JS", "learning", "education", "2022", "programming", "IT"],
//         price: {
//             amount: 10,
//             currency: "EUR"
//         }

//     },

//     {
//         id: 1002,
//         title: "Eloquent JavaScript (4th edition - 2024)",
//         subtitle: "This is a book about JavaScript, programming, and the wonders of the digital. You can read it online here, or buy your own paperback copy (3rd edition).",
//         description: "Licensed under a Creative Commons attribution-noncommercial license. All code in this book may also be considered licensed under an MIT license. Illustrations by various artists: Cover by Péchane Sumi-e. Chapter illustrations by Madalina Tantareanu. Pixel art in Chapters 7 and 16 by Antonio Perdomo Pastor. Regular expression diagrams in Chapter 9 generated with regexper.com by Jeff Avallone. Game concept for Chapter 16 by Thomas Palef.",
//         image: "/images/jsbook2.jpg",
//         tags: ["JS", "learning", "education", "2022", "programming", "IT"],
//         price: {
//             amount: 20,
//             currency: "USD"
//         }

//     },
//     {
//         id: 1003,
//         title: "The Road to React",
//         subtitle: "Your journey to master plain yet pragmatic React.js",
//         description: "The React.js with Hooks in JavaScript Book (2024 Edition) - is a comprehensive and pragmatic yet concise React 18 with Hooks (+ opt-in TypeScript) book. Purchase of this book includes free online access to the always up-to-date digital book.",
//         image: "/images/react.jpg",
//         tags: [
//             "JS",
//             "learning",
//             "education",
//             "2022",
//             "programming",
//             "IT"
//         ],
//         price: {
//             amount: 30,
//             currency: "EUR"
//         }
//     }
// ]