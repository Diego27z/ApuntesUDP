import Head from 'next/head';
import Link from 'next/link';
import { useSession, signOut, getSession } from 'next-auth/react';
import { useState } from 'react';
import styles from '../styles/upload.module.css';
import SideBar from "../public/svg/components/SideBar";

const inlineStyles = {
  parentContainer: {
    display: 'flex',
  },
  sidebar: {
    width: '95px',
    height: '100vh',
  },
};

export default function Upload() {
  const { data: session, status } = useSession();
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('description', description);

    const response = await fetch('/api/uploadbd', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      alert('Archivo subido con éxito');
    } else {
      alert('Error al subir el archivo');
    }
  };

  if (status === 'loading') {
    return <p>Cargando...</p>;
  }

  if (!session) {
    return (
      <div className={styles.mainContent}>
        <p>Debes iniciar sesión para acceder a esta página.</p>
        <Link href="/login">Iniciar sesión</Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Subir Archivo</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div style={inlineStyles.parentContainer}>
        <SideBar />
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <div className={styles.mainContentContainer}>
            <div className={styles.mainContent}>
              <div className={styles.header}>Crear Item</div>
              <form onSubmit={handleSubmit} className={styles.uploadSection}>
                <div className={styles.uploadContainer}>
                  <label htmlFor="file-upload" className={styles.uploadLabel}>
                    <img src="/svg/nube.svg" alt="Nube" className={styles.cloudIcon} />
                    Subir Archivo
                  </label>
                  <input id="file-upload" type="file" className={styles.fileUpload} onChange={(e) => setFile(e.target.files[0])} required />
                </div>
                <div className={styles.formSection}>
                  <div className={styles.formGroup}>
                    <div className={styles.formLabel}>Título*</div>
                    <input type="text" className={styles.formInput} placeholder="¿Cómo le pondrás a tu archivo?" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.formLabel}>Descripción*</div>
                    <input type="text" className={styles.formInput} placeholder="Detalla de qué trata el material que subirás" value={description} onChange={(e) => setDescription(e.target.value)} required />
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.formLabel}>Seleccione su ramo*</div>
                    <select className={styles.formInput}>
                      <option value="">Seleccione un ramo</option>
                      <option value="matematica">Matemática</option>
                      <option value="ciencia">Ciencia</option>
                      <option value="historia">Historia</option>
                      <option value="literatura">Literatura</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.formLabel}>Palabras Clave*</div>
                    <input type="text" className={styles.formInput} placeholder="Ingresa Tags que estén relacionados con el material" />
                  </div>
                </div>
                <div className={styles.submitButton}>
                  <button type="submit">Crear Item</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
