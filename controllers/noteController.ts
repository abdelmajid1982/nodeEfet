import { prisma } from "../lib/prisma.js";
export const createNote = async (req: Request, res: Response) => {
  const { value, courseId, studentId } = req.body;

  const note = await prisma.note.create({
    data: {
      courseId: parseInt(courseId),
      value,
      studentId: parseInt(studentId),
    },
  });
  res.json({ message: "note created successfully" });
};
export const getNotes = async (req: Request, res: Response) => {
  const notes = await prisma.note.findMany();
  res.json({ notes });
};
export const getNoteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const note = await prisma.note.findUnique({
    where: { id: parseInt(id) },
  });
  res.json({ note });
};
export const updateNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { value, content } = req.body;
  await prisma.note.update({
    where: {
      id: parseInt(id),
    },
    data: {
      value,
      content,
    },
  });
  res.json({ message: "note updated successfully" });
};
export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.note.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json({ message: "note deleted successfully" });
};
