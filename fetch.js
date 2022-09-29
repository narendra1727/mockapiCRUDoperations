// let url="https://6321d2e9fd698dfa29000d7d.mockapi.io/users";

// function getData(){
//     fetch(url ,{
//         method:"GET",
//         header:{
//             "Content-Type": "application/json"
//         }
//     }).then((response)=>response.json())
//     .then((data)=>  console.log(data))
//     .catch((err)=>console.log(err))

// }


// function createData(){
//     let data={
//         name:"Ramesh",
//         email:"ramesh@gmail.in"
//     }
//     fetch("https://6321d2e9fd698dfa29000d7d.mockapi.io/users",{
//         method:"POST",
//         body:JSON.stringify(data),
//         headers:{

//             "Content-Type":"application/json"
//         }
//     }).then((res)=>res.json())
//     .then((data)=>{
//         console.log(data);
//     }).catch((err)=>{
//         console.log(err);
//     })
// }

// function createdata(){
//    let data={
//     name:"venkat",
//     email:"venkat@gmail.in"
//    }
//    fetch("https://6321d2e9fd698dfa29000d7d.mockapi.io/users",{
//         method:"POST",
//         body:JSON.stringify(data),
//         headers:{
//             "Content-Type": "application/json"
//         }

//    }).then((resu)=>resu.json())
//    .then((data)=>console.log(data))
//    .catch((err)=>console.log(err))

// }


//createData();
//createdata();
//getData();

let url="https://6321d2e9fd698dfa29000d7d.mockapi.io/users";

// function updatedata(){
//     let data1={
//         name:"dummy",
//         email:"dummy@email.in"
//     }
//     fetch(url + "/12",{
//         method:"PUT",
//         body:JSON.stringify(data1),
//         headers:{
//             "Content-Type":"application/json"
//         }

//     }).then((resul)=>resul.json())
//     .then((data)=>console.log(data))
//     .catch((err)=>console.log(err))
// }

// updatedata();

// getData();

// function deleteData(){
//     fetch(url + "/15",{ 
//         method:"DELETE",
//         headers:{
//             "Content-Type": "application/json"
//         }
//     }).then((resu)=>resu.json())
//     .then((data)=>console.log(data))
//     .catch((err)=>console.log(err))
// }


// deleteData()



async function getdata(){
    let users;
    try{
        let data=await fetch(url,{
            method:"GET",
            headers:{
                "Content-Type": "application/json"
            }
        })
        users = await data.json();
        console.log(users)

    }catch(err){
        console.log(err)
    }
    return users;
}


async  function displayusers(){
    let users=await getdata();
    let userlist=document.querySelector(".user-list");
    

    users.forEach((val)=>{ 
        userlist.innerHTML +=`
        <div class="user-container">
        <img class="user-avatar" src=${val.avatar} alt=${val.name}>
        <div>
        <h2>${val.name}</h2><br>
        <p>${val.createdAt}</p>
        <button onclick="deleteuser(${val.id})">Delete</button>
        <button onclick="edituser(${val.id})">Edit</button>
        </div>
        </div>
        
        `
    })
}

displayusers();

async function deleteuser(id){
    try{
        let data=await fetch(`https://6321d2e9fd698dfa29000d7d.mockapi.io/users/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json"
            }
        })
        const users=await data.json();
        console.log(users);
        displayusers();

    }catch(err){
        console.log(err)
    }
}

async function adduser(){
    const username=document.querySelector(".name").value;
    const useravatar=document.querySelector(".avatarurl").value;

    let user=await fetch("https://6321d2e9fd698dfa29000d7d.mockapi.io/users",{
        method:"POST",
        body:JSON.stringify({
            name:username,
            avatar:useravatar
        }),
        headers:{
            "Content-Type":"application/json"
        }
    })

    displayusers();
}

var dataid;
async function edituser(id){
    console.log(id)
    
    try{

        let data=await fetch(`https://6321d2e9fd698dfa29000d7d.mockapi.io/users/${id}`,{
            method:"GET",
            header:{
                "Content-Type":"application/json",
            }
            
        });

        const user=await data.json();
        console.log(user) ;
        dataid=id;
        // console.log(userid,"user")
        document.querySelector(".name").value=user.name;
        document.querySelector(".avatarurl").value=user.avatar;
        document.getElementById("edbutton").style.visibility="visible";

    }catch(err){
        console.log(err)
    }
}


// async function editUser(){
//     //console.log(userid,"anotheredit")
//     try{
//         let updateduser=document.querySelector(".name").value;
//         let updatedavatar=document.querySelector(".avatarurl").value;
//         console.log(updateduser,updatedavatar)
//         let newdata={
//             name:updateduser,
//             avatar:updatedavatar,
//         };
//         let update1=await fetch(url +`/${userid}`,{
//             method :"PUT",
//             body :JSON.stringify(newdata),
//             header:{
//                 "Content-Type":"application/json",
//             }
//         });

//         // const userupdated=await update1.json();
//         console.log(update1,userid);
//         displayusers();

//     }catch(err){
//         console.log(err)
//     }
// }


// async function editUser(){
//     try{
//         let updateduser=document.querySelector(".name").value;
//         let updatedavatar=document.querySelector(".avatarurl").value;
//         console.log(updateduser,updatedavatar,dataid);
//         let updatedval=await fetch(`https://6321d2e9fd698dfa29000d7d.mockapi.io/users/${dataid}`,{
//             method:"PUT",
//             body:JSON.stringify({
//                 name:updateduser,
//                 avatar:updatedavatar,
//             }),
//             header:{
//                 "Content-Type":"application/json",
//             },
//         });
        
//         let values=await updatedval.json();
//         console.log(values);
//         displayusers();
//     }catch(err){
//         console.log(err)
//     }
// }

function editUser(){
    let updateduser=document.querySelector(".name").value;
    let updatedavatar=document.querySelector(".avatarurl").value;
    
    let data1={
        name:updateduser,
        avatar:updatedavatar,
    };
    // data1.name=updateduser;
    console.log(updateduser,updatedavatar,dataid);
    fetch(url + `/${dataid}`,{
        method:"PUT",
        body:JSON.stringify(data1),
        headers:{
            "Content-Type":"application/json"
        }
        }).then((resul)=>resul.json())
        .then((data)=>console.log(data))
        .catch((err)=>console.log(err))

    

    document.querySelector(".name").value="";
    document.querySelector(".avatarurl").value="";
    document.getElementById("edbutton").style.visibility="hidden";
    displayusers();

}