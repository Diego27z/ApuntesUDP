import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

const inlineStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  thumbnail: {
    width: '200px',
    height: 'auto',
    marginBottom: '20px',
  },
  iframe: {
    width: '80%',
    height: '80vh',
    border: 'none',
  },
};

export default function VerArchivo() {
  const router = useRouter();
  const { path, name, description, thumbnail } = router.query;

  return (
    <div style={inlineStyles.container}>
      <Head>
        <title>{name} - Ver Archivo</title>
      </Head>
      <h1>{name}</h1>
      <p>{description}</p>
      <Image src={thumbnail} alt={`Thumbnail of ${name}`} width={200} height="auto" />
      <iframe src={path} style={inlineStyles.iframe} />
    </div>
  );
}
