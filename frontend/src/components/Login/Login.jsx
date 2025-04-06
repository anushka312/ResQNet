import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../Firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // toggle login/register

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Logged in successfully!");
      navigate("/");
    } catch (error) {
      console.error(error.message);
      alert("❌ Login failed: " + error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("🎉 Account created! You are now logged in.");
      navigate("/");
    } catch (error) {
      console.error(error.message);
      alert("❌ Registration failed: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("✅ Logged in with Google!");
      navigate("/");
    } catch (error) {
      console.error(error.message);
      alert("❌ Google Login failed: " + error.message);
    }
  };

  return (
    <div className="h-screen w-screen bg-[url('/src/assets/Blue.jpeg')] bg-cover bg-center bg-fixed m-0 p-0 items-center justify-center">
      <div className="flex flex-wrap items-center justify-center p-6">
        <div className="bg-white w-[850px] h-[480px] flex flex-row p-6 m-4 rounded-[15px] shadow-lg">
          <div className="text-white">
            <div className="bg-[url('/src/assets/log.jpeg')] bg-center bg-cover h-[400px] w-[300px] rounded-lg hidden md:block"></div>
          </div>

          <div className="flex-grow ml-2">
            <div>
              <h1 className="font-['Bebas_Neue',_sans-serif] text-[#001338] my-1 text-[32px] flex items-center justify-center">
                {isRegistering ? "CREATE AN ACCOUNT" : "STEP RIGHT IN"}
              </h1>
            </div>

            <form
              className="flex flex-col text-left items-center justify-center"
              onSubmit={isRegistering ? handleRegister : handleLogin}
            >
              <input
                className="mt-4 bg-gray-100 rounded-lg p-3 border-gray-300 border-[1.5px] w-[320px]"
                type="email"
                placeholder="Email or Phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="mt-4 bg-gray-100 rounded-lg p-3 border-gray-300 border-[1.5px] w-[320px]"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex justify-between w-[320px] mt-4">
                {!isRegistering && (
                  <div className="text-black text-sm italic hover:underline cursor-pointer">
                    Forgot your password?
                  </div>
                )}
                <button
                  type="submit"
                  className="rounded-[20px] text-[16px] text-white bg-[#0d1a34] h-[40px] w-24 hover:bg-[#21458f]"
                >
                  {isRegistering ? "Register" : "Log In"}
                </button>
              </div>
            </form>

            {/* Google Login */}
            <div className="text-black mt-2 flex items-center justify-center">
              <button
                className="rounded-[20px] text-[16px] bg-zinc-200 h-[40px] w-[320px] mt-4 p-2 hover:bg-[#dedede] text-black"
                onClick={handleGoogleLogin}
              >
                <div className="flex items-center justify-center gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                    alt="Google"
                    className="w-5 h-5"
                  />

                  Continue with Google
                </div>
              </button>
            </div>

            {/* Toggle login/register */}
            <div className="text-sm text-center mt-4 text-gray-600">
              {isRegistering ? (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={() => setIsRegistering(false)}
                    className="text-blue-600 font-medium cursor-pointer hover:underline"
                  >
                    Log In
                  </span>
                </>
              ) : (
                <>
                  Don’t have an account?{" "}
                  <span
                    onClick={() => setIsRegistering(true)}
                    className="text-blue-600 font-medium cursor-pointer hover:underline"
                  >
                    Register
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
