import React from 'react';

function InvoiceView({ job }) {
    return(
        <div id='invoicemake'>
            <div className='logo'></div>
            <div className='info'>
                <h2 style={{ color: "#000000" }}>MrXpress</h2>
            </div>

            <div id="mid">
                <div class="info">
                    <h2 style={{ color: "#000000" }}>Contact Info</h2>
                    <p>Address : street city, state 0000</p>
                    <p>Email   : JohnDoe@gmail.com</p>
                    <p> Phone   : 555-555-5555</p>
                </div>
            </div>
            <div id="description">
                <div id='options'>
                    <table>
                        <thead>
                            <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Total</th>
                            </tr>
                        </thead>
                    </table>

                </div>


            </div>

        </div>
    )


}

export default InvoiceView;