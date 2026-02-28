export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  res.json({ users });
};
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
  res.json({ user });
};
export const updateUser = async (req: Request, res: Response) => {
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
};
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json({ message: "user deleted successfully" });
};
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  res.json({ message: "user created successfully", user });
};
