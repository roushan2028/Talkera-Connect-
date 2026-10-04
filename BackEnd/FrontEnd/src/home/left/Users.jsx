import React from 'react'
import User from './User'
import useGetAllUsers from '../../context/userGetAllUser'


export default function Users({ onUserSelected }) {
    const [allUsers,loading] = useGetAllUsers();
    console.log(allUsers);

    return (
        <div className='my-2 min-h-0 flex-1 overflow-y-auto'>
            
            {allUsers.map((user,index)=>{
                return <User user={user} key={user._id ?? index} onUserSelected={onUserSelected} />
            })}

        </div>
    )
}
