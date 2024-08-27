// i want to make a validator function that validate the fields and return the fields names with error message to validate them

export default function Validator(fields,req) {
  return Object.keys(fields).reduce((acc, field) => {
    if (!req[field]) {
      acc[field] = fields[field] 
    }

    return acc;
  }, {});
}
