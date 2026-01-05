import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';

const Register = () => {
    const { register, signInWithGoogle, setUser, updateUser } = use(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photo = e.target.photo.value;
        console.log(name, photo)

        const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
        const lengthPattern = /^.{6,}$/;

        if (!casePattern.test(password)) {
            setError('There must have at least one UpperCase and one LowerCase in password')
            return;
        } else if (!lengthPattern.test(password)) {
            setError('Password length should be at least 6 characters ')
            return;
        }

        register(email, password)
            .then(result => {
                const user = result.user;
                console.log('Here is the result', result)
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser(user)
                        const newUser = {
                            name: result.user.displayName,
                            email: result.user.email,
                            image: result.user.photoURL,
                        }

                        //adding user to database
                        fetch('https://utility-api-server.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                            },
                            body: JSON.stringify(newUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log('User data', data);
                            })
                    })


            })
            .catch(error => console.log(error))
        e.target.reset();
        Swal.fire({
            title: "Successfully registered !",
            icon: "success",
            draggable: true
        });
        navigate('/')
    }

    const handleLoginWithGoogle = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result, location)
                navigate('/')
            });
    }

    return (
        <div className="flex flex-col justify-center items-center py-15">
            <div className="text-center lg:text-left">
                <h2 className='text-xl mb-8'>Register</h2>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-sm mx-auto rounded-sm">
                <div>
                    <form className="card-body" action="" onSubmit={handleRegister}>
                        <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input type="text" className="input"  name='name' />

                            <label className="label">Email</label>
                            <input type="email" className="input"  name='email' />

                            <label className="label">Photo URL</label>
                            <input type="text" className="input"  name='photo' />

                            <label className="label">Password</label>
                            <input type="password" className="input"  name='password' />


                            <span className='mx-auto text-center'>Or</span>

                            <button onClick={handleLoginWithGoogle} className="btn bg-white text-black border-[#e5e5e5]">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Register with Google
                            </button>

                            <div>Already have an account? <Link to={'/login'}><a className="link link-hover"><span className='text-blue-600'>login</span></a></Link></div>
                            <button className="btn btn-primary text-white mt-4">Register</button>
                            {
                                error && <small className='text-red-400 text-sm'>{error}</small>
                            }
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;