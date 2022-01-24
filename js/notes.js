const addBtn = document.querySelector('.add');
const removeAllBtn = document.querySelector('.delete-all');

const notePanel = document.querySelector('.note-popup');
const notePanelSave = document.querySelector('.save')
const notePanelCancel = document.querySelector('.cancel');
const notePanelCategory = document.querySelector('#category');
const notePanelNote = document.querySelector('#text');
const notePanelError = document.querySelector('.error')

const noteArea = document.querySelector('.note-area');
let noteClose = document.querySelectorAll('.delete-note');
let noteCounter = 1;

let allNotes = document.querySelectorAll('.note');

const searchBar = document.querySelector('.search');
const allNotesContent = document.getElementsByClassName('note-body');



// Functions
const checkForm = () => {
    if(notePanelCategory.value == 0 || notePanelNote.value == '')
    {
        showError("Wypełnij wszystkie pola!");
    }
    else
    {
        notePanelError.style.visibility = 'hidden';
        addNote(notePanelCategory.value, notePanelNote.value);
    }

    noteClose = document.querySelectorAll('.delete-note');
    noteClose.forEach(el => {
        el.addEventListener('click', deleteNote)
    })

    allNotes = document.querySelectorAll('.note');
    removeAllBtn.addEventListener('click', () => {
        allNotes.forEach(el => {
            el.remove();
        })
        noteCounter = 1;
    })
}

const addNote = (category, note) => {
    const noteAll = document.createElement('div');
    const noteHeader = document.createElement('div');
    const noteTitle = document.createElement('h3');
    const deleteNote = document.createElement('button');
    const noteBody = document.createElement('div');

    noteAll.classList.add('note');
    noteHeader.classList.add('note-header');
    noteTitle.classList.add('note-title');
    deleteNote.classList.add('delete-note');
    noteBody.classList.add('note-body');

    noteAll.append(noteHeader);
    noteHeader.append(noteTitle);
    noteHeader.append(deleteNote);
    noteAll.append(noteBody);

    noteTitle.textContent = `Notatka ${noteCounter}`;
    deleteNote.innerHTML = '<i class="fas fa-times icon"></i>';
    noteBody.textContent = note;

    if(category==1)
    {
        noteAll.style.backgroundColor = "lime";
    }
    else if(category==2)
    {
        noteAll.style.backgroundColor = "orange";
    }

    noteArea.append(noteAll);
    noteCounter++;

    notePanel.classList.remove('active');
    notePanelCategory.value = 0;
    notePanelNote.value = '';
}

const deleteNote = (e) => {
    const currentNote = e.target.closest('.note');
    currentNote.remove();
    noteCounter--;
}


const showError = (message) => {
    notePanelError.textContent = message;
    notePanelError.style.visibility = 'visible';
}

const searchNote = () => {
    for(const el of allNotesContent)
    {
        if(el.textContent.toLowerCase().indexOf(searchBar.value.toLowerCase()) >= 0)
        {
            el.closest('.note').classList.remove('note-hide');
        }
        else
        {
            el.closest('.note').classList.add('note-hide');
        }
    }
}

// Event Listeners
addBtn.addEventListener('click', () => {
    notePanel.classList.toggle('active');
})

notePanelSave.addEventListener('click', checkForm);

notePanelCancel.addEventListener('click', () => {
    notePanel.classList.remove('active');
    notePanelCategory.value = 0;
    notePanelNote.value = '';
    notePanelError.style.visibility = 'hidden';
})

searchBar.addEventListener('input', searchNote);
