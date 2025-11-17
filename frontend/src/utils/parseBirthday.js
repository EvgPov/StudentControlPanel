export function parseBirthday(birthday) {
    // Если строка уже в формате YYYY-MM-DD — сразу ок
    if (/^\d{4}-\d{2}-\d{2}$/.test(birthday)) {
        return new Date(birthday);
    }

    // Все остальные случаи (dd-mm-yyyy, dd/mm/yyyy, dd.mm.yyyy)
    const parts = birthday.trim().split(/[-./]/); // разбиваем по -, / или .
    
    // Если день стоит первым (как в NL) — меняем местами
    // if (parseInt(parts[0]) > 12) { // месяц точно не может быть > 12, значит это dd-mm-yyyy
        return new Date(parts[2], parts[1] - 1, parts[0]); // год, месяц - 1, день
    // }
    
    // Иначе это уже mm-dd-yyyy или yyyy-mm-dd
    // return new Date(parts[0], parts[1] - 1, parts[2]);
}