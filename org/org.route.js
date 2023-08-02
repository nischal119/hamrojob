import express from "express";
import { orgSchema } from "./org.validation.js";
import { Org } from "./org.model.js";
const router = express.Router();
//? Create Organization

router.post(
  "/org/create",
  async (req, res, next) => {
    const newOrg = req.body;

    try {
      await orgSchema.validateAsync(newOrg);
      next();
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    let newOrg = req.body;
    const user = await Org.findOne({ email: newOrg.email });
    if (user) return res.status(401).send("Organization already exists");
    try {
      await Org.create(newOrg);
      res
        .status(201)
        .send({ message: "Organization is registerd successfully" });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

//? get all organization

router.get("/org/get", async (req, res) => {
  const allOrg = await Org.find();
  res.status(201).send({ message: allOrg });
});

//? update a org

router.post("/org/update/:_id", async (req, res) => {
  const toBeUpdatedName = req.params._id;
  if (toBeUpdatedName.length !== 24)
    return res.status(401).send({ message: "Id didint matched" });
  console.log(toBeUpdatedName);
  const updatedName = await Org.updateOne(
    { _id: toBeUpdatedName },
    {
      $set: {
        organizationName: "Fiverr",
      },
    }
  );
  res.status(201).send({ message: "Success" });
});

//? delete a org

router.delete("/org/delete/:_id", async (req, res) => {
  const toBeDeletedId = req.params._id;
  if (toBeDeletedId.length !== 24)
    return res.status(401).send({ message: "Id didint matched" });

  await Org.deleteOne({ _id: toBeDeletedId });

  res.send({ message: "Deleted" });
});
export default router;
