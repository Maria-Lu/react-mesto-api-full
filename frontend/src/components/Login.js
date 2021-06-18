import { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailInput(evt) {
    setEmail(evt.target.value);
  };

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!email || !password) {
      return;
    }

    onLogin({
      email,
      password
    });
  };

  return (
    <section className="auth">
        <h1 className="auth__title">Вход</h1>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            onChange={handleEmailInput}
            className="auth__input"
            name="email"
            placeholder="Email"
            autoComplete="off"
            value={email}
            type="email"
            required
          ></input>
          <input
            onChange={handlePasswordInput}
            className="auth__input"
            name="password"
            placeholder="Пароль"
            autoComplete="off"
            type="password"
            value={password}
            required
          ></input>
          <button className="button auth__button-submit" type="submit">
            Войти
          </button>
        </form>
    </section>
  );
}

export default Login;
