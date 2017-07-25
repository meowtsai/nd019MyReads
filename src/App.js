import React,{Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import {Link,Route} from 'react-router-dom'
import BookDetail from './BookDetail'




const booksShelves =[
  {
    key:"currentlyReading",
    text:"Currently Reading"
  },
  {
    key:"wantToRead",
    text:"Want To Read"
  },
  {
    key:"read",
    text:"Read"
  }

]

class App extends Component
{
  state ={
    books:[],
    searchedBooks:[],
    booksKeynotes:
    {"currentlyReading":[],
    "wantToRead":[],
    "read":[]
    },
    query:''
  }


changeShelf = (book,shelf) =>
{
  this.setState((state) => ({
    books:state.books.filter((b) => (b.id!==book.id))
  }))

  BooksAPI.update(book,shelf).then((booksKeynotes) =>{
      this.setState({booksKeynotes})
    }
  )
  //console.log('state',this.state.booksKeynotes)
  book.shelf=shelf;

  this.setState((state) => ({
      books:state.books.concat([book])
    }))
  //console.log('state',this.state.books)
}

componentDidMount() {

    BooksAPI.getAll().then((books) => {
      this.setState({books})
      let objCurrentlyReading = this.state.books.filter((b)=>
        b.shelf==="currentlyReading").map((bb) => bb.id)

      let objWantToRead = this.state.books.filter((b)=>
        b.shelf==="wantToRead").map((bb) => bb.id)

      let objRead = this.state.books.filter((b)=>
        b.shelf==="read").map((bb) => bb.id)

      let booksKeynotes = {
        "currentlyReading":objCurrentlyReading,
        "wantToRead":objWantToRead,
        "read":objRead
      }

      this.setState({booksKeynotes})
    })
}

updateQuery = (query) => {
  this.setState({query:query.trim() })
  if(query){
  BooksAPI.search(query,1).then((searchedBooks) => {
  this.setState({searchedBooks})})
  }
  else {
    this.setState({searchedBooks:[]})
  }

}
    render(){
      let {query,books,searchedBooks,booksKeynotes} = this.state

      return(
        <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            {booksShelves.map((shelf) => (
              <div key={shelf.key}>
              <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.text}</h2>
                <div className="bookshelf-books">
                <ListBooks
                allbooks={books.filter((book)=>(book.shelf===shelf.key))}
                allShelves={booksShelves}
                shelfText={shelf.text}
                shelfKey={shelf.key}
                onChangeShelf={this.changeShelf}  />
                </div>
              </div>
              </div>
            ))}

          <div className="open-search">
            <Link to="/search" >Add a book</Link>
          </div>
          </div>
          </div>
        )} />

        <Route path="/search"  render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search" >Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"
                value={query}
                onChange={(event) =>this.updateQuery(event.target.value) }
                />
              </div>
            </div>
            <div className="search-books-results">

            <ListBooks allbooks={searchedBooks}
            allShelves={booksShelves}
            shelfText='Search'
            shelfKey='Search'
            onChangeShelf={this.changeShelf}
            shelfMapping={booksKeynotes}

            />
            </div>
            </div>
        )} />

        <Route path="/Book/:bookid" component={BookDetail} />



        </div>
      )
    }
  }

  export default App
