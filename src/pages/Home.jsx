import React, {useContext, useEffect, useState} from 'react';
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import axios from "../axios";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock";
import Pagination from "../components/Pagination";
import {setCategoryId, setCurrentPage} from "../redux/slices/filterSlice";


const Home = () => {
    const {categoryId, sort, currentPage} = useSelector(state => state.filter);

    const [items, setItems] = useState([]);
    const {searchValue} = useContext(SearchContext);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    useEffect(() =>{
        setIsLoading(true)
        axios.get(`/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`).then(res =>{
            setItems(res.data);
            setIsLoading(false);
        });
        window.scrollTo(0, 0);
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);


    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(i) => dispatch(setCategoryId(i))}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {/*{*/}
                {/*    isLoading ?*/}
                {/*        [...new Array(6)].map((_, i) => <Skeleton key={i}/>)*/}
                {/*        :*/}
                {/*        items.filter((item) =>{*/}
                {/*            return item.title.toLowerCase().includes(searchValue.toLowerCase())*/}
                {/*        }).map((obj) =>{*/}
                {/*            return <PizzaBlock key={obj.id} {...obj}/>*/}
                {/*        })*/}
                {/*}*/}
                {
                    isLoading ?
                        [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
                        :
                        items.map((obj) =>{
                            return <PizzaBlock key={obj.id} {...obj}/>
                        })
                }
            </div>
            <Pagination currentPage={currentPage} onChangePage={(index) => dispatch(setCurrentPage(index))}/>
        </div>
    );
};

export default Home;