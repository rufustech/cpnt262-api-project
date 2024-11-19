function newArray(array, book){
    
    let output = [];
    
    for (let i=0; i<array.length; i++){
        output.push(book(array[i], i, array));
    }
    return output
}

const bookArray = [
  { title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954 },
  { title: "Pride and Prejudice", author: "Jane Austen", year: 1813 },
  { title: "1984", author: "George Orwell", year: 1949 },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    year: 1979,
  },
];
 
 
let newestArray = newArray(bookArray, book => book.title);
console.log(newestArray)