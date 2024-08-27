import http from 'node:http'
import fs from 'node:fs'
import querystring from 'node:querystring'
import { randomUUID } from 'node:crypto'
import postgres from 'postgres'
import fetch from 'node-fetch'

const sql = postgres('postgres://postgres:27102010Postgresql@localhost:5432/landing_product_db')


const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    if (req.url == '/api/product'){
        sql`SELECT * FROM products`.then(data => {
            const mappedData = data.map(product => ({
                id: product.id,
                title: product.title,
                subtitle: product.subtitle,
                description: product.description,
                image: product.image,
                price: {
                    amount: product.price_amount,
                    currency: product.price_currency
                },
                tags: product.tags
            }));
            
            res.write(JSON.stringify(mappedData));
            res.end();
        });
    } else if (req.url.startsWith('/api/orderinfo')) {
        let queryString = req.url.split('?')[1]
        let params = querystring.parse(queryString)
        console.log(params)

        // get order INFO!
        sql`SELECT * FROM orders`.then(orderData => {
            const order = orderData.find(order => order.id.split('-')[0] === params.order_id)
            console.log(order.id)
            if (!order) {
                res.write(JSON.stringify({ message: 'Order not found!' }))
                res.end()
                return
            }

            if (order.order_pin === params.pin) {
                res.write(JSON.stringify(order))
            } else {
                res.write(JSON.stringify({ message: 'Not authorized!' }))
            }
            res.end()
        })

        
    } else if (req.url == '/api/order') {
        //extract data from req body
        let body = ''
        req.on('data', chunk => {
            body += chunk
            console.log(body)
        })
        req.on('end', () => {
            let order = JSON.parse(body)
            let uuid = randomUUID()
            const {
                productId,
                clientName,
                orderEmail,
                orderPhone,
                orderQuantity,
                orderPIN
            } = order
            
            sql`SELECT price_amount, price_currency, title, description FROM products WHERE id = ${productId}`.then(productData => {

                const priceAmount = productData[0].price_amount;
                const priceCurrency = productData[0].price_currency;
                const productTitle = productData[0].title;
                const productDescription = productData[0].description;
                const totalPriceAmount = priceAmount * orderQuantity;
                const totalPriceCurrency = priceCurrency;

                sql`INSERT INTO orders (id, product_id, name, order_email, order_phone, order_quantity, order_pin, total_price_amount, total_price_currency) VALUES (
                    ${uuid},
                    ${productId},
                    ${clientName},
                    ${orderEmail},
                    ${orderPhone},
                    ${orderQuantity},
                    ${orderPIN},
                    ${totalPriceAmount},
                    ${totalPriceCurrency}
                )`.then(() => {

                    fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': `Basic ${Buffer.from('AQzEpyH_6kh3piBjuHCkwFGYa3I0wl45g58Ynmp_vpn8zTkEFBUi2y4YOnFkW9mBtzmOSwnNH4Mx1YAo:EOLbJk0XvQZ0Q-RAKtx3O_EEduhFdMyBGJfy9lLIxwR8JXZZuuAQz2-719E8NWSEuZjvlCCsnZllKQfe').toString('base64')}`
                        },
                        body: "grant_type=client_credentials"
                    }).then(response => {
                        return response.json();
                    }).then(json => {
                        let token = json.access_token;

                        fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                intent: "CAPTURE",
                                purchase_units: [
                                    {
                                        items: [
                                            {
                                                name: productTitle,
                                                // description: productDescription,
                                                quantity: orderQuantity,
                                                unit_amount: {
                                                    currency_code: priceCurrency,
                                                    value: priceAmount.toFixed(2)
                                                }
                                            }
                                        ],
                                        amount: {
                                            currency_code: priceCurrency,
                                            value: totalPriceAmount.toFixed(2),
                                            breakdown: {
                                                item_total: {
                                                    currency_code: priceCurrency,
                                                    value: totalPriceAmount.toFixed(2)
                                                }
                                            }
                                        }
                                    }
                                ],
                                application_context: {
                                    return_url: `http://localhost:8888/api/pay/success/${uuid}`,
                                    cancel_url: 'http://localhost:8888/api/pay/cancel',
                                    shipping_preference: 'NO_SHIPPING',
                                    user_action: 'PAY_NOW'
                                }
                            })
                        }).then(response => {
                            return response.json()
                        }).then(json => {
                            if (json.links) {
                                console.log('PayPal response:', json)
                                let url = json.links.find(link => link.rel === 'approve').href
                                // res.setHeader('Refresh', `0; URL=${url}`)
                                res.write(JSON.stringify({url}))
                                res.end();
                            } else {
                                console.error('Error in PayPal response:', json)
                                res.writeHead(500, {'Content-Type': 'application/json'})
                                res.end(JSON.stringify({error: 'Failed to create PayPal order'}))
                            }
                        }).catch(err => {
                            console.error(err);
                            res.writeHead(500, {'Content-Type': 'application/json'})
                            res.end(JSON.stringify({error: 'Internal Server Error'}))
                        });
                    });
                });
            });

        })


    } else if (req.url.startsWith('/api/pay/success')) {
        let orderId = req.url.split('/').pop().split('?')[0]
        console.log("Client payed for order: ", orderId)
        sql `UPDATE orders
            SET is_payed = true
            WHERE id = ${orderId}
            `.then(() => {
                // display a message
                res.setHeader("refresh", "0; url=http://localhost:3000/")
                res.end()
            })

    } else {
        res.write('not found')
        res.end()
    }
})

// 3. start the server
server.listen(8888)


// HW access order data using pin code -> fetch -> api