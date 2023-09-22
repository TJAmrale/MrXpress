
function BookARepairPage() {

  const mockCustomerSelection = {
    "device": {
        "brand": "Apple",
        "series": "iPhone",
        "model": "iPhone 12",
        "colour": "Green"
    },
    "repair": {
        "type": "Broken screen",
        "part_name": "iPhone 12 LCD screen", // this is auto generated based on the repair type
        "repair_price": 120.00  // this is a mock price fetched from the database based on the selected repair type
    },
    "accessories": [
        {
            "part_name": "Charger",
            "price": 20.00
        },
        {
            "part_name": "Screen protector",
            "price": 10.00
        }
    ],
    "total_cost": 150.00  // mock total (repair_price + sum of accessory prices)
}


  return (
    <h1>Book A Repair Page</h1>

  )
}

export default BookARepairPage