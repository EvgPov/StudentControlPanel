import { URL_SERVER } from '../../../../backend/config/apiConfig.js'
import { del } from '../../api/script.js'

export async function deleteSudent(id, name) {
  try {
    const response = await del(`${URL_SERVER}/${id}`);
    alert(`Студент "${name}" удален!\nID: ${id}`);
  } catch (error) {
    console.error('Error (delete student):', error);
  }
}