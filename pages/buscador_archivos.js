import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
// import sidebarStyles from '../styles/sidebar.module.css';
// import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '../public/svg/components/SearchBar';
import FilesGrid from '../public/svg/components/FilesGrid'; 
import SideBar from '../public/svg/components/SideBar';

const inlineStyles = {
  parentContainer: {
    display: 'flex'
  },
  sidebar: {
    width: '250px',
    height: '100vh',
  },
  mainContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '20px',
    marginLeft: '250px',
  },
  titleContainer: {
    textAlign: 'center',
  },
  title: {
    marginBottom: '14px',
  },
  titleParagraph: {
    marginBottom: '60px'
  },
  categoriesContainer: {
    marginTop: '20px',
    width: '100%',
  },
  searchBarContainer: {
    paddingTop: '46px',
    paddingBottom: '46px',
  },
  filterContainer: {
    display: 'flex',
    // justifyContent: 'space-around',
    width: '763px',
    height: '32px',
    paddingTop: '18px',
    paddingBottom: '18px',
    gap: '11px',
    paddingLeft: '50px',
  },
  dropdownButtonBorder: {
    display: 'flex',
    width: '110px',
    height: '32px',
    padding: '5px 10px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    flexShrink: '0',
    borderRadius: '5px',
    border: '1px solid var(--Black, #000)',
    position: 'relative',
    cursor: 'pointer',
  },
  dropdownButton: {
    display: 'flex',
    // width: '100%',
    height: '32px',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: '0',
    gap: '5px',
    paddingRight: '11px',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: '0',
    width: '100%',
    backgroundColor: '#fff',
    border: '1px solid #000',
    borderRadius: '5px',
    marginTop: '5px',
    zIndex: '1',
    display: 'none',
  },
  dropdownMenuVisible: {
    display: 'block',
  },
  dropdownItem: {
    padding: '8px 10px',
    cursor: 'pointer',
  },
  clearButton: {
    border: 'none',
    background: 'none',
    color: 'blue',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100px',
    padding: '0',
    paddingTop: '7px', // arreglar padding
    paddingLeft: '10px',
    fontWeight: '700',
    // fontFamily: 'Montserrat',
    color: 'color: var(--Black, #000)'
  }
  
};

const DropdownButton = ({ label, options, onSelect, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div style={{ ...inlineStyles.dropdownButtonBorder, ...style }} onClick={handleDropdownClick}>
      <div style={inlineStyles.dropdownButton}>
        <span style={inlineStyles.dropdownButtonText}>{selectedOption || label} </span>
        <Image src="/svg/dropdownButton-arrow.svg" alt="Arrow" width={12} height={12} />
      </div>
      <div style={{ ...inlineStyles.dropdownMenu, ...(isOpen && inlineStyles.dropdownMenuVisible) }}>
        {options.map((option, index) => (
          <div
            key={index}
            style={inlineStyles.dropdownItem}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [documents, setDocuments] = useState(null);
  const [selectedCategory, setSetelectedCategory] = useState()

  const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6', 'Category 7', 'Category 8', 'Category 9', 'Category 10'];
  const files = ['Archivo 1', 'Archivo 2', 'Archivo 3', 'Archivo 4', 'Archivo 5', 'Archivo 6', 'Archivo 7', 'Archivo 8', 'Archivo 9', 'Archivo 10']
  const dropdownOptions = ['Solemnes', 'Controles', 'Tareas', 'Apuntes', 'Proyectos'];
  const dropdownOptions2 = ['Option 1', 'Option 2', 'Option 3'];
  const dropdownOptions3 = ['PDF', 'Doc', 'Imagen', 'Modelo 3D', 'Adobe'];

  useEffect(() => {
    async function fetchDocuments() {
      // const response = await fetch("/api/documents", {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      //   },
      // });
      const filteredDocuments = await fetch(`/api/documents?category=${selectedCategory}`)
      // const data = await response.json();
      setDocuments(filteredDocuments);
    }

    fetchDocuments();
  }, [selectedCategory]);

  async function uploadFile(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: formData,
    });

    const result = await response.json();
    alert(result.message);
  }

  function handleCategoryClick(category) {
    alert(`You clicked on ${category}`);
  }

  function handleFilterClick(filter) {
    // alert(`You clicked on ${filter}`);
  }

  function handleClearClick() {
    alert('Borrar todo');
  }

  const customWidthStyle = {
    width: '164px',
  };
  

  return (
    <>
      <div style={inlineStyles.parentContainer}>

        <SideBar/>
        {/* <div className={sidebarStyles.sidebar} style={inlineStyles.sidebar}>
          <button className={sidebarStyles.logoutButton} onClick={() => signOut()}>Cerrar sesión</button>
          <div className={sidebarStyles.sidebarItem}>
            <Image src="/svg/inicio.svg" alt="Inicio" width={40} height={40} className={sidebarStyles.sidebarIcon} />
            <div className={sidebarStyles.sidebarText}>Inicio</div>
          </div>
          <div className={sidebarStyles.sidebarItem}>
            <Image src="/svg/perfil.svg" alt="Perfil" width={30} height={30} className={sidebarStyles.sidebarIcon} />
            <div className={sidebarStyles.sidebarText}>Perfil</div>
          </div>
          <div className={sidebarStyles.sidebarItem}>
            <Image src="/svg/busqueda.svg" alt="Buscador" width={30} height={30} className={sidebarStyles.sidebarIcon} />
            <div className={sidebarStyles.sidebarText}>Buscador</div>
          </div>
          <div className={sidebarStyles.sidebarItem}>
            <Image src="/svg/subir.svg" alt="Subir" width={30} height={30} className={sidebarStyles.sidebarIcon} />
            <Link href="/upload">Subir</Link>
          </div>
          <div className={sidebarStyles.sidebarItem}>
            <Image src="/svg/guardados.svg" alt="Guardados" width={30} height={30} className={sidebarStyles.sidebarIcon} />
            <div className={sidebarStyles.sidebarText}>Guardados</div>
          </div>
        </div> */}

        <div style={inlineStyles.mainContentContainer}>
          <div style={inlineStyles.searchBarContainer}>
            <div style={inlineStyles.titleContainer}>
              <SearchBar placeholder="Buscar archivos..." onChange={(e) => console.log(e.target.value)} />
            </div>
          </div>
          
        
          <div style={inlineStyles.filterContainer}>
            <DropdownButton label="Categoría" options={dropdownOptions} onSelect={handleFilterClick} />
            <DropdownButton label="Duración" options={dropdownOptions2} onSelect={handleFilterClick} />
            <DropdownButton label="Tipo de archivo" options={dropdownOptions3} onSelect={handleFilterClick} style={customWidthStyle} />
            <DropdownButton label="Recientes" options={dropdownOptions2} onSelect={handleFilterClick} />
            <button style={inlineStyles.clearButton} onClick={handleClearClick}>Borrar todo</button>
          </div>

        <div>
          <div style={inlineStyles.categoriesContainer}>
            <FilesGrid categories={files} onCategoryClick={handleCategoryClick} />
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
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
