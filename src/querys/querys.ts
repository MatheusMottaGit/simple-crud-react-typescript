import { FormEvent } from "react";
import { connection } from "../connection/axios";
import { UserProps } from "../types/types";

export const CreateUser = (user: UserProps) =>{
    connection.post('/users', user)
        .then(response=>{
            console.log(response.data)
        })

        console.log('user created!')
}

export const UpdateUser = (event: FormEvent, id: number, user: UserProps) =>{

    event.preventDefault()

    connection.put(`/users/${id}`, user)
        .then(response=>{
            console.log(response.data)
        })

        console.log('updated!')
} 

export const DeleteUser = (event: FormEvent, id: number) =>{
    event.persist()
    connection.delete(`/users/${id}`)
        console.log('deleted!')
}