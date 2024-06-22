import { useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import sidebarStyles from '../styles/sidebar.module.css';
import SearchBar from '../public/svg/components/SearchBar'; 
import CategoriesGrid from "../public/svg/components/CategoriesGrid"; 
import SideBar from "../public/svg/components/SideBar";

const inlineStyles = {
  parentContainer: {
    display: 'flex',
    height: '100vh',
    backgroundColor: 'FFFFFF'
  },
  sidebar: {
    width: '295px',
  },
  mainContentContainer: {
    flex: 1,
    padding: '20px', 
    textAlign: 'center',
    marginLeft: '95px', // Ajuste para que no se superponga con el sidebar
    marginTop: '50px',
  },
  titleContainer: {
    textAlign: 'center',
    marginBottom: '20px', // Añadir margen 
  },
  title: {
    marginBottom: '14px',
  },
  titleParagraph: {
    marginBottom: '20px', // Ajuste del margen inferior
    marginTop: '14px'
  },
  searchBarContainer: {
    paddingBottom: '60px',
    paddingTop: '60px',
    width: '100%',
    maxWidth: '1000px',
    margin: '0 auto', // Centra la barra de búsqueda
    marginLeft: '445px' // Arreglar padding de SearchBar
  },
  categoriesContainer: {
    marginTop: '20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap', // Ajuste para que las categorías se ajusten correctamente
    marginLeft: '250px'
  },
  filesContainer: {
    marginTop: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
  },
  fileCard: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    width: 'calc(33.333% - 20px)',
    boxSizing: 'border-box',
    textAlign: 'center',
    cursor: 'pointer', // Añade el cursor de puntero para indicar que es clicable
  },
  fileIcon: {
    width: '50px',
    height: '50px',
    marginBottom: '10px',
  },
};

const fileIcons = {
  pdf: '/svg/pdf.png',
  docx: '/svg/docx.png',
  png: '/svg/png.png',
  jpg: '/svg/jpg.jpg',
};

function getFileIcon(filename) {
  const extension = filename.split('.').pop();
  return fileIcons[extension] || '/svg/generico.png'; // Imagen por defecto
}

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const categories = [
    'Taller de Diseño Industrial III',
    'Taller Factoría',
    'Diseño de Información',
    'Diseño Editorial II',
    'Ramo 5',
    'Ramo 6',
    'Ramo 7',
    'Ramo 8',
    'Ramo 9',
    'Ramo 10'
  ];

  useEffect(() => {
    async function fetchFiles() {
      const response = await fetch('/api/files');
      const data = await response.json();
      setFiles(data);
    }

    fetchFiles();
  }, []);

  const handleFileClick = (file) => {
    router.push({
      pathname: '/ver_archivo',
      query: { path: file.path, name: file.name, description: file.description },
    });
  };

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <>
      <div style={inlineStyles.parentContainer}>
        <SideBar/>
        <div style={inlineStyles.mainContentContainer}>
          <div style={inlineStyles.titleContainer}>
            <h1 style={inlineStyles.title}>Bienvenid@, {session.user.name.toUpperCase()}</h1>
            <h1>a la biblioteca colaborativa UDP</h1>
            <p style={inlineStyles.titleParagraph}>Explora material y archivos creados por compañeros y pares de la comunidad de diseño UDP.</p>  
          </div>

          <div style={inlineStyles.searchBarContainer}>
            <SearchBar placeholder="Buscar ramo..." onChange={(e) => console.log(e.target.value)} />
          </div>

          <h2>Seleccionar ramo</h2>
          
          <div style={inlineStyles.categoriesContainer}>
            <CategoriesGrid categories={categories} onCategoryClick={(category) => alert(`You clicked on ${category}`)} />
          </div>
          <div style={inlineStyles.filesContainer}>
            <h2>Archivos Subidos</h2>
            {files.length > 0 ? (
              files.map((file) => (
                <div key={file.name} style={inlineStyles.fileCard} onClick={() => handleFileClick(file)}>
                  <img src={getFileIcon(file.name)} alt={file.name} style={inlineStyles.fileIcon} />
                  <h3>{file.name}</h3>
                </div>
              ))
            ) : (
              <p>No hay archivos subidos.</p>
            )}
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
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
