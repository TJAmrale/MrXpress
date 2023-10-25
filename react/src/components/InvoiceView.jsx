import React from 'react';
import '../assets/styles/invoice.css';
import Logo from "../assets/images/nobg_logo.png";
import {GrClose} from "react-icons/gr"

function InvoiceView({ job, closeInvoice }) {
    console.log(job);
    //const itemDetails = job.item_details || [];
    const tax = (job.total_cost) * 0.1;
    const total = (job.total_cost) - tax;
    return (
        <div id='invoicemake'>
             <GrClose 
             onClick={closeInvoice}/>
            <div className='logo'>
                <img src={Logo} alt="logo" />
            </div>

            <div id="mid">
                <div class="info">
                    <h2 style={{ color: "#000000" }}>INV-{job.job_id}</h2>
                    <br></br>
                    <p>Address : street city, state 0000</p>
                    <p>Email   : JohnDoe@gmail.com</p>
                    <p> Phone   : 555-555-5555</p>
                </div>
            </div>

            <div id="description">
                <div id='options'>
                    <table>
                        <thead className='invoiceheading'>
                            <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Sub Total</th>
                            </tr>
                        </thead>
                        <tbody className='items'>
                            <tr>
                                <td>{job.item_details[0].series_name || "N/A"} {job.item_details[0].model || "N/A"}</td>
                                <td>{job.item_details[0].item_type || "N/A"}</td>
                                <td>${job.total_cost || 0}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id='money' className='containeri'>
                <table>
                    <thead>
                        <tr>
                            <th>Tax</th>
                            <th>10%</th>
                        </tr>
                    </thead>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th>Total</th>
                            <th>{total}</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default InvoiceView;