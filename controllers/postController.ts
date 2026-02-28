export const createPost = async (req: Request, res: Response) => {
  const { title, content, authorId } = req.body;
  console.log(title, content, authorId);
  const post = await prisma.posts.create({
    data: {
      content,
      title,
      authorId: parseInt(authorId),
    },
  });
  res.json({ message: "post created successfully" });
};
export const getPosts = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  res.json({ posts });
};
export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
  });
  res.json({ post });
};
export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  await prisma.post.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title,
      content,
    },
  });
  res.json({ message: "post updated successfully" });
};
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.post.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json({ message: "post deleted successfully" });
};
