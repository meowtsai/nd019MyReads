import React, { Component } from 'react';

const myArray =
{"currentlyReading":["nggnmAEACAAJ","evuwdDLfAyYC","sJf1vQAACAAJ","zTtnV7J0lPAC","gBG7z8smAcsC","4Eg3LzakgIcC"],
"wantToRead":["74XNzF_al3MC","1wy49i-gQjIC","H8tNBKmPO5UC","Eple9hmRdg4C","adoTDAAAQBAJ"],
"read":["jAUODAAAQBAJ","IOejDAAAQBAJ","xlp6NE2NWecC","qS9eAQAAQBAJ","5QVywP-_-vAC"]
}

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
  },
  {
    key:"none",
    text:"None"
  }

]


class TestArray extends Component {

  checkArray = (bookid,shelf) =>{
if (myArray[shelf])
    {
    if (myArray[shelf].indexOf(bookid) >-1)
    {
      return 1;
    }
    else {
      return 0;
    }
  }

  }
render(){
return(
  <div>
  {booksShelves.map((shelf) =>
    (
    <div>{this.checkArray("H8tNBKmPO5UC", shelf.key)}</div>
    )
  )}



    </div>
)}}

export default TestArray
