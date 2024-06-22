import React from 'react';
import Image from 'next/image';

const searchBarStyles = {
  container: {
    display: 'flex',
    width: '735.034px',
    height: '60.034px',
    padding: '20px 24px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    // gap: '10px',
    borderRadius: '80px',
    border: '2px solid #888',
    backgroundColor: '#FFF',
  },
  input: {
    width: '100%',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    padding: '0',
    marginTop: '1px',
    paddingRight: '30px',
    flex: 1,

  },
  icon: {
      // position: 'absoute',
      // right: '1000px',
      // top: '50%',
      // transform: 'translateY(-50%)',
      // pointerEvents: 'none',
      width: '10px',
      height: '10px',
      marginleft: '5px'
  }
};
/*<div className={sidebarStyles.sidebarItem}>
            <Image src="/svg/inicio.svg" alt="Inicio" width={40} height={40} className={sidebarStyles.sidebarIcon} />
            <Link href="/">Inicio</Link>
          </div>*/

const SearchBar = ({ placeholder, onChange }) => (
  <div style={searchBarStyles.container}>
    <input
      type="text"
      style={searchBarStyles.input}
      placeholder={placeholder}
      onChange={onChange}
    />
    {/* <Image
      src='/svg/lupa.svg'
      alt="Lupa"
      width={20}
      height={20}
      className={searchBarStyles.icon}
    /> */}
  </div>
);

export default SearchBar;
