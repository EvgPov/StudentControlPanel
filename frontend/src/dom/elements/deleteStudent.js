import { URL_SERVER } from '../../../../backend/config/apiConfig.js'
import { del } from '../../api/script.js'

export async function deleteSudent(id, name) {
  try {
    await del(`${URL_SERVER}/${id}`);
    alert(`Студент удален! \n\n${name}\nID: ${id}`);
  } catch (error) {
    console.error('Error (delete student):', error);
  }
}