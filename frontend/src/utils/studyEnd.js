export function getStudyEnd(studyStart) {
    const today = new Date();
    let studyEnd = parseInt(studyStart) + 4;

    const sept30 = new Date(studyEnd, 8, 30); // делаем 30 сентября года окончания
    
    if (today > sept30) studyEnd = 'закончил';
    
    return studyEnd;
}