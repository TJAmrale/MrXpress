import React from 'react';
import '../assets/styles/invoice.css';
import Logo from "../assets/images/nobg_logo.png";
import { GrClose } from "react-icons/gr"

function InvoiceView({ job, closeInvoice }) {
    console.log(job);
    const tax = (job.total_cost) * 0.1;
    const total = (job.total_cost) - tax;
    return (
        <div id='invoicemake'>
            <GrClose
                onClick={closeInvoice} />
            <div className='invlogo'>
                <img src={Logo} alt="logo" />
            </div>

            <div id="invmid">
                <div class="invinfo">
                    <h2 style={{ color: "#000000" }}>INV-{job.job_id}</h2>
                    <br></br>
                    <p>Address : street city, state 0000</p>
                    <p>Email   : JohnDoe@gmail.com</p>
                    <p> Phone   : 555-555-5555</p>
                </div>
            </div>

            <div id="invdescription">
                <div id='invoptions'>
                    <table>
                        <thead className='invoiceheading'>
                            <tr>
                                <th>Device</th>
                                <th>Items</th>
                                <th>Sub Total</th>
                            </tr>
                        </thead>
                        <tbody className='invitems'>
                            {job.item_details.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {index === 0 ? `${item.series_name || "N/A"} ${item.model || "N/A"}` : null}
                                    </td>
                                    <td>
                                        {item.item_type}
                                        <br />
                                        {item.item_name}
                                    </td>
                                    <td>
                                        {index === 0 ? `$${job.total_cost || 0}` : null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div id='invmoney' className='containeri'>
                <table>
                    <tbody>
                        <tr>
                            <td>Tax</td>
                            <td>{tax}</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>{total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default InvoiceView;
