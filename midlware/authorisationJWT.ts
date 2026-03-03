import jwt from "jsonwebtoken";
export const authorisationJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "authorization header missing" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "token missing" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({ message: "invalid token" });
  }
};
