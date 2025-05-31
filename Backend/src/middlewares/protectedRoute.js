import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ error: "Unauthorized: No token" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export const adminOnly = (req, res, next) => {
  if (!req.user?.isAdmin)
    return res.status(403).json({ error: "Access denied: Admins only" });
  next();
};
