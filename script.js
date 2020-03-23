
const key = 'contact-key';

let clearbtn = document.getElementById('clearbtn');
clearbtn.addEventListener('click', () =>{
    localStorage.removeItem(key);
});

let contactTable;
let contact = {
    'shuaib': {
        'phone':'08116306440',
        'address': '24 ayinde street'
    },
    'wale': {
        'phone':'08116306440',
        'address': '24 ayinde street'
    },
};

let enableDisableNameInput = (option) => {
    let newname = document.getElementById('newname');
    if(option === 'enable')
        newname.disabled = false;
    else if (option === 'disable')
        newname.disabled = true;
}

let refreshDOMTable = ()=>{

    
    let contactTableKeys = Object.keys(contactTable);
    let contactListContainer = document.getElementById('contactcontainer');
    let oldContact = document.getElementById('newentry');
    contactListContainer.removeChild(oldContact);

    let newContact = document.createElement('span');
    newContact.id = 'newentry';
    contactListContainer.appendChild(newContact);

    let addnewButton = document.getElementById('addnew');
     let editButton = document.getElementsByClassName('edit');
     let deleteButton = document.getElementsByClassName('delete');

     let newContactaddButton = document.getElementById('addbutton');
     let newContactcancelButton = document.getElementById('cancelbutton');

 for (let i = 0; i < contactTableKeys.length; i++){
        let currentRow = document.createElement('div');
        let currentNamecolumn = document.createElement('div');
        let currentAddresscolumn = document.createElement('div');
        let currentPhonecolumn = document.createElement('div');
        let currentEditbutton = document.createElement('div');
        let currentDeletebutton = document.createElement('div');

       currentRow.className = 'row';
       currentNamecolumn.className = 'name column';
       currentAddresscolumn.className = 'Address column';
       currentPhonecolumn.className = 'Phone column';
       currentEditbutton.className = 'edit column';
       currentDeletebutton.className = 'delete column';

       currentNamecolumn.innerText = contactTableKeys[i];
       currentPhonecolumn.innerText = contactTable[contactTableKeys[i]].phone;
       currentAddresscolumn.innerText = contactTable[contactTableKeys[i]].address;
       currentEditbutton.innerHTML = '<i class="fas fa-user-edit"></i>';
       currentDeletebutton.innerHTML = '<i class="fas fa-user-times"></i>';

       currentRow.appendChild(currentNamecolumn);
       currentRow.appendChild(currentPhonecolumn);
       currentRow.appendChild(currentAddresscolumn);
       currentRow.appendChild(currentEditbutton);
       currentRow.appendChild(currentDeletebutton);
       newContact.appendChild(currentRow);
}

    let enableDisableUser = (option) => {
            let newname = document.getElementById('newname');
            let newphone = document.getElementById('newphone');
            let newaddress = document.getElementById('newaddress');
            newname.value ='';
            newphone.value = '';
            newaddress.value = '';

            let newcontact = document.getElementById('newcontact');
            let background = document.getElementById('background')
            
            newcontact.className =`${option}`;
            background.className = `${option}`;
    }
     
    newContactaddButton.addEventListener('click', () =>{

            let newname = document.getElementById('newname').value.trim();
            let newphone = document.getElementById('newphone').value.trim();
            let newaddress = document.getElementById('newaddress').value.trim();

            if(newname === '')
                newname.className = '';
            else
                newname.className = '';
             if(newphone === '')
                newphone.className = '';
            else  
                newphone.className = '';
            if(newaddress === '')
                newaddress.className = '';
            else
                newaddress.className = '';

            if(newname !== '' && newphone !== '' && newaddress !== ''){
                let newPerson = {};
                contactTable[newname] = {
                    'phone': newphone,
                    'address': newaddress
                }
                localStorage.setItem(key, JSON.stringify(contactTable));
                enableDisableUser ('disable');
                refreshDOMTable();
            }
     });
     cancelbutton.addEventListener('click', () =>{
        enableDisableUser('disable');
     })
     addnewButton.addEventListener('click', ()=>{
        enableDisableUser ('enable');
     });

     for(let i = 0; i < editButton.length; i++){
        editButton[i].addEventListener('click', ($event) =>{
            let nameToEdit = $event.target.parentElement.children[0].innerText;
            let contactToEdit = contactTable[nameToEdit];

            enableDisableUser('enable');

            let newname = document.getElementById('newname');
            let newphone = document.getElementById('newphone');
            let newaddress = document.getElementById('newaddress');
            newname.value = nameToEdit;
            newphone.value = contactToEdit.phone;
            newaddress.value = contactToEdit.address;

            enableDisableNameInput('enable');

        })
     }

 for (let i = 0; i < deleteButton.length; i++){
            deleteButton[i].addEventListener('click', ($event) =>{
                let nameToDelete = $event.target.parentElement.children[0].innerText;
                let isSure = window.confirm('you really want to delete' + " " + nameToDelete + '?');
                if(isSure)
                deleteUserfromtable(nameToDelete);
            })
        }

}

     let deleteUserfromtable = (userName) => {
         let template = {};
         let contactTableKeys = Object.keys(contactTable);
         for(let i = 0; i < contactTableKeys.length; i++){
             if(userName !==contactTableKeys[i]){
                 template[contactTableKeys[i]] = contactTable[contactTableKeys[i]];
             }
            }
             contactTable = template;
             localStorage.setItem(key, JSON.stringify(contactTable));
             refreshDOMTable();
         }

    let init = () => {
        if(localStorage.getItem(key)){
            contactTable = JSON.parse(localStorage.getItem(key));
        }else{
            contactTable = contact;
            localStorage.setItem(key,JSON.stringify(contactTable));
        }
        refreshDOMTable();
    }
    
    init();


