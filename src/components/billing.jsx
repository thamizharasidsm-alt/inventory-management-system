export default function App() {
  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 50000,
      stock: 5,
    },
    {
      id: 2,
      name: "Mouse",
      price: 500,
      stock: 10,
    },
    {
      id: 3,
      name: "Keyboard",
      price: 1500,
      stock: 3,
    },
  ];

  const invoices = [
    {
      id: 101,
      customer: "Arun",
      total: 52000,
      date: "20-05-2026",
    },
    {
      id: 102,
      customer: "Kumar",
      total: 1500,
      date: "21-05-2026",
    },
  ];

  const cart = [
    {
      id: 1,
      name: "Laptop",
      price: 50000,
      qty: 1,
    },
    {
      id: 2,
      name: "Mouse",
      price: 500,
      qty: 2,
    },
  ];

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const gst = subtotal * 0.18;
  const discount = 1000;
  const grandTotal = subtotal + gst - discount;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">
          Billing Software
        </h1>

        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold">
          Logout
        </button>
      </div>

      <div className="flex">

        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen p-5">
          <h2 className="text-xl font-bold mb-6">
            Menu
          </h2>

          <ul className="space-y-4">
            <li className="bg-blue-100 p-3 rounded-lg cursor-pointer">
              Dashboard
            </li>

            <li className="hover:bg-gray-100 p-3 rounded-lg cursor-pointer">
              Products
            </li>

            <li className="hover:bg-gray-100 p-3 rounded-lg cursor-pointer">
              Customers
            </li>

            <li className="hover:bg-gray-100 p-3 rounded-lg cursor-pointer">
              Billing
            </li>

            <li className="hover:bg-gray-100 p-3 rounded-lg cursor-pointer">
              Invoices
            </li>

            <li className="hover:bg-gray-100 p-3 rounded-lg cursor-pointer">
              Reports
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">

          {/* Dashboard Section */}
          <h2 className="text-3xl font-bold mb-6">
            Dashboard
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">

            <div className="bg-white p-5 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-500">
                Total Sales
              </h3>

              <p className="text-3xl font-bold mt-3">
                ₹2,50,000
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-500">
                Products
              </h3>

              <p className="text-3xl font-bold mt-3">
                120
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-500">
                Customers
              </h3>

              <p className="text-3xl font-bold mt-3">
                85
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-500">
                Invoices
              </h3>

              <p className="text-3xl font-bold mt-3">
                40
              </p>
            </div>
          </div>

          {/* Product Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold">
                Product Management
              </h2>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Add Product
              </button>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">ID</th>
                  <th className="p-3">Product</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {products.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3">{item.id}</td>

                    <td className="p-3">{item.name}</td>

                    <td className="p-3">₹{item.price}</td>

                    <td className="p-3">{item.stock}</td>

                    <td className="p-3">
                      {item.stock < 5 ? (
                        <span className="text-red-500 font-semibold">
                          Low Stock
                        </span>
                      ) : (
                        <span className="text-green-500 font-semibold">
                          Available
                        </span>
                      )}
                    </td>

                    <td className="p-3 space-x-2">
                      <button className="bg-yellow-400 px-3 py-1 rounded-lg text-white">
                        Edit
                      </button>

                      <button className="bg-red-500 px-3 py-1 rounded-lg text-white">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Customer Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
            <h2 className="text-2xl font-bold mb-5">
              Customer Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Customer Name"
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                placeholder="Address"
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                placeholder="GST Number"
                className="border p-3 rounded-lg"
              />
            </div>

            <button className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg">
              Save Customer
            </button>
          </div>

          {/* Billing Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold">
                Billing Section
              </h2>

              <input
                type="text"
                placeholder="Search Product"
                className="border p-2 rounded-lg"
              />
            </div>

            <table className="w-full border-collapse mb-6">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">Product</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Total</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3">{item.name}</td>

                    <td className="p-3">₹{item.price}</td>

                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <button className="bg-red-500 text-white px-3 py-1 rounded-lg">
                          -
                        </button>

                        <span>{item.qty}</span>

                        <button className="bg-green-500 text-white px-3 py-1 rounded-lg">
                          +
                        </button>
                      </div>
                    </td>

                    <td className="p-3">
                      ₹{item.price * item.qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="bg-gray-100 p-5 rounded-xl space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹{gst}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span>₹{discount}</span>
              </div>

              <div className="flex justify-between text-2xl font-bold border-t pt-3">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button className="bg-blue-600 text-white px-5 py-3 rounded-xl">
                Generate Bill
              </button>

              <button className="bg-green-600 text-white px-5 py-3 rounded-xl">
                Download PDF
              </button>

              <button className="bg-gray-700 text-white px-5 py-3 rounded-xl">
                Print Invoice
              </button>
            </div>
          </div>

          {/* Invoice History */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold">
                Invoice History
              </h2>

              <input
                type="text"
                placeholder="Search Invoice"
                className="border p-2 rounded-lg"
              />
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">Invoice ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b">
                    <td className="p-3">#{invoice.id}</td>

                    <td className="p-3">{invoice.customer}</td>

                    <td className="p-3">{invoice.date}</td>

                    <td className="p-3">₹{invoice.total}</td>

                    <td className="p-3">
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                        Paid
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Reports Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
            <h2 className="text-2xl font-bold mb-5">
              Reports
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              <div className="bg-blue-100 p-5 rounded-xl">
                <h3 className="font-semibold text-lg">
                  Daily Sales
                </h3>

                <p className="text-2xl font-bold mt-3">
                  ₹15,000
                </p>
              </div>

              <div className="bg-green-100 p-5 rounded-xl">
                <h3 className="font-semibold text-lg">
                  Monthly Sales
                </h3>

                <p className="text-2xl font-bold mt-3">
                  ₹2,50,000
                </p>
              </div>

              <div className="bg-yellow-100 p-5 rounded-xl">
                <h3 className="font-semibold text-lg">
                  Profit
                </h3>

                <p className="text-2xl font-bold mt-3">
                  ₹80,000
                </p>
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
            <h2 className="text-2xl font-bold mb-5">
              Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Company Name"
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                placeholder="Company Address"
                className="border p-3 rounded-lg"
              />

              <input
                type="email"
                placeholder="Company Email"
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                placeholder="GST Number"
                className="border p-3 rounded-lg"
              />
            </div>

            <button className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg">
              Save Settings
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
