import React, {useState, useEffect} from 'react';
import {getOneOrder} from '../user';
import Moment from 'react-moment';
import 'moment-timezone';
import  '../user/Bill.css'
import Pdf from "react-to-pdf";

const Bill = ({match}) => {

    const [oneBill, setOneBill] = useState({})

    const loadBill = async (orderId) => {
        try {
            const data = await getOneOrder(orderId)
            if(data.error) {
               return console.log(data.error)
            } else {
                return setOneBill({id: data._id, user: data.user.name, email: data.user.email, date: data.createdAt, products: data.products, amount: data.amount })
            }
        }
        catch (err) {
            console.log(err);
        }   
    }

    useEffect(() => {
        loadBill(match.params.orderId)
        // eslint-disable-next-line
    }, [])

    const ref = React.createRef();

    return (
        <div className="bill">
        <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Telecharger</button>}
        </Pdf>
        <body  style={{ background: 'white'}} ref={ref}>
        <header className="clearfix">
            <h1>COMMANDE n°: {oneBill.id} </h1>
            <div id="company" className="clearfix">
                <div><a href="mailto:icesonBeats@gmail.com">icesonBeats@gmail.com</a></div>
            </div>
            <div id="project">
                <div><span>CLIENT : </span>{oneBill.user}</div>
                <div><span>EMAIL : </span> <a href="mailto:john@example.com">{oneBill.email}</a></div>
                <div><span>DATE : </span><Moment format="YYYY/MM/DD HH:mm">{oneBill.date}</Moment></div>
            </div>
        </header>
        <main>
            <table>
                <thead>
                <tr>
                    <th className="service">PRODUITS</th>
                    <th>PRIX</th>
                    <th>LIEN</th>
                </tr>
                </thead>
                <tbody>
                {oneBill.products && oneBill.products.map((p, pIndex) => (
                    <tr key={pIndex}>
                        <td className="service">{p.name}</td>
                        <td className="unit">{p.price} €</td>
                        <td className="qty">{p.download}</td>
                    </tr>
                ))}
                    <tr>
                        <td colSpan="4" className="grand total">TOTAL</td>
                        <td className="grand total">{oneBill.amount} €</td>
                    </tr>
                </tbody>
            </table>
        </main>
        </body>
    </div>
    )
}

export default Bill;