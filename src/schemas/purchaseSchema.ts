import joi from "joi";

export default joi.object({
  userId: joi.number().required(),
  modality: joi.string().min(3).required(),
  accommodation: joi.string().min(3).required(),
});
