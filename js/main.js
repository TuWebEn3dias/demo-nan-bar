(function(){
'use strict';

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if(navToggle){
navToggle.addEventListener('click',function(){
navbar.classList.toggle('navbar--open');
});
}

if(navLinks){
navLinks.addEventListener('click',function(e){
if(e.target.classList.contains('navbar__link')){
navbar.classList.remove('navbar--open');
}
});
}

let lastScroll = 0;
window.addEventListener('scroll',function(){
const current = window.pageYOffset;
if(current > 80){
navbar.classList.add('navbar--scrolled');
}else{
navbar.classList.remove('navbar--scrolled');
}
lastScroll = current;
},{passive:true});

const sections = document.querySelectorAll('.section, .hero');
const observerOptions = {threshold:0.15,rootMargin:'0px 0px -50px 0px'};

const observer = new IntersectionObserver(function(entries){
entries.forEach(function(entry){
if(entry.isIntersecting){
entry.target.classList.add('visible');

const id = entry.target.getAttribute('id');
if(id){
document.querySelectorAll('.navbar__link').forEach(function(link){
link.classList.remove('active');
const href = link.getAttribute('href');
if(href === '#'+id){
link.classList.add('active');
}
});
}
}
});
},observerOptions);

sections.forEach(function(section){
section.classList.add('fade-in');
observer.observe(section);
});

const form = document.getElementById('reservaForm');
if(form){
form.addEventListener('submit',function(e){
e.preventDefault();

const nombre = document.getElementById('formNombre').value.trim();
const fecha = document.getElementById('formFecha').value;
const personas = document.getElementById('formPersonas').value;
const tel = document.getElementById('formTel').value.trim();
const mensaje = document.getElementById('formMensaje').value.trim();

const fechaFormateada = fecha ? new Date(fecha + 'T12:00:00').toLocaleDateString('es-AR',{day:'numeric',month:'long',year:'numeric'}) : 'sin especificar';

let texto = '¡Hola Nan Bar! Quiero hacer una reserva:\n';
texto += '👤 Nombre: ' + nombre + '\n';
texto += '📅 Fecha: ' + fechaFormateada + '\n';
texto += '👥 Personas: ' + personas + '\n';
texto += '📞 Teléfono: ' + tel;
if(mensaje){
texto += '\n📝 Mensaje: ' + mensaje;
}

const url = 'https://wa.me/5493447403833?text=' + encodeURIComponent(texto);
window.open(url,'_blank');
});
}

})();
