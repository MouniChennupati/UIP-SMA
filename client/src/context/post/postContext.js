// import {createContext, useState} from 'react';

// const UserContext = createContext();

// export function PostProvider({children}){
//     const [post, setPost] = useState({
//         username: '',
//         userid:'',
//         email: '',
//         password: '',
//         authenticated: false,
//     });

//     const updateUser = (name, value) => {
//         setUser({...user, [name]:value});
//     }

//     return(
//         <UserContext.Provider value={{user, updateUser}}>
//             {children}
//         </UserContext.Provider>
//     )
// }

// export default UserContext;