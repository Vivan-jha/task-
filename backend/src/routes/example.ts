import { get_example_data } from "controllers/example";
import { Router } from "express";

export const example_router = Router();

example_router.get("/", get_example_data);
