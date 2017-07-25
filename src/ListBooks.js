import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class ListBooks extends Component {


   getBookShelf = (book) => {
     let tempBookShelf ='none'
     if (this.props.shelfKey==='Search')
     {
       //console.log(this.props.shelfMapping["currentlyReading"].indexOf(book.id))
       //console.log("getBookShelf" , book.id + " " + book.shelf)
       const propNames = Object.getOwnPropertyNames(this.props.shelfMapping);
       let shelfMapping = this.props.shelfMapping;

       propNames.forEach(function(name) {
         //console.log("propNames",name )
         //console.log(shelfMapping["currentlyReading"].indexOf(book.id))
        //console.log(this.props.shelfMapping["currentlyReading"].indexOf(book.id));
        if (shelfMapping[name].indexOf(book.id)>-1) {
          tempBookShelf=name
        }
      })
     }
     else {
       tempBookShelf= book.shelf
     }
     return tempBookShelf
   }

  render() {
    let {allbooks,shelfKey,onChangeShelf,allShelves} =this.props

    return (
      (allbooks instanceof Array) && (
        <ol className="books-grid">
        {allbooks.map((book)=>(
          <li key={book.id}>
          <div className="book">
          <div className="book-top">
          {(book.imageLinks) && (
            <Link to={{pathname: `/Book/${book.id}`,state: { fromPage: `${shelfKey==='Search'?"/search": "/"}` }}}><div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${(book.imageLinks.thumbnail)})` }}></div></Link>
          )}
          <div className="book-shelf-changer">
          <select  onChange={(event) => onChangeShelf(book,event.target.value)} value={this.getBookShelf(book)}>
            <option value="none" disabled>Move to...</option>
          {allShelves.map((shelf) => (
            <option key={shelf.key}  value={shelf.key} >{(shelf.key===this.getBookShelf(book)? shelf.text+" ✓ " : shelf.text) }</option>
          ))}
            <option  value="none" >None</option>
          </select>
          </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
          {(book.authors) && (
            (book.authors) && book.authors.map((author,index) => ( <div key={author}>{author}</div>  ))
          )}
          </div>
          </div>
          </li>
        ))}
        </ol>
      )



    )
  }
}
export default ListBooks
