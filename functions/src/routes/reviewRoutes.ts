import express, {Request, Response} from "express";
import {
  createProductReview,
  getProductReview,
  getProductTop3Review,
  getReviewSummary,
} from "../services/reviewServices";

const router = express.Router();

// Route POST /create-app
router.get("/list", async (req: Request, res: Response) => {
  const id = req.query.productId as unknown as number;
  try {
    const reviews = await getProductReview(id);
    res.json({message: "Get list products success!", data: reviews || []});
  } catch (error) {
    res.status(500).json({
      error: "error",
    });
  }
});

router.get("/top3", async (req: Request, res: Response) => {
  const id = req.query.productId as unknown as number;
  try {
    const reviews = await getProductTop3Review(id);
    res.json({message: "Get list products success!", data: reviews || []});
  } catch (error) {
    res.status(500).json({
      error: "error",
    });
  }
});

router.get("/summary", async (req: Request, res: Response) => {
  const id = req.query.productId as unknown as number;
  try {
    const reviews = await getReviewSummary(id);
    res.json({message: "Get list products success!", data: reviews || []});
  } catch (error) {
    res.status(500).json({
      error: "error",
    });
  }
});

router.post("/create", createProductReview);
export default router;
