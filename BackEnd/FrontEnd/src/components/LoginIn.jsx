import React from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { API_URL } from '../config.js';

function LoginIn() {
  const { setAuthUser } = useAuth();
  const { 
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    let userInfo = {
      email: data.email,
      password: data.password
    }
    await axios.post(`${API_URL}/chat/login`, userInfo, {
      withCredentials: true
    })
      .then((response) => {
      console.log(response);
      if (response.data) {
        toast.success("LogIn successfull! ");
      }
      localStorage.setItem("chat", JSON.stringify(response.data));
      setAuthUser(response.data);
    })
    .catch(err => {
      const message = err.response?.data?.message || err.message || "Login failed.";
      toast.error("Error: " + err.response.data.message);
    })
}

return (
  <>
    <div>
      <div className='flex h-screen justify-center items-center '>
        <form onSubmit={handleSubmit(onSubmit)} action="" className='border-2 border-slate-900 rounded-3xl px-20 py-8 bg-gray-300'>
          <h1 className='h-10 text-3xl font-bold text-black text-center'>Login with your <span className='text-blue-500'>Account</span></h1>
          <div className='mt-5 '>
            <div className='mt-5'>
              <label className="input validator">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input type="email" placeholder="mail@site.com" className='text-blue-300' {...register("email", { required: true })} required />
              </label>
              {errors.email && <div>This field is required</div>}
            </div>

            <div className='mt-5'>
              <label className="input validator">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                    ></path>
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  className='text-blue-400'
                  {...register("password", { required: true })}
                />
              </label>
              {errors.password && <div>This field is required</div>}

            </div>
            <div className='mt-5'>

              <div className='text-center text-black'>
                <button type="submit" value="login" className='bg-blue-600 border-0 border-black rounded-3xl w-full mt-2 h-9'>LogIn</button>
                <p className='mt-5'>Don't have any Account? <Link to={"/signup"} className='text-blue-600 font-semibold'>SignUp</Link></p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </>
)
}

export default LoginIn