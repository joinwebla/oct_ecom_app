import { useEffect, useState } from "react";
import { loadProducts } from "../apiCalls";

const Dashboard = () => {

	const [products, setProducts] = useState([]);
	const [cartInfo, setCartInfo] = useState({});

	const handleLogout = () => {
		localStorage.removeItem("ECOMM_TOKEN");
		window.location.href = "/login"
	}

	const fetchProducts = async () => {
		try {
			const response = await loadProducts();
			setProducts(response.data)
		} catch (error) {
			// toast
		}
	}


	const fetchCartInfo = () => {
		// apicall
		// total products
		// price
	}


	const addToCart = async (product_id) => {
		// try {
		// 	const res = await addToProductToCart(product_id)
		// } catch (error) {
		// }
	}

	useEffect(() => {
		fetchProducts()
		fetchCartInfo()
	}, [])

	return (
		<>
			<h1>Ecomm App</h1>
			<span className="btn btn-danger" onClick={handleLogout}>Logout</span>
			<div style={{ position: 'fixed', top: 0, right: 0, margin: 10, backgroundColor: 'grey', padding: 10 }}>
				<p>Total Products - 5</p>
				<p>Total Price - 7833</p>
				<button>Checkout</button>
			</div>
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				{
					products.map((product) => {
						return (
							<div className="card" style={{ width: '18rem', margin: 10 }}>
								<img className="card-img-top" src={product.images?.[0]} alt="Card image cap" />
								<div className="card-body">
									<h5 className="card-title">{product.title}</h5>
									<h5>{product.price}/-</h5>
									<p className="card-text">{product.description}</p>
									<button className="btn btn-primary" onClick={() => { addToCart(product.id) }}>Add to cart</button>
								</div>
							</div>
						)
					})
				}
			</div>
		</>
	)
}

export default Dashboard;