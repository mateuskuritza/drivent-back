import ConflictError from "@/errors/ConflictError";

export default class FullRoom extends ConflictError {
  constructor() {
    super("This room are not available!");
  
    this.name = "FullRoom";
  }
}
  
