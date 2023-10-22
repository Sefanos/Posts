
import MessagingSvg from '../assets/messaging_.svg'

export default function Login() {
  return (
    <>
        <div className="flex items-center justify-center h-screen">
        <div className="container relative mx-auto max-w-screen-md p-6 border border-gray-100 bg-opacity-80 rounded-xl shadow-lg backdrop-blur-lg flex items-center">
            {/* SVG on the right */}
            <div className="mr-8">
                <img src={MessagingSvg} className="w-52 h-52" alt="Messaging Icon" />
            </div>

            {/* Inputs on the left */}
            <div className="flex flex-col w-1/2 ml-8">
                <h1 className="block text-lg font-new text-gray-800 m-8" >Welcome to Posts Login Page :</h1>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-new text-gray-600">Email : </label>
                    <input id="email" type="email" className="mt-1 p-2 w-full border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-new text-gray-600">Password : </label>
                    <input id="password" type="password" className="mt-1 p-2 w-full border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                </div>
            </div>
        </div>
    </div>
    </>

  )
}
