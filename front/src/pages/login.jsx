import {useEffect, useRef, useState} from "react";
import Input from "../components/utils/input.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import PropTypes from 'prop-types';

function Login({redirect = "/"}) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState({});
  const navigate = useNavigate();
  let { state } = useLocation();
  redirect = state ? state.redirect : "/"

  useEffect(() => {
    if (localStorage.getItem('token')) navigate(redirect);
  }, [])

  async function handleSubmit() {
    const errors = {};
    if (!emailRef.current?.value) {
      errors.email = "L'email est requis";
    }
    if (!passwordRef.current?.value) {
      errors.password = "Choisissez votre mot de passe";
    }
    setError(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}api/login_check`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username: emailRef.current?.value, password: passwordRef.current?.value}),
        });

        if (!response.ok) {
          throw new Error('Les identifiants sont incorrects');
        }

        const data = await response.json();
        const {token} = data;

        localStorage.setItem('token', token);

        const userResponse = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}api/user/get`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await userResponse.json();
        localStorage.setItem('user', JSON.stringify(userData));
        window.location.replace(redirect);
      } catch (error) {
        console.error('Login error:', error.message);
        setError({global: error.message})
      }
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <form className="h-[calc(100vh-100px)] px-64 flex flex-col item justify-center w-full space-y-8">
      <div className="space-y-2">
        <Input name="email" label="Adresse mail" type="email" required={true} inputRef={emailRef} onKeyDown={handleKeyDown}/>
        <p className="text-red-700">{error?.email}</p>
      </div>
      <div className="space-y-2">
        <Input name="password" label="Mot de passe" type="password" required={true} inputRef={passwordRef} onKeyDown={handleKeyDown}/>
        <p className="text-red-700">{error?.password}</p>
      </div>
      <p className="text-red-700">{error?.global}</p>
      <button type="button" onClick={handleSubmit} className="bg-primary w-full py-4 mt-12 text-white">Se connecter</button>
    </form>
  )
}

Login.propTypes = {
  redirect: PropTypes.string
}

export default Login;
