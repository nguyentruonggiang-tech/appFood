import { BadRequestException } from "./exception.helpers.js";

export const toInt = (value, fieldName) => {
  const num = Number(value);
  if (!Number.isInteger(num) || num <= 0) {
    throw new BadRequestException(`Field ${fieldName} phải là số nguyên dương`);
  }
  return num;
};
