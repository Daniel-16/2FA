import "./App.css";
import { useState } from "react";
import { auth } from "../config/firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(email, password);
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created successfully");

      // Send email verification
      await sendEmailVerification(userCredential.user);
      console.log("Verification email sent");
      setMessage("Verification email sent! Please check your email to verify.");
    } catch (error) {
      setError(error.message);
      console.error("Error creating user:", error.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("User signed in with Google successfully");
      navigate("/home");
    } catch (error) {
      setError(error.message);
      console.error("Error signing in with Google:", error.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">2FA Project</h1>
      <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {message && <p className="text-green-500 mt-4">{message}</p>}
      <form className="mt-8 space-y-6 w-full max-w-md" onSubmit={handleSignUp}>
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            value={email}
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            value={password}
            type="password"
            autoComplete="new-password"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center w-full max-w-md mt-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <p className="mx-4 text-gray-500">or</p>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="mt-4 w-full max-w-md">
        <button
          onClick={handleGoogleSignIn}
          className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          <img
            className="h-5 w-5 mr-2"
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
          />
          Sign in with Google
        </button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
