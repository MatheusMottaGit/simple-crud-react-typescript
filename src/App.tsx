import { FormEvent, useEffect, useState } from "react"
import { connection } from "./connection/axios"
import { CreateUser, DeleteUser, UpdateUser } from "./querys/querys"
import { UserProps } from "./types/types"
import * as Dialog from '@radix-ui/react-dialog'

const userPropsBeforeCreated: UserProps = {
  name: '',
  email: ''
}

function App() {

        const [users, setUsers] = useState(userPropsBeforeCreated)
        const [usersList, setUsersList] = useState<UserProps[]>([])

       const handleSubmit = (event: FormEvent) =>{
          event.preventDefault()
          CreateUser(users)
        }

          useEffect(() => {
            connection.get('/users')
              .then(response=>{
                setUsersList(response.data)
              })
          }, [])

  return (
    <>
      <input 
      type="text" 
      placeholder="name..."
      onChange={(e)=>{
        setUsers({...users, name: e.target.value})
      }}
      />

      <input 
      type="text" 
      placeholder="e-mail..."
      onChange={(e)=>{
        setUsers({...users, email: e.target.value})
      }}
      />

      <button
      onClick={handleSubmit}>
        send
      </button>

      <div>
        {
          usersList.map(user=>(
            <>
              <p key={user.id}>{user.name}</p>
              <Dialog.Root>
                <Dialog.Trigger>
                  delete
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Content>
                    <Dialog.Title>You sure you want to delete {user.name}'s profile?</Dialog.Title>
                    <button onClick={
                    (event)=>{
                      DeleteUser(event, user.id!)
                    }
                  }>delete</button>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>

              <Dialog.Root>
                <Dialog.Trigger onClick={()=>{
                  setUsers({
                    name: '',
                    email: '',
                    id: users.id
                  })
                }}>
                  edit
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Content>
                    <Dialog.Title>
                      Edit {user.name}'s profile
                    </Dialog.Title>

                    <input
                    placeholder='name...' 
                    type="text" 
                    onChange={(event)=>{
                      setUsers({...users, name: event.target.value})
                    }}
                    />

                    <input
                    placeholder='e-mail...' 
                    type="email" 
                    onChange={(event)=>{
                      setUsers({...users, email: event.target.value})
                    }}
                    />

                    <button onClick={(event)=>{
                      UpdateUser(event, user.id!, users)
                    }}>
                      edit
                    </button>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </>
          ))
        }
      </div>

    </>
  )
}

export default App
