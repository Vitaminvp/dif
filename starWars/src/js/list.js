const convertData = stringData => {
    const date = new Date(stringData);
    return new Intl.DateTimeFormat('en-GB').format(date);
};
const makePeopleHTML = ({name, created, mass, gender}) => {
    const li = document.createElement('LI');
    li.classList.add('people-list');
    li.innerHTML = `
        <h4>Name: ${name}</h4>
        <p>Created: ${convertData(created)}</p>
        <p>Mass: ${mass}</p>
        <p>Gender: ${gender}</p>`;
    return li;
};
export const makePeoplesList = peoples => {
    const ul = document.createElement('UL');
    ul.append(...peoples.map(makePeopleHTML));
    return ul;
};