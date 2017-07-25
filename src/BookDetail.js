import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'

class BookDetail extends Component {

  state ={
    book:{}
  }


  componentDidMount() {
    let theBookId = this.props.match.params.bookid
      BooksAPI.get(theBookId).then((book) => {
      this.setState({book})

      })
  }

  render(){
    //console.log('props',this.props.history.goBack)
    //console.log('state',this.state.book)
    //console.log('props',this.props.location.state)
    let {book} = this.state
    let {fromPage} = this.props.location.state

    return(
      <div>
      <Link to={fromPage}  className="close-search" >Close</Link>
      <div>
      <div className="book-top">
      {(book.imageLinks) && (
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${(book.imageLinks.thumbnail)})` }}></div>
      )}
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
      {(book.authors) && (
        (book.authors) && book.authors.map((author,index) => ( <div key={author}>{author}</div>  ))
      )}
      </div>

      <div>{book.description}</div>
      <hr />
      <div>Page Count: {book.pageCount}</div>
      <div>Average Rating: {book.averageRating}</div>
      <div>Published Date: {book.publishedDate}</div>

      </div>

      </div>
    )
  }
}

export default BookDetail
