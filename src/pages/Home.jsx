import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock";
import axios from "../axios";
import Pagination from "../components/Pagination";

const Home = ({searchValue}) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating'
    });

    useEffect(() =>{
        setIsLoading(true)
        axios.get(`/items?page=${currentPage}&limit=4${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortType.sortProperty.replace('-', '')}&order=${sortType.sortProperty.includes('-') ? 'asc' : 'desc'}&search=${searchValue ? searchValue : ''}`).then(res =>{
            setItems(res.data);
            setIsLoading(false);
        });
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);


    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)}/>
                <Sort value={sortType} onClickSort={(i) => setSortType(i)}/>
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
            <Pagination onChangePage={(index) => setCurrentPage(index)}/>
        </div>
    );
};

export default Home;