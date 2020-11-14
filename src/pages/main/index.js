import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

function Main(){

    const [products, setProducts] = useState([]);
    const [productInfo, setProductInfo] = useState({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        api.get(`/products?page=${page}`).then((res) => {
            
            const  {docs, ...rest}  = res.data;
            // console.log(docs);
            setProducts(docs);

            // console.log(rest);
            setProductInfo(rest);
        });

    }, []);

    const prevPage = () => {

        if (page === 1) return;

        const pageNumber = page - 1;

        setPage(pageNumber);

        api.get(`/products?page=${pageNumber}`).then((res) => {
            
            const  {docs, ...rest}  = res.data;
            // console.log(docs);
            setProducts(docs);

            // console.log(rest);
            setProductInfo(rest);
        });

        // this.loadProducts(pageNumber);
    }

     const nextPage = () => {

        if (page === productInfo.page) return;

        // console.log('Page '+productInfo.page);

        const pageNumber = page + 1;

        // console.log(pageNumber);

        setPage(pageNumber);

        api.get(`/products?page=${pageNumber}`).then((res) => {
            
            const  {docs, ...rest}  = res.data;
            // console.log(docs);
            setProducts(docs);

            // console.log(rest);
            setProductInfo(rest);
        });

        // this.loadProducts(pageNumber)
    }
    
        return(
            <div className="product-list">
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>

                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}

                <div className="actions">
                    <button disabled={page === 1} onClick={prevPage}>
                        Anterior
                    </button>
                    <button disabled={page === productInfo.pages} onClick={nextPage}>
                        Próximo
                    </button>
                </div>
            </div>
        );
    }

export default Main;