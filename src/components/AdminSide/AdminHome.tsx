import { Link } from 'react-router-dom'
const AdminHome = () => {
    return (
        <div>
            <h1>Admin Home</h1>
            <Link to="/adminProductadd">Add Product</Link>
            <Link to="/adminProductedit">Edit Product</Link>
        </div>
    )
}

export default AdminHome