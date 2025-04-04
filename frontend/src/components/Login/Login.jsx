
import React, {useState} from 'react';



const Login = () => {

  return (
  <div>
    <div className=" h-screen w-screen bg-[url('/src/assets/Blue.jpeg')] bg-cover bg-center bg-fixed m-0 p-0 items-center justify-center">
      <div className="flex flex-wrap items-center justify-center p-6">
        <div className="bg-white w-[850px] h-[450px] flex flex-row p-6 m-4 rounded-[15px] shadow-lg">
          <div className="text-white">
            <div className="bg-[url('/src/assets/log.jpeg')] bg-center bg-cover h-[400px] w-[300px] rounded-lg transition-opacity duration-2000 opacity-100 md:opacity-100 hidden md:block"></div>
          </div>
                  

          <div className="flex-grow ml-2">
            <div>
              <h1 className="font-['Bebas_Neue',_sans-serif] text-[#001338] my-1 text-[32px] flex items-center justify-center">STEP RIGHT IN</h1>
            </div>
            
                
            <form className="flex flex-col text-left items-center justify-center">
              <input className="mt-4  flex-none bg-gray-100 rounded-lg p-3 border-gray-300 border-[1.5px]  w-[320px]" type='email'  placeholder='Email or Phone'/>
              <div >
                <input className="mt-8 flex-none  bg-gray-100 rounded-lg p-3  border-gray-300 border-[1.5px] w-[320px]" type='password' placeholder='Password'></input>
                <div className="flex">
                  <div className="text-black text-s italic hover:underline mt-4 hover:cursor-pointer flex-1">Forgot your password?</div>
                  <div className="items-end flex-none">
                    <button className=" rounded-[20px] text-[16px] text-white bg-[#0d1a34] h-[40px] w-24 mt-4 hover:bg-[#21458f] hover:cursor-pointer">Log In</button>
                  </div>
                </div>
                  
              </div>
                  
                
            </form>

            <div className="text-black mt-2 flex items-center justify-center">
              <button className=" rounded-[20px] text-[16px] bg-zinc-200 h-[40px]  w-[320px] mt-4 p-2 hover:bg-[#dedede] hover:cursor-pointer text-black">
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  </svg>
                  
                  <div className="flex-grow items-center">
                    Continue with Google
                  </div>
                    
                </div>
              </button>              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> 
  )
}

export default Login