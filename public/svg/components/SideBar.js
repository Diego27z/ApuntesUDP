import Image from 'next/image';
import Link from 'next/link';

const sidebarStyles = {
  sidebar: {
    width: '95px',
    height: '100vh',
    backgroundColor: '#EDF5FF',
    padding: '144px 20.5px 529px 20.5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '0 auto',
    position: 'fixed',
    left: 0,
    top: 0,
  },
  sidebarItemContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '64px',
  },
  sidebarItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px', // Adjust as needed for spacing between icon and text
    cursor: 'pointer',
    textAlign: 'center',
  },
  sidebarIcon: {
    width: 'auto', // Adjust icon width if needed
    height: 'auto', // Adjust icon height if needed
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '3px',
  },
  sidebarText: {
    fontSize: '11px',
    textDecoration: 'none',
    color: '#000',
    textAlign: 'center',
  },
};

const SideBar = () => (
  <div className="sidebar" style={sidebarStyles.sidebar}>
    <div style={sidebarStyles.sidebarItemContainer}>
      <div className={sidebarStyles.sidebarItem}>
        <Image src="/svg/home.svg" alt="Inicio" width={27} height={27} className={sidebarStyles.sidebarIcon} />
        <Link href="/" style={sidebarStyles.sidebarText}>Inicio</Link>
      </div>
      <div className={sidebarStyles.sidebarItem}>
        <Image src="/svg/perfil.svg" alt="Perfil" width={18} height={20} className={sidebarStyles.sidebarIcon} />
        <Link href="/" style={sidebarStyles.sidebarText}>Perfil</Link>
      </div>
      <div className={sidebarStyles.sidebarItem}>
        <Image src="/svg/busqueda.svg" alt="Buscador" width={20} height={20} className={sidebarStyles.sidebarIcon} />
        <Link href="/buscador_archivos" style={sidebarStyles.sidebarText}>Buscador</Link>
      </div>
      <div className={sidebarStyles.sidebarItem}>
        <Image src="/svg/subir.svg" alt="Subir" width={19} height={19} className={sidebarStyles.sidebarIcon} />
        <Link href="/upload" style={sidebarStyles.sidebarText}>Subir</Link>
      </div>
      <div className={sidebarStyles.sidebarItem}>
        <Image src="/svg/guardados.svg" alt="Guardados" width={20} height={20} className={sidebarStyles.sidebarIcon} />
        <Link href="/" style={sidebarStyles.sidebarText}>Guardados</Link>
      </div>
      <div className={sidebarStyles.sidebarItem}>
        <Image src="/svg/salir.svg" alt="Salir" width={24} height={24} className={sidebarStyles.sidebarIcon} />
        <Link href="/" style={sidebarStyles.sidebarText}>Salir</Link>
      </div>
    </div>
  </div>
);

export default SideBar;
