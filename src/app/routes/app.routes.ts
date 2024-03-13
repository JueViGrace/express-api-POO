import { Router } from "express";
import usersRoutes from "../../users/routes/users.routes";

const router = Router();

router.use(usersRoutes);

export default router;
