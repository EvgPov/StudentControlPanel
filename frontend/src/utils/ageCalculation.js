import { parseBirthday } from './parseBirthday.js'

export function getAge(birthay) {
    const today =new Date();
    const birth = parseBirthday(birthay);

    let age = today.getFullYear() - birth.getFullYear();
    
    // Проверяем, прошёл ли день рождения в этом году
    const hasBirthdayPassed = 
        today.getMonth() > birth.getMonth() || 
        (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
    
    if (!hasBirthdayPassed) age--;
    
    return age;
}