import React, { Component } from "react";
import Nav from "./components/Nav";
import Body from "./components/Body";
import axios from "axios";
import { connect } from "react-redux"
import { createProduct, deleteProduct} from "./store";

class App extends Component {
    constructor() {
        super()
        this.state = {
            //products: [],
            manufacturer: []
        }
    }

    async componentDidMount() {
        
        const myProducts = await axios.get('/products')
        const myManufacturer = await axios.get('/manufacturer')
        
        this.setState({
            //products: myProducts.data,
            manufacturer: myManufacturer.data
        })
       
    }
    
    // deleteProduct = async(id) => { 
    //     console.log(id)
    //     await axios.delete(`delete/${id}`)
    //     this.setState({products: this.state.products.filter(product => {
    //        return product.id !== id
    //     }
    //     )})
    // }

    /*

    THIS addProduct is using my route to add products
    but has no link to my store. 

    addProduct = async() => {
        const {data} = await axios.post('/add')
        this.setState({
            products: [...this.state.products, data]
        })
    }
    */
    
    render() {
       //console.log(this.state)
       //console.log('THIS IS MY STOREEEEE', this.props)
       
       const { products } = this.props.productStore
       const { makeProduct, byeProduct } = this.props
    //    console.log(products)
        // console.log("THESE ARE MY PROPS", this.props)
        return (
            <div>
                <Nav />
                {/* <Body products={products}
                deleteProduct={this.deleteProduct} addProduct={this.addProduct}
                /> */}
                {/* {All the products below are from my redux store!!!!} */}
                <h1>Button from redux</h1>
                <div>
                    {products.map(product => {
                        return (
                            <h3 key={product.data.id}>{product.data.name}
                            <button onClick={()=> byeProduct(product.data.id)}>X</button>
                            </h3>
                        )
                    })}
                <button onClick={makeProduct}>
                        Dispatch Button
                </button>
                </div>
                  
                
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        makeProduct : () => {
            dispatch(createProduct())
        },
        byeProduct : (id) => {
            dispatch(deleteProduct(id))
        } 
    }
}


const mapStateToProps = (state) => state


export default connect(mapStateToProps, mapDispatchToProps)(App);