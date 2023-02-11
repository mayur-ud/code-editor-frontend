import React, { Component, useState } from "react";
import { REGISTER_USER } from "../assets/queries";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

function SignUpForm ({setShow}) {
  
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [name , setName] = useState('')

  const [RegisterUser , {error}] = useMutation(REGISTER_USER)
  const nav = useNavigate()



  async function handleSubmit(e) {
    e.preventDefault();
    
    await RegisterUser({ variables : {
        userName : name,
        userId : email,
        password
      }
  }).then((resp)=>{
    console.log(resp)
    setShow('login')
    
  }).catch((e)=>{
    console.error(e)
  })

    console.log(email,password,name);
    // console.log(this.state);
    }

    return (
      <div className="formCenter">
        <form onSubmit={(e)=>{handleSubmit(e)}} className="formFields">
          <div className="formField">
            <label className="formFieldLabel" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="formFieldInput"
              placeholder="Enter your full name"
              name="name"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
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
            <button className="formFieldButton" onClick={(e)=>{handleSubmit(e)}}>Sign Up</button>{" "}
          </div>
        </form>
      </div>
    );
  }
export default SignUpForm;
