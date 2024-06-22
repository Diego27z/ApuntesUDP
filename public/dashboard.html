import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    async function fetchDocuments() {
      const response = await fetch("/api/documents", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await response.json();
      setDocuments(data);
    }

    fetchDocuments();
  }, []);

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

  return (
    <>
      <h1>Dashboard de Apuntes UDP</h1>
      <input type="file" onChange={uploadFile} />
      <h2>Archivos Subidos</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc.filename}>{doc.originalname}</li>
        ))}
      </ul>
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
