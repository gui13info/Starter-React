import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './styles.css';


export default function Product(props){
    const [product, setProduct] = useState({});

    useEffect(() => {
        const { id } = props.match.params;

        // console.log(id);

        api.get(`/products/${id}`).then((res) => {
            
            const  docs  = res.data;
            // console.log(docs);
            setProduct(docs);

        });

    }, []);

    return(
        <div className="product-info">
            <h1>{product.title}</h1>
            <p>{product.description}</p>

            <p>
                URL: <a href={product.url}>{product.url}</a>
            </p>
        </div>
    );
}

// export default class Product extends Component {
//     state  = {
//         product: {},
//     };

//     async componentDidMount(){
//         const { id } = this.props.match.params;

//         const response = await  api.get(`/products/${id}`);
//         console.log(response)

//         this.setState({ product: response.data });
//     }

//     render(){
//         const { product } = this.state;

//         return(
            // <div className="product-info">
            //     <h1>{product.title}</h1>
            //     <p>{product.description}</p>

            //     <p>
            //         URL: <a href={product.url}>{product.url}</a>
            //     </p>
            // </div>
//         );
//     }
// }