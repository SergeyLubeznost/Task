import { BaseModel } from "./BaseModel";

export class TaskModel extends BaseModel {
    constructor(user, title, description) {
      super();
      this.user = user;
      this.title = title;
      this.description = description;
    }
  }
