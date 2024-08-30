import "./App.css";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
        <p className="text-xl text-gray-600">
          We&apos;re glad to see you again
        </p>
      </header>
      <main className="text-center mb-8">
        <p className="text-lg text-gray-700 mb-4">
          Your account is protected with our two-factor authentication system.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Enjoy a secure and seamless experience.
        </p>
      </main>
    </div>
  );
}

export default Home;
