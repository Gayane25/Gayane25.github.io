const lifeProjects = document.querySelector('#lifeProjects');

let projects = [
  {
    title: 'Life Valley Project',
    p2: 'The project is close to many hotels,hospitals and commercial centers...',
    p1: 'The privileged location in Lambeth region in the west of London city',
    button: 'View Project',
    img: '../../assets/lifeproject.png',
  },
  {
    title: 'Life Valley Project',
    p2: 'The project is close to many hotels,hospitals and commercial centers...',
    p1: 'The privileged location in Lambeth region in the west of London city',
    button: 'View Project',
    img: '../../assets/lifeproject.png',
  },
  {
    title: 'Life Valley Project',
    p2: 'The project is close to many hotels,hospitals and commercial centers...',
    p1: 'The privileged location in Lambeth region in the west of London city',
    button: 'View Project',
    img: '../../assets/lifeproject.png',
  },
  {
    title: 'Life Valley Project',
    p2: 'The project is close to many hotels,hospitals and commercial centers...',
    p1: 'The privileged location in Lambeth region in the west of London city',
    button: 'View Project',
    img: '../../assets/lifeproject.png',
  },
  {
    title: 'Life Valley Project',
    p2: 'The project is close to many hotels,hospitals and commercial centers...',
    p1: 'The privileged location in Lambeth region in the west of London city',
    button: 'View Project',
    img: '../../assets/lifeproject.png',
  },
  {
    title: 'Life Valley Project',
    p2: 'The project is close to many hotels,hospitals and commercial centers...',
    p1: 'The privileged location in Lambeth region in the west of London city',
    button: 'View Project',
    img: '../../assets/lifeproject.png',
  },
  {
    title: 'Life Valley Project',
    p2: 'The project is close to many hotels,hospitals and commercial centers...',
    p1: 'The privileged location in Lambeth region in the west of London city',
    button: 'View Project',
    img: '../../assets/lifeproject.png',
  },
  {
    title: 'Life Valley Project',
    p2: 'The project is close to many hotels,hospitals and commercial centers...',
    p1: 'The privileged location in Lambeth region in the west of London city',
    button: 'View Project',
    img: '../../assets/lifeproject.png',
  },
];

function createElement(object) {
  for (let i = 0; i < object.length; i++) {
    let singleProject = document.createElement('div');
    singleProject.className = 'singleProject';
    let leftSideProj = document.createElement('div');
    leftSideProj.className = 'left-side';
    let rightSideProj = document.createElement('div');
    rightSideProj.className = 'right-side';
    singleProject.append(leftSideProj, rightSideProj);
    let singleProjectTitle = document.createElement('h4');
    singleProjectTitle.className = 'h4title';
    singleProjectTitle.textContent = `${object[i].title}`;
    let singleProjectParagraph1 = document.createElement('p');
    singleProjectParagraph1.className = 'project-paragraph';
    singleProjectParagraph1.textContent = `${object[i].p1}`;
    let singleProjectParagraph2 = document.createElement('p');
    singleProjectParagraph2.className = 'project-paragraph';
    singleProjectParagraph2.textContent = `${object[i].p2}`;
    let rightSideImg = document.createElement('img');
    rightSideImg.setAttribute('src', `${object[i].img}`);
    let projectButton = document.createElement('button');
    projectButton.className = 'hoverButton';
    projectButton.textContent = 'View Project';
    leftSideProj.append(
      singleProjectTitle,
      singleProjectParagraph1,
      singleProjectParagraph2,
      projectButton
    );
    rightSideProj.append(rightSideImg);
    lifeProjects.append(singleProject);
  }
}

createElement(projects);



























