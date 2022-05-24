import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock";
import axios from "../axios";

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating'
    });

    useEffect(() =>{
        setIsLoading(true)
        axios.get(`/items?${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortType.sortProperty.replace('-', '')}&order=${sortType.sortProperty.includes('-') ? 'asc' : 'desc'}`).then(res =>{
            setItems(res.data);
            setIsLoading(false);
        });
        window.scrollTo(0, 0);
    }, [categoryId, sortType]);


    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)}/>
                <Sort value={sortType} onClickSort={(i) => setSortType(i)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ?
                        [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
                        :
                        items.map((obj) =>{
                            return <PizzaBlock key={obj.id} {...obj}/>
                        })
                }
            </div>
        </div>
    );
};

export default Home;