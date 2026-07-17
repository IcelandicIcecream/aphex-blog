import { error } from "@sveltejs/kit";
const GET = async ({ locals }) => {
  throw error(404);
};
export {
  GET
};
