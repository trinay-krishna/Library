let myLibrary=[];

function Book(author,title,pages,isRead=false){
    this.author=author;
    this.title=title;
    this.pages=pages;
    this.isRead=isRead;
}

function setBookDetails(title,author,pages,readBtn,removeBtn,book){
    title.textContent=book.title;
    author.textContent=`Author: ${book.author}`;
    pages.textContent=`Pages: ${book.pages}`;
    readBtn.textContent=(book.isRead)?"Read":"Not Read";
    removeBtn.textContent="Remove"
}

function addToDiv(div,title,author,pages,readBtn,removeBtn){
    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    div.appendChild(readBtn);
    div.appendChild(removeBtn);
}

function createBookCard(book,index){
    const div=document.createElement('div');
    div.classList="book";
    const id=index;
    const title=document.createElement('h2');
    const author=document.createElement('p');
    const pages=document.createElement('p');
    const readBtn=document.createElement('button');
    const removeBtn=document.createElement('button');
    readBtn.id=`u-${id}`;
    removeBtn.id=`r-${id}`;
    setBookDetails(title,author,pages,readBtn,removeBtn,book);
    addToDiv(div,title,author,pages,readBtn,removeBtn);
    return div;
}
function updateLibrary(){
    const container=document.querySelector('.main-content');
    container.textContent="";
    myLibrary.forEach(
        (book,index)=>{
            const div=createBookCard(book,index);
            container.appendChild(div);
        }
    )
}

function addBookToLibrary(book){
    myLibrary.push(book);
    updateLibrary();
}


function getBook(inputs){
    let arr=[];
    inputs.forEach(
        (item)=>{
            if(item.id!="book-read"){
                arr.push(item.value);
                item.value="";
            }
            else{
                arr.push(item.checked);
                item.checked=false;
            }
        }
    );
    let title,author,pages,isRead;
    [title,author,pages,isRead]=arr;
    return(new Book(author,title,pages,isRead));
}
function setupForm(){
    const sub=document.querySelector('#submit-btn');
    console.log(sub)
    sub.addEventListener('click',
        (event)=>{
            const inputs=document.querySelectorAll("input");
            let invalid=0;
            inputs.forEach(
                (item)=>{
                    if(item.value===""){
                        item.style.border="2px solid red";
                        invalid++;
                    }
                    else{
                        item.style.border="none";
                    }
                }
            );
            if(!invalid){
                const book=getBook(inputs);
                addBookToLibrary(book);
            }
            event.preventDefault();
        }
    );
}

function removeBook(index){
    myLibrary=myLibrary.slice(0,index).concat(myLibrary.slice(index+1));
    console.log("HELLO",myLibrary);
    updateLibrary()
}

function toggleRead(index){
    const readBtn=document.querySelector(`#u-${index}`);
    const bookAtIndex=myLibrary[index];
    bookAtIndex.isRead=!bookAtIndex.isRead;
    readBtn.textContent=(bookAtIndex.isRead)?"Read":"Not Read";
}

function setupTemplateCard(){
    const book=new Book("Kratos","God Of War","200",true);
    addBookToLibrary(book);
}

function setupCards(){
    const container=document.querySelector('.main-content');
    setupTemplateCard();
    container.addEventListener('click',
        (event)=>{
            const target=event.target;
            const id=target.id;
            if(id.charAt(0)!="u" && id.charAt(0)!="r")
                return;
            let index;
            [_,index]=id.split("-");
            if(id.charAt(0)=="r")
                removeBook(+index);
            else
                toggleRead(+index);
            
        }
    )
}
setupForm();
setupCards();

