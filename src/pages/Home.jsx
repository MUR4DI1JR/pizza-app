import React, {useContext, useEffect, useRef, useState} from 'react';
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import qs from "qs";
import {useNavigate} from "react-router-dom";

import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock";
import Pagination from "../components/Pagination";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas} from "../redux/slices/pizzaSlice";
import CartEmpty from "../components/cartEmpty";
import imgEmpty from "../assets/img/empty-cart.png";


const Home = () => {
    const {categoryId, sort, currentPage} = useSelector(state => state.filter);
    const {items, status} = useSelector(state => state.pizza);

    const navigate = useNavigate();
    const {searchValue} = useContext(SearchContext);
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const dispatch = useDispatch();

    const takePizzas = async () =>{
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';


        dispatch(fetchPizzas({sortBy, order, category, search, currentPage}));

    }

    useEffect(() =>{
        if (isMounted.current){
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            });

            navigate(`?${queryString}`);
        }

        isMounted.current = true;

    }, [categoryId, sort.sortProperty, currentPage]);

    useEffect(() =>{
        if (window.location.search){
            const params = qs.parse(window.location.search.substring(1));
            const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

            dispatch(setFilters({
                ...params,
                sort,
            }));

            isSearch.current = true;
        }
    }, []);

    useEffect(() =>{
        window.scrollTo(0, 0);

        if (!isSearch.current){
            takePizzas();
        }

        isSearch.current = false;
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
                    status === 'error' ?
                        <div className="content__error-info">
                            <h2>Произошла ошибка <icon>😕</icon></h2>
                            <p>
                                К сожелению, не удалось получить пиццы. Попробуйте еще раз!
                            </p>
                        </div>
                        :
                        status === "loading" ?
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