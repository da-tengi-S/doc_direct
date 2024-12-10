import React, { useState } from 'react'

const Login = () => {
  const [state, setState] = useState("Sign up")
  const [email, setEmial] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onsubmmitHandeller = async (event) => {
    event.preventDefult()
    console.log(email)
  }

  return (
    <form className='min-h-[80vh] flex item-center' action="">
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:im-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg '>
        <p className='text-2xl font-semibold'>{state === "Sign up" ? "Create Account" : "Login"}</p>
        <p>Please {state === "Sign up" ? "Create Account" : "Login"} to book appointemnt </p>
        {
          state === "Sign up" && <div className='w-full'>
            <p>Full Name </p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.name)} value={name} />
          </div>
        }
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmial(e.target.email)} value={email} />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.password)} value={password} />
        </div>
        <button className='bg-primary text-white rounded-md w-full py-2 text-base'>{state === "Sign up" ? "Create Account" : "Login"}</button>

        {
          state === "Sign up"
            ? <p> Already have an Account ? <span onClick={() => setState('Login')} className='text-primary underline curser-pointer'>Login Here</span>  </p>
            : <p>Crate an new account ? <span onClick={() => setState('Sign up')} className='text-primary underline curser-pointer'>Click here</span>  </p>
        }
      </div>

    </form>
  )
}

export default Login