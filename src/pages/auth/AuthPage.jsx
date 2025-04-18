import { useMemo, useState } from "react";
import { useForm, useAuthStore } from "../../hooks";
import { patterns } from "../../utilitys/patterns";
import { Link } from "react-router-dom";
import { LayoutAuth } from "./LayoutAuth";

const formValidations = {
  email: (value) => ( value.length >= 10 && patterns.email.js.test(value) ),
  password: (value) => ( value.length >= 5 )
}

export const AuthPage = () => {

  // estado para formulario
  const { email, password, emailValid, passwordValid, handleOnInputChange, formObject, isValidForm } = useForm({email: '', password: ''}, formValidations);

  // estado para manejar cuando se hace submit y mostrar errores del formulario
  const [formSubmitted, setFormSubmitted] = useState(false)

  // custom hook para interactuar con su estado
  const {status, handleStartLogin} = useAuthStore();

  // evaluando si se deshabilitara el botón de login
  const isChecking = useMemo(() => status === 'checking', [status])
  
  // funcion de ayuda para el envio del formulario
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if(!isValidForm) return;

    handleStartLogin({email, password})
  };

  return (
    <LayoutAuth>
      <h1 className="text-2xl font-bold text-center text-secondary mb-2">Login page</h1>
       <form className="flex flex-col gap-1" onSubmit={handleOnSubmit}>
          <div className="flex flex-col gap-px">
            <label htmlFor="email" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500" >
              Email
            </label>
            <input type="email" name="email" id="email" value={email} onChange={handleOnInputChange} minLength={10} required autoComplete="on" pattern={patterns.email.html} placeholder="example@00.com" 
              className={`p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500 peer/email ${(!emailValid && formSubmitted) ? 'invalid:ring-red-400' : ''}`} />
            <span className={`text-slate-500 text-xs ${(!emailValid && formSubmitted) ? 'peer-invalid/email:text-red-500' : ''} `}>
              Type your email. (more than 9 characters)
            </span>
          </div>
          <div className="flex flex-col gap-px">
            <label htmlFor="password" className="font-semibold text-slate-800 after:content-['*'] after:ml-0.5 after:text-red-500" >
              Password
            </label>
            <input type="password" name="password" id="password" value={password} onChange={handleOnInputChange} minLength={5} required autoComplete="on" placeholder="*******" 
              className={`p-1 rounded-md ring-2 ring-sky-200 focus:ring-sky-500 peer/password ${(!passwordValid && formSubmitted) ? 'invalid:ring-red-400' : ''}`} />
            <span className={`text-slate-500 text-xs ${(!passwordValid && formSubmitted) ? 'peer-invalid/password:text-red-500' : ''} `}>
              Type your password. (more than 4 characters)
            </span>
          </div>
          <Link to="/auth/register" className="text-sm text-sky-500">Don't have an account?, register here.</Link>
          <button type="submit" disabled={isChecking} className="bg-secondary text-white px-2 py-1 w-fit self-center rounded-lg hover:scale-105 active:scale-95 font-semibold disabled:bg-sky-100">
            Login
          </button>
        </form>
    </LayoutAuth>
    
  );
};
