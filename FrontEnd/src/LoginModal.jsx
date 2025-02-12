import React, { useState } from "react";
import styles from "./LoginModal.module.css";

const LoginModal = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = {username: "admin", password: "admin"}

  // Se ja estiver logado nao precisa fazer login novamente
  function alredyLogged(){
    if(localStorage.getItem("username") != null)
      setIsLogged(true);
  }
  const handleLogin = () => {
    // TODO: salvar userId no localstorage e criar opção de deslogar no App.jsx
    if(user.username == username && user.password == password){
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      setIsLogged(true);
    }
    else{
      alert("usuário não encontrado, tente novamente")
    }
  }
// checa se já está logado antes de renderizar
  React.useEffect(() => {
    alredyLogged()
 },[]);

  
  return (
    <>
    {/* renderiza apenas se não estiver logado */}
      {!isLogged && (
        <>
          <div className={styles.darkBG} onClick={() => setIsLogged(false)} />
          <div className={styles.centered}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h5 className={styles.heading}>Faça login para continuar</h5>
              </div>
              <div className={styles.modalContent}>
                <input
                  type="text"
                  placeholder="Usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.inputField}
                />
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.inputField}
                />
              </div>
              <div className={styles.modalActions}>
                <div className={styles.actionsContainer}>
                  <button className={styles.loginBtn} onClick={handleLogin}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginModal;