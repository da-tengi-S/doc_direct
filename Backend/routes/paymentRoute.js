import express from "express";
import { createPaymentIntent } from "../controllers/paymentController.js";

const paymentRoute = express.Router();

paymentRoute.post("/create-payment-intent", createPaymentIntent);

export default paymentRoute;
