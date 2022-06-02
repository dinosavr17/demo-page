import React,{useState, useEffect} from 'react'
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import { useForm } from 'react-hook-form';
const Container = styled.div`
  border-color: #222222;
  border-radius: 10px;
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Info = styled.div`
    display: flex;
  flex-direction: column;
  padding: 10px;
`;
const Order = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: lavender;
  margin: 1em;
  border-radius: 10px;
`;
const OrderDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Image = styled.img`
  width: 200px;
`;
const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductSize = styled.span``;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;
// getting the values of local storage
const getDatafromLS=()=>{
    const data = localStorage.getItem('books');
    if(data){
        return JSON.parse(data);
    }
    else{
        return []
    }
}

export const CreateBooks = () => {
    const [books, setbooks]=useState(getDatafromLS());
    const [title, setTitle]=useState('');
    const [author, setAuthor]=useState('');
    const [isbn, setIsbn]=useState('');
    const [cover, setCover]=useState('');
    useEffect(()=>{
        let input = document.querySelector('input[type=file]');
            let textarea = document.querySelector('textarea');

            function readFile(event) {
                textarea.textContent = event.target.result;
                console.log(event.target.result);
            }

            let reader = new FileReader();

            function changeFile() {
                let file = input.files[0];
                reader.addEventListener('load', readFile);
                reader.readAsDataURL(file);
            }

            input.addEventListener('change', changeFile);
    },[])

    const handleAddBookSubmit=(event)=>{
        event.preventDefault();
        let book={
            title,
            author,
            isbn,
            cover
        }
        setbooks([...books,book]);
        setTitle('');
        setAuthor('');
        setIsbn('');
    }

    // delete book from LS
    const handleDeleteProduct=(event,isbn)=>{
        const filteredBooks=books.filter((element,index)=>{
            return element.isbn !== isbn
        })
        setbooks(filteredBooks);
    }

    // saving data to local storage
    useEffect(()=>{
        localStorage.setItem('books',JSON.stringify(books));
    },[books])
    return (
        <Container>
            <Title>BookList App</Title>
            <p>Add and view your books using local storage</p>
            <div className='main'>

                <div className='form-container'>
                    <form autoComplete="off" className='form-group'
                          onSubmit={handleAddBookSubmit}>
                        <label>Title</label>
                        <input type="text" className='form-control' required
                               onChange={(event)=>setTitle(event.target.value)} value={title}></input>
                        <br></br>
                        <label>Author</label>
                        <input type="text" className='form-control' required
                               onChange={(event)=>setAuthor(event.target.value)} value={author}></input>
                        <br></br>
                        <label>ISBN#</label>
                        <input type="text" className='form-control' required
                               onChange={(event)=>setIsbn(event.target.value)} value={isbn}></input>
                        <br></br>
                        <input type="file" onChange={(event)=>setCover(event.target.value)} value={cover}/>
                            <textarea rows="10" cols="50"></textarea>
                        <button type="submit" className='btn btn-success btn-md'>
                            ADD
                        </button>
                    </form>
                </div>

                <div className='view-container'>
                    {books.length>0&&<>
                        <Container className='table-responsive'>
                                <Info>
                                    {books.map((book) => (
                                    <Order key={book.isbn}>
                                        <OrderDetail>
                                            <Image src={book.cover} />
                                            <Details>
                                                <ProductName>
                                                    <b>Title:</b> {book.title}
                                                </ProductName>
                                                <ProductId>
                                                    <b>ID:</b> {book.isbn}
                                                </ProductId>
                                                <ProductSize>
                                                    <b>Author:</b> {book.author}
                                                </ProductSize>
                                                <ProductPrice>
                                                    <FontAwesomeIcon onClick={(event)=>handleDeleteProduct(event,book.isbn)} icon={faTrashCan}/>
                                                </ProductPrice>
                                            </Details>
                                        </OrderDetail>
                                    </Order>
                                    ))}
                                </Info>
                        </Container>
                        <button className='btn btn-danger btn-md'
                                onClick={()=>setbooks([])}>Remove All</button>
                    </>}
                    {books.length < 1 && <div>No books are added yet</div>}
                </div>

            </div>
        </Container>
    )
}
export default CreateBooks