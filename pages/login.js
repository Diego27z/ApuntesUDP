import { signIn } from "next-auth/react";

const inlineStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: '#666',
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  buttonImage: {
    marginRight: '10px',
  },
  subtitle: {
    marginTop: '10px',
    color: '#666',
    fontSize: '0.9rem',
  },
};

export default function Login() {
  return (
    <div style={inlineStyles.container}>
      <h1 style={inlineStyles.title}>Inicia sesión en Apuntes UDP</h1>
      <button style={inlineStyles.button} onClick={() => signIn("google")}>
        <img src="/svg/google.png" alt="Google icon" style={inlineStyles.buttonImage} />
        <p style={inlineStyles.subtitle}>
       Continuar con Google
      </p>
      </button>
      <p style={inlineStyles.subtitle}>
        Ingresa con tu mail UDP para empezar a compartir apuntes y material con tus compañeros!
      </p>
    </div>
  );
}
