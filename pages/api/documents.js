import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const documents = [
    { originalname: "Documento1.pdf", filename: "1.pdf", mimetype: "application/pdf", size: 1024 },
    { originalname: "Documento2.docx", filename: "2.docx", mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", size: 2048 },
  ];

  res.status(200).json(documents);
};
