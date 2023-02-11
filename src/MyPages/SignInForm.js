import React, { Component, useState } from "react";
import { LOGIN_USER } from "../assets/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";


function SignInForm () {
    
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  const [LoginUser , {error}] = useMutation(LOGIN_USER)
  const nav = useNavigate()

  async function HandleSubmit(){
    console.log(email , password)
    LoginUser({
      variables : {
        userId : email,
        password
      }
    }).then((e)=>{
      console.log(e , 'LOGIN SUCCESS')
      localStorage.setItem('uid' , email)
      nav('/editor/2')
    })

  }


    return (
      <div className="formCenter">
        <form className="formFields" onSubmit={HandleSubmit}>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              id="email"
              className="formFieldInput"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>

          <div className="formField">
            <button className="formFieldButton" onClick={()=>HandleSubmit()}>Sign In</button>{" "}
          </div>
        </form>
      </div>
    )
}

export default SignInForm;
