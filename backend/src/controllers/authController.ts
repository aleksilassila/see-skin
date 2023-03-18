import * as bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config";

async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function comparePassword(password: string) {
  return bcrypt.compare(password, password);
}

// export async function login(req: Request, res: Response) {
//   const { email, password } = req.body;
//
//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         email,
//       },
//     });
//
//     if (!user || !user.password) {
//       throw new Error("User not found");
//     }
//
//     const hash = user.password;
//
//     if (!(await bcrypt.compare(hash, password))) {
//       throw new Error("Password incorrect");
//     }
//
//     const token = jwt.sign({ userId: user.id }, JWT_SECRET);
//
//     res.cookie("token", token);
//     res.status(200).send({ token });
//   } catch {
//     res.status(500).send("Incorrect credentials.");
//   }
// }
