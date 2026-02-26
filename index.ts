import express, { Request, Response } from "express";
import { prisma } from "./lib/prisma";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/*app.get("/etudiants", (req: Request, res: Response) => {
  res.json(data);
});
app.get("/etudiants/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const etudiant = data.find((elm) => elm.id == id);
  if (etudiant) {
    res.status(201).json(etudiant);
  } else {
    res.status(404).json({ message: "etudiant not found" });
  }
});
app.get("/etudiants/ville/:ville", (req: Request, res: Response) => {
  const { ville } = req.params;
  const etudiants = data.filter(
    (elm) => elm.city.toLowerCase() == ville.toLowerCase(),
  );
  if (etudiants.length > 0) {
    res.json(etudiants);
  } else {
    res.status(404).json({ message: "no etudiant found in this city" });
  }
});
app.post("/etudiants", (req: Request, res: Response) => {
  const { name, city, Country } = req.body;
  data.push({ id: data.length + 1, name, city, Country });
  res.status(201).json({ message: "etudiant created", name, city, Country });
});
app.put("/etudiants/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, city, Country } = req.body;
  const updatedData = data.map((elm) =>
    elm.id == id ? { id: elm.id, name, city, Country } : elm,
  );
  res.json(updatedData);
});
app.delete("/etudiants/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = data.filter((elm) => elm.id != id);
  res.json(updatedData);
});

app.get("/test/:name/:ville", (req: Request, res: Response) => {
  const { name, ville } = req.params;
  res.json({ name, ville });
});
app.get("/test", (req: Request, res: Response) => {
  res.json({ message: "hello world" });
});

app.get("/", (req, res) => {
  res.json({ data });
});

app.post("/create", (req: Request, res: Response) => {
  const { name } = req.body;
  res.status(201).json({ message: "created", name });
});*/
app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello world</h1>");
});
app.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json({ users });
});
app.post("/create-user", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  res.json({ message: "user created successfully" });
});
app.delete("/delete-user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json({ message: "user deleted successfully" });
});
app.put("/update-user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      email,
      password,
    },
  });
  res.json({ message: "user updated successfully" });
});
app.listen(5000, () => {
  console.log("serveur running on 5000");
});
