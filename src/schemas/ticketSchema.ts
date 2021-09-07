import joi from "joi";

export default joi.object({
  modality: joi.string().min(3).required(),
  accommodation: joi.string().min(3).required(),
});
