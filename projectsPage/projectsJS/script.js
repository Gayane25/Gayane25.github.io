'use strict';
const projectObj = {
  title: 'Life Valley Project',
  p1: 'The privileged location in Lambeth region in the west of London city',
  p2: 'The project is close to many hotels,hospitals and commercial centers...',
  btnText: 'View Project',
};
const lifeProjects = document.getElementById('lifeProjects');
lifeProjects.className = 'life-projects';
const singleProject = document.createElement('div');
singleProject.className = 'singleProject';
lifeProjects.append(singleProject);
const leftSide = document.createElement('div');
leftSide.className = 'left-side';

const rightSide = document.createElement('div');
rightSide.className = 'right-side';
const imgres = document.createElement('img');
imgres.setAttribute('src', '../../assets/lifeproject.png');
singleProject.append(leftSide, rightSide);
rightSide.append(imgres);

function getTitle() {
  const projectTitle = document.createElement('h4');
  projectTitle.className = 'h4title';
  projectTitle.textContent = `${projectObj.title}`;
  leftSide.append(projectTitle);
}
getTitle();

function getParagraphs() {
  const p1 = document.createElement('p');
  p1.className = 'project-paragraph';
  p1.textContent = `${projectObj.p1}`;
  const p2 = document.createElement('p');
  p2.className = 'project-paragraph';
  p2.textContent = `${projectObj.p2}`;
  leftSide.append(p1, p2);
}
getParagraphs();

function getBtnBox() {
  const btn = document.createElement('button');
  btn.className = 'hoverButton';
  btn.textContent = `${projectObj.btnText}`;
  leftSide.append(btn);
}
getBtnBox();
