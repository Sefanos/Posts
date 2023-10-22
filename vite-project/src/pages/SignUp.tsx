import Header from '../components/partials/Header'
import Footer from '../components/partials/Footer'
import SignUpSvg from '../assets/signUp_svg.svg';

export default function SignUp() {
    return (
        <>  
        <Header />
            <div className="flex items-center justify-center min-h-screen">
                <div className="container relative mx-auto max-w-screen-md p-6 border border-gray-100 bg-opacity-80 rounded-xl shadow-lg backdrop-blur-lg flex flex-col md:flex-row items-center">
                    <div className="ml-0 md:ml-8">
                        <img src={SignUpSvg} className="w-52 h-52" alt="Messaging Icon" />
                    </div>

                    <div className="flex flex-col w-full md:w-1/2 md:ml-8">
                        <h1 className="block text-lg font-new text-gray-800 m-4">Create Your Account:</h1>
                        <div className="mb-4">
                            <label htmlFor="Name" className="block text-sm font-new text-gray-600">Name:</label>
                            <input id="Name" type="text" className="mt-1 p-2 w-full border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-new text-gray-600">Email:</label>
                            <input id="email" type="email" className="mt-1 p-2 w-full border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-new text-gray-600">Password:</label>
                            <input id="password" type="password" className="mt-1 p-2 w-full border-2 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                        </div>
                    </div>
                </div>
            </div>
        <Footer />
        </>
    );
}
