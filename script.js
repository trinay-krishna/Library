const myLibrary=[];

function Book(author,title,pages,isRead){
    this.author=author;
    this.title=title;
    this.pages=pages;
    this.isRead=isRead;
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

function library(){
    myLibrary.forEach(
        (item)=>{
            console.log(item);
        }
    );
}

const sub=document.querySelector('#submit-btn');
console.log(sub)
sub.addEventListener('click',
    (event)=>{
        
        event.preventDefault();
    }
)
