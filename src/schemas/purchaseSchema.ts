import joi from "joi";

export default joi.object({
  userId: joi.number().required(),
  modalityId: joi.number().required(),
  accommodationId: joi.number().required(),
});
