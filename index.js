
//gloable Array for storing notes data like id,inputValue,titleValue:-
let globArr=[];


//function to add the note container:-
const Add_div_Note=(Noteid,NoteTitle,NoteValue)=>{


    let id;
    if(Noteid){
        id= Noteid;
    }
    else{
        id =new Date().getTime().toString();
    }

    
    //creating the nodes of keeps :-
    const note=document.createElement('div');
    note.classList.add('Note-class');
    const attr=document.createAttribute('data-id');
    attr.value=id;
    note.setAttributeNode(attr);
    const htmldata=`
    <div class="btn-container">
            <i class="fa-solid fa-pen-to-square" id="editNote"></i>
            <i class="fa-solid fa-trash" id="deleteNote"></i>
        </div>
        
        <div class="main-note ${NoteTitle ? "": "hidden"}">
        <h4 class="heading"></h4>
        <p class="para"></p></div>

        <div class="keeping ${NoteTitle ? "hidden":""}">
        <input type = "textarea" id="title" name="title" placeholder = "Title"/>
        <textarea placeholder="Note"></textarea>
    </div>
    `
    note.insertAdjacentHTML('afterbegin',htmldata);



    //function for deleting the node:
    const deleteNote=note.querySelector('#deleteNote');
    deleteNote.addEventListener('click',()=>{

        note.remove();



        //udating the global array and localStorage after editing.
        globArr=globArr.filter((ele)=>{
            return ele.id!==id;
        });
        localStorage.setItem('Keep',JSON.stringify(globArr));
        //..



    } );
    //...


    const editNote=note.querySelector('#editNote');
    const textareas=note.querySelector('textarea');
    const main=note.querySelector('.main-note');
    const para=note.querySelector('.para');
    const mains=document.querySelector('.main');
    const keeping=note.querySelector('.keeping');
    const heading=note.querySelector('.heading');
    const title=note.querySelector('#title');


    if(NoteTitle && NoteValue){
        
        heading.innerHTML = NoteTitle;
        para.innerHTML = NoteValue;
        title.value=NoteTitle;
        textareas.value=NoteValue;

        const keepData={
            id:Noteid,
            inputValue:para.innerHTML,
            titleValue:heading.innerHTML,

        }
        globArr.push(keepData);
    }

    //copying the data of title to main-note:
    title.addEventListener('change',(e)=>{
        heading.innerHTML = e.target.value;
    })




    //copying the data of textarea to main-note
    textareas.addEventListener('change',(e)=>{
        para.innerHTML= e.target.value;

        const keepData={
            id:id,
            inputValue:para.innerHTML,
            titleValue:heading.innerHTML,
        }



        //udating the global array and localStorage after editing.
        const updtateIndex=globArr.find((ele)=>{
            return ele.id===id;
        })
        if(updtateIndex){
            globArr=globArr.map((ele)=>{
                if(ele.id===id){
                    ele.inputValue=para.innerHTML;
                    ele.titleValue=heading.innerHTML;
                }
                return ele;
            })
        }
        else{
            globArr.push(keepData);
        }
        localStorage.setItem('Keep',JSON.stringify(globArr));
        //..
        
    });


    //editing the node:
    editNote.addEventListener('click',()=>{
        if(title.value!==""){
            main.classList.toggle('hidden');
            keeping.classList.toggle('hidden');
        }
    });

    

    mains.appendChild(note);
    

    
}



//getting data from localStorage:-
const notesData = JSON.parse(localStorage.getItem("Keep"));
console.log(notesData);
console.log(notesData);

if(notesData){
    notesData.forEach((note) => {
        const {id,titleValue,inputValue} = note;
      return  Add_div_Note(id,titleValue,inputValue);
    });
}


    const Add_item_btn=document.querySelector('#Add');
    Add_item_btn.addEventListener('click',()=>{
        Add_div_Note();
    });