// import React from "react";

// const Body = ({ products, deleteProduct, addProduct }) => {
//     console.log('IM THE BODY', products)
//     return (
//         <div>
//             {products.map(product => {
//                 return (
//             <h3 key={product.id}>
//                 {product.name}
//                 <button onClick={() => deleteProduct(product.id) }>X</button>
//                 {/* Using the onClick method and the deleteProduct method to 
//                 delete a product when the product is clicked. We pass in the product.id 
//                 into our deleteProduct method and it re renders because we changed the state
//                 of our App in the deleteProduct method in App.js. */}
//             </h3>)}
            
//             )}
//             <button onClick={(addProduct)}>Add a Crazy Product Here!</button>
//         </div>
//     )
// }

// export default Body