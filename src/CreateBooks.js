import React,{useState, useEffect} from 'react'
import styled, { createGlobalStyle, css } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    background: bisque;
    height: 100%;
    margin: 0;
    color: #555;
  }
  label {
    cursor: pointer;
   color: #f7797d;
  }

  #upload-photo {
    padding: 5px;
    opacity: 25;
    z-index: 1;
  }
`;
const sharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
`;
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
const SingleBook = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #f3eeec;
  margin: 1em;
  border-radius: 10px;
`;
const BookDetail = styled.div`
  display: flex;
`;
const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  padding: 0 20px;
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 700px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
`;

const StyledInput = styled.input`
  display: flex;
  width: 100%;
  ${sharedStyles}
`;
const StyledFileInput = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
`;
const StyledButton = styled.button`
  display: block;
  background-color: #f7797d;
  font-size: 0.9rem;
  border: 0;
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Image = styled.img`
  max-width: 200px;
`;
const BookTitle = styled.span``;

const BookId = styled.span``;

const BookAuthor = styled.span``;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;
const Footer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const getBooks=()=>{
    const data = localStorage.getItem('books');
    if(data){
        return JSON.parse(data);
    }
    else{
        return []
    }
}

export const CreateBooks = () => {
    const [books, setbooks]=useState(getBooks());
    const [title, setTitle]=useState('');
    const [author, setAuthor]=useState('');
    const [bookId, setBookId]=useState('');
    const [cover, setCover]=useState('');
    useEffect(async ()=>{
        let input = document.querySelector('input[type=file]');

            function readFile(event) {
                console.log(event.target.result);
                setCover(event.target.result);
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
            bookId,
            cover
        }
        setbooks([...books,book]);
        setTitle('');
        setAuthor('');
        setBookId('');
    }

    // delete book from LS
    const handleDeleteBook=(event,bookId)=>{
        const filteredBooks=books.filter((element)=>{
            return element.bookId !== bookId
        })
        setbooks(filteredBooks);
    }
    useEffect(()=>{
        localStorage.setItem('books',JSON.stringify(books));
    },[books])
    return (
        <Container>
        <>
            <GlobalStyle/>
            <Title>Список Книг</Title>
            <StyledFormWrapper>
                    <StyledForm autoComplete="off" className='form-group'
                          onSubmit={handleAddBookSubmit}>
                        <StyledInput type="text" required
                               onChange={(event)=>setTitle(event.target.value)}
                                     value={title}
                                     placeholder='Название книги '>
                        </StyledInput>
                        <StyledInput type="text" required
                               onChange={(event)=>setAuthor(event.target.value)}
                                     value={author}
                                     placeholder='Имя автора'>
                        </StyledInput>
                        <StyledInput type="text" required
                               onChange={(event)=>setBookId(event.target.value)}
                                     value={bookId}
                                     placeholder='ID книги'>
                        </StyledInput>
                        <StyledFileInput>
                            <label htmlFor="upload-photo">Загрузить обложку</label>
                        <input type="file" id='upload-photo' accept=".jpg,.jpeg,.png"/>
                        </StyledFileInput>
                        <StyledButton type="submit">
                            Добавить
                        </StyledButton>
                    </StyledForm>
                </StyledFormWrapper>
            </>
                    {books.length>0&&<>
                        <Container>
                                <Info>
                                    {books.map((book) => (
                                    <SingleBook key={book.bookId}>
                                        <BookDetail>
                                            <Image src={book.cover} />
                                            <Details>
                                                <BookTitle>
                                                    <b>Название:</b> {book.title}
                                                </BookTitle>
                                                <BookAuthor>
                                                    <b>Автор:</b> {book.author}
                                                </BookAuthor>
                                                <BookId>
                                                    <b>ID:</b> {book.bookId}
                                                </BookId>
                                                <ProductPrice>
                                                    <FontAwesomeIcon onClick={(event)=>handleDeleteBook(event,book.bookId)} icon={faTrashCan}/>
                                                </ProductPrice>
                                            </Details>
                                        </BookDetail>
                                    </SingleBook>
                                    ))}
                                </Info>
                        </Container>
                    <Footer>
                        <StyledButton className='btn btn-danger btn-md'
                                onClick={()=>setbooks([])}>Очистить всё</StyledButton>
                    </Footer>
                    </>}
                    {books.length < 1 && <Footer>Книги не добавлены</Footer>}
        </Container>
    )
}
export default CreateBooks