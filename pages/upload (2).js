import { useState } from 'react';
import { useSession, signOut, getSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/upload.module.css';
import sidebarStyles from '../styles/sidebar.module.css';

const inlineStyles = {
  parentContainer: {
    display: 'flex',
  },
  sidebar: {
    width: '250px',
    height: '100vh',
  },
};

export default function Upload() {
  const { data: session, status } = useSession();
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ramo, setRamo] = useState('');
  const [keywords, setKeywords] = useState('');
  const [previewURL, setPreviewURL] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      setPreviewURL(objectURL);
      setFile(selectedFile);
    }
  };

  const handlePreviewDelete = () => {
    setPreviewURL(null);
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('ramo', ramo);
    formData.append('keywords', keywords);

    const response = await fetch('/api/uploaddb', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      alert('Archivo subido con éxito');
      setPreviewURL(null);
      setFile(null);
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
      <title>Subir Archivo</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <div style={inlineStyles.parentContainer}>
        <div className={sidebarStyles.sidebar} style={inlineStyles.sidebar}>
          <button className={sidebarStyles.logoutButton} onClick={() => signOut()}>Cerrar sesión</button>
          <div className={sidebarStyles.sidebarItem}>
            <Image src="/svg/inicio.svg" alt="Inicio" width={40} height={40} className={sidebarStyles.sidebarIcon} />
            <Link href="/">Inicio</Link>
          </div>
          <div className={sidebarStyles.sidebarItem}>
            <Image src="/svg/perfil.svg" alt="Perfil" width={30} height={30} className={sidebarStyles.sidebarIcon} />
            <div className={sidebarStyles.sidebarText}>Perfil</div>
          </div>
          <div className={sidebarStyles.sidebarItem}>
            <Image src="/svg/busqueda.svg" alt="Buscador" width={30} height={30} className={sidebarStyles.sidebarIcon} />
            <Link href="/buscador_archivos">Buscador</Link>
          </div>
          <div className={sidebarStyles.sidebarItem}>
            <Image src="/svg/subir.svg" alt="Subir" width={30} height={30} className={sidebarStyles.sidebarIcon} />
            <Link href="/upload">Subir</Link>
          </div>
          <div className={sidebarStyles.sidebarItem}>
            <Image src="/svg/guardados.svg" alt="Guardados" width={30} height={30} className={sidebarStyles.sidebarIcon} />
            <div className={sidebarStyles.sidebarText}>Guardados</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <div className={styles.mainContentContainer}>
            <div className={styles.mainContent}>
              <div className={styles.header}>Crear Item</div>
              <form onSubmit={handleSubmit} className={styles.uploadSection}>
                <label htmlFor="file-upload" className={styles.button}>Subir Archivo</label>
                <input id="file-upload" type="file" accept="*" required className={styles.fileUpload} onChange={handleFileChange} />
                {previewURL && (
                  <div className={styles.filePreview}>
                    <img src={previewURL} alt="Vista previa" className={styles.previewImage} />
                    <button type="button" className={styles.deleteButton} onClick={handlePreviewDelete}>Eliminar</button>
                  </div>
                )}
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
                    <select className={styles.formInput} value={ramo} onChange={(e) => setRamo(e.target.value)}>
                      <option value="">Seleccione un ramo</option>
                      <option value="matematica">Matemática</option>
                      <option value="ciencia">Ciencia</option>
                      <option value="historia">Historia</option>
                      <option value="literatura">Literatura</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.formLabel}>Palabras Clave*</div>
                    <input type="text" className={styles.formInput} placeholder="Ingresa Tags que estén relacionados con el material" value={keywords} onChange={(e) => setKeywords(e.target.value)} required />
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
