import { atom, useAtom } from 'jotai';

const jwtAtom = atom(null);

const usernameAtom = atom("Guest");

export function useLoginUsername() {
  const [loginUsername, setLoginUsernameAtom] = useAtom(usernameAtom);

  const setLoginUsername = (newLoginUsername) => {
    localStorage.setItem('loginUsername', newLoginUsername);
    setLoginUsernameAtom(newLoginUsername);
  };

  const getLoginUsername = () => {
    const storedLoginUsername = localStorage.getItem('loginUsername');
    if (storedLoginUsername && !loginUsername) {
      setLoginUsernameAtom(storedLoginUsername);
    }
    return loginUsername || storedLoginUsername;
  };

  return { loginUsername, setLoginUsername, getLoginUsername };
}

export function useJwt() {
  const [jwt, setJwtAtom] = useAtom(jwtAtom);

  const setJwt = (newJwt) => {
    localStorage.setItem('jwt', newJwt);
    setJwtAtom(newJwt);
  };

  const getJwt = () => {
    const storedJwt = localStorage.getItem('jwt');
    if (storedJwt && !jwt) {
      setJwtAtom(storedJwt);
    }
    return jwt || storedJwt;
  };

  const clearJwt = () => {
    localStorage.removeItem('jwt');
    setJwtAtom(null);
  };

  return { jwt, setJwt, getJwt, clearJwt };
}
