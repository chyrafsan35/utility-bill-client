import React, { use, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import Swal from 'sweetalert2';


const Login = () => {
    const { login, signInWithGoogle } = use(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();
    const emailRef = useRef();

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        login(email, password)
            .then(result => {
                console.log(result, 'Hi')
                Swal.fire({
                    title: "Successfully logged in !",
                    icon: "success",
                    draggable: true
                });
                e.target.reset();
                navigate(location.state || '/')
            })
            .catch(error => {
                console.log(error.message)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            })
    }

    const handleLoginWithGoogle = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result)
                navigate(location.state || '/')
            });
    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Please check your email!')
            })
            .catch()
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                    <h2 className='text-xl'>Login</h2>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form action="" onSubmit={handleLogin}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input ref={emailRef} type="email" className="input" placeholder="Email" name='email' />

                                <label className="label">Password</label>
                                <input type="password" className="input" placeholder="Password" name='password' />

                                <div >
                                    <a onClick={handleForgetPassword} className='text-blue-400 link link-hover'>Forgot password? </a>
                                </div>

                                <span className='mx-auto text-center'>Or</span>

                                <button onClick={handleLoginWithGoogle} className="btn bg-white text-black border-[#e5e5e5]">
                                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                    Login with Google
                                </button>

                                <div>Don't have an account? <Link to={'/register'}><a className="link link-hover"><span className='text-blue-600'>sign up</span></a></Link></div>
                                <button className="btn btn-neutral mt-4">Login</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;