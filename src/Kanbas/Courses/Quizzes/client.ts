import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

// export const deleteAssignment = async (assignmentId: string) => {
//     const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
//     return response.data;
// };
// export const updateAssignment = async (assignment: any) => {
//     const { data } = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
//     return data;
// };