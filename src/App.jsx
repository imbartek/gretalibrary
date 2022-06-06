import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Nav from './components/Nav';

export default function App() {
    const Container = styled.div`
        width: 80%;
        margin: 3% auto;

        ul{
            display: grid;
            gap: 15px;
            grid-template-columns: repeat(3, 1fr);
        }
        li{
            display: flex;
            flex-flow: column;
            align-items: center;
            text-align: center;
            padding: 15px 0;
            border-radius: 10px;
            background-color: #fff;
            font-size: 80%;

            img{
                margin-bottom: 3%;
            }
        }
        button{
            margin: 3%;
            padding: 1% 3%;
            background-color: #ffc8ae;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1.25rem;
        }

        @media (max-width: 768px) {
            ul {
                grid-template-columns: repeat(1, 1fr);
            }
            button{
                padding: 3% 5%;
            }
        }
    `

    const [pageNumber, setPageNumber] = useState(1);
    const [books, setBooks] = useState([]);
    let link = "https://gnikdroy.pythonanywhere.com/api/book/?format=json&page=" + pageNumber;

    const getBooks = async () => {
        const { data } = await axios.get(link);
        setBooks(data.results);
    }

    //859562
    useEffect(() => {
        getBooks();
    }, [pageNumber])


    return (
        <div className='mainContent'>
            <Nav/>
            <h1>Welcome to Project Gutenberg</h1>
            <h2>Project Gutenberg is a library of over 60,000 free eBooks</h2>
            <Container>
                {books.length > 0 ?
                    <ul>
                        {books.map(book => {
                            return <li key={book.id}>
                                {book.resources.map(resource => {
                                    return resource.type === "image/jpeg" && resource.uri.includes("small") ?
                                        <img key={resource.id} src={resource.uri} alt={"book_" + book.title} /> : null
                                }
                                )}
                                <h3>{book.title}</h3>
                            </li>
                        })}
                    </ul>
                    :
                    <p>waiting for content</p>}
                <div>
                    <button onClick={
                        () => {
                            setBooks([])
                            setPageNumber(pageNumber - 1)
                        }
                    }>
                        Previous
                    </button>
                    <span>Page: {pageNumber}</span>
                    <button onClick={
                        () => {
                            setBooks([])
                            setPageNumber(pageNumber + 1)
                        }
                    }>
                        Next
                    </button>
                </div>
            </Container>
        </div>
    )
}
