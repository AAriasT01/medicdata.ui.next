import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you are looking for does not exist.
        </p>
        <Link href="/">
          <a className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300">
            Go back to Home
          </a>
        </Link>
      </div>
    </div>
  );
}
