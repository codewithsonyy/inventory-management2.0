"use client";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const [productForm, setProductForm] = useState({});
  const [products, setProducts] = useState([]);

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDelAction, setLoadingDelAction] = useState(false);
  const [loadingaction, setLoadingaction] = useState(false);
  const [dropdown, setDropdown] = useState([]);
  const [search, setSearch] = useState(false);

  const router = useRouter();

  const buttonAction = async (action, slug, initialQuantity) => {
    // Immediately change the quantity of the product with given slug in Products(only frontend)
    let index = products.findIndex((item) => item.slug == slug);
    let newProducts = JSON.parse(JSON.stringify(products));
    if (action == "plus") {
      newProducts[index].quantity = parseInt(initialQuantity) + 1;
    } else {
      if (newProducts[index].quantity === 0) return;
      newProducts[index].quantity = parseInt(initialQuantity) - 1;
    }
    setProducts(newProducts);

    // Immediately change the quantity of the product with given slug in Dropdown
    let indexdrop = dropdown.findIndex((item) => item.slug == slug);
    let newDropdown = JSON.parse(JSON.stringify(dropdown));
    if (action == "plus") {
      newDropdown[indexdrop].quantity = parseInt(initialQuantity) + 1;
    } else {
      newDropdown[indexdrop].quantity = parseInt(initialQuantity) - 1;
    }
    setDropdown(newDropdown);

    setLoadingaction(true);
    const response = await fetch("/api/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ action, slug, initialQuantity }),
    });
    let r = await response.json();

    setLoadingaction(false);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(productForm),
      });
      console.log(response);

      if (response.ok) {
        // Product added successfully
        alert("Your Product has been added!");
        setProductForm({});
      } else {
        // Handle error case
        console.error("Error adding product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // Fetch all the products again to sync back
    const response = await fetch("/api/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    let rjson = await response.json();
    setProducts(rjson.products);
  };
  //[] bracket notation to compute an expression
  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const onDropdownEdit = async (e) => {
    let value = e.target.value;
    setQuery(value);
    if (value.length > 3) {
      setSearch(true);
      setLoading(true);
      setDropdown([]);
      const response = await fetch("/api/search?query=" + query, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      let rjson = await response.json();
      setDropdown(rjson.products);
      setLoading(false);
    } else {
      setSearch(false);
      setDropdown([]);
    }
  };

  // ---------------DELETE FUNCTION----------------
  const handleDeleteProduct = async (id) => {
    const ID = id;
    try {
      const response = await fetch("/api/product", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(ID),
      });
      let rjson = await response.json();
      console.log(rjson);
      if (rjson.success === true) {
        alert("Succesfully Deleted");
        setLoadingDelAction(!loadingDelAction);
        router.refresh;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch products on load
    const fetchProducts = async () => {
      const response = await fetch("/api/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      let rjson = await response.json();

      setProducts(rjson.products);
    };
    fetchProducts();
  }, [loadingDelAction]);

  return (
    <div className="md:p-6 w-full">
      <Header />
      <div className="container mx-auto w-full md:w-1/2  my-8  px-3 md:px-0">
        <h1 className=" md:text-3xl font-semibold mb-6">Search a Product</h1>
        <div className="flex mb-2">
          <input
            onChange={onDropdownEdit}
            type="text"
            placeholder="Enter a product name"
            className="flex-1 border border-gray-300 px-2 md:px-4 py-2 rounded-l-md"
          />
          <select className="border border-gray-300 px-1 md:px-4 py-2 rounded-r-md">
            <option value="">All</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        {loading && (
          <div className="flex justify-center items-center">
            {" "}
            <p>loading...</p>
          </div>
        )}
        <div className="dropcontainer absolute w-11/12 md:w-1/2 border-1 bg-green-100 rounded-md ">
          {search &&
            (dropdown.length > 0 ? (
              dropdown.map((item) => {
                return (
                  <div
                    key={item.slug}
                    className="container flex flex-col sm:flex-row justify-between p-2 my-1 border-b-2"
                  >
                    <span className="slug text-sm md:text-base">
                      {" "}
                      {item.slug} ({item.quantity} available for ₹
                      {item.price * item.quantity})
                    </span>
                    <div className="mx-5">
                      <button
                        onClick={() => {
                          buttonAction("minus", item.slug, item.quantity);
                        }}
                        disabled={loadingaction || item.quantity === 0}
                        className={`subtract inline-block px-3 py-1 ${
                          item.quantity === 0
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        } bg-green-500 text-white font-semibold rounded-lg shadow-md disabled:bg-green-200`}
                      >
                        {" "}
                        -{" "}
                      </button>

                      <span className="quantity inline-block  min-w-3 mx-3">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          buttonAction("plus", item.slug, item.quantity);
                        }}
                        disabled={loadingaction}
                        className="add inline-block px-3 py-1 cursor-pointer bg-green-500 text-white font-semibold rounded-lg shadow-md disabled:bg-green-200"
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div> Not found.</div>
            ))}
        </div>
      </div>

      {/* Display Current Stock  */}
      <div className="flex gap-4 flex-col md:flex-row   w-full">
        <div className="container mx-auto shadow-md rounded-md p-3 my-8 w-11/12 ">
          <h1 className="text-3xl font-semibold mb-6">Add a Product</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="productName" className="block mb-2">
                Product Slug
              </label>
              <input
                value={productForm?.slug || ""}
                name="slug"
                onChange={handleChange}
                type="text"
                id="productName"
                className="w-full border border-gray-300 px-4 py-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block mb-2">
                Quantity
              </label>
              <input
                value={productForm?.quantity || ""}
                name="quantity"
                onChange={handleChange}
                type="number"
                id="quantity"
                className="w-full border border-gray-300 px-4 py-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block mb-2">
                Price
              </label>
              <input
                value={productForm?.price || ""}
                name="price"
                onChange={handleChange}
                type="number"
                id="price"
                className="w-full border border-gray-300 px-4 py-2"
              />
            </div>

            <button
              onClick={addProduct}
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold"
            >
              Add Product
            </button>
          </form>
        </div>
        <div className="container my-8 shadow-md rounded-md">
          <h1 className="text-3xl font-semibold mb-6">Display Current Stock</h1>
          <table className="table-auto w-full font-semibold text-sm md:font:bold md:text-base">
            <thead>
              <tr>
                <th className="md:px-4 py-2">Product Name</th>
                <th className="md:px-4 py-2">Quantity</th>
                <th className="md:px-4 py-2">Unit Price</th>
                <th className="md:px-4 py-2">Total Price</th>
                <th className="md:px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => {
                  return (
                    <tr key={product.slug} className="">
                      <td className="border px-4 py-2">{product.slug}</td>
                      <td className="border px-4 py-2">{product.quantity}</td>
                      <td className="border px-4 py-2">₹{product.price}</td>
                      <td className="border px-4 py-2">
                        ₹{product.price * product.quantity}
                      </td>
                      <td
                        onClick={() => handleDeleteProduct(product._id)}
                        className="border cursor-pointer flex justify-center items-center text-2xl py-2 text-red-600"
                      >
                        <MdDelete />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
