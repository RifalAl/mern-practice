import {useState, useEffect, useCallback} from "react";

let logoutTimer;
const useAuth = () => {
  const [token, SetToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [uId, setUid] = useState();
  
  const loginHandler = useCallback((userId, token, expirationDate) => {
    SetToken(token);
    setUid(userId);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 30);
    
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId,
        token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logoutHandler = useCallback(() => {
    SetToken(false);
    setUid(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if(token && tokenExpirationDate){
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logoutHandler, remainingTime)
    }else{
      clearTimeout(logoutTimer);
    }
  }, [token, logoutHandler, tokenExpirationDate])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      loginHandler(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [loginHandler]); //always login user yg punya token di localstorage

  return {token, loginHandler, logoutHandler, uId }
}
 
export default useAuth;